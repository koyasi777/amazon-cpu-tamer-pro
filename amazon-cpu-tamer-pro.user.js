// ==UserScript==
// @name         Amazon CPU Tamer PRO 🧠✨
// @namespace    https://github.com/koyasi777/amazon-cpu-tamer-pro
// @version      3.0.0
// @description  Drastically reduce CPU usage on Amazon pages by intelligently throttling background tasks. No affiliate, no DOM rewriting, secure & lightweight.
// @author       koyasi777
// @match        https://www.amazon.com/*
// @match        https://www.amazon.co.jp/*
// @match        https://www.amazon.co.uk/*
// @match        https://www.amazon.es/*
// @match        https://www.amazon.fr/*
// @match        https://www.amazon.de/*
// @match        https://www.amazon.it/*
// @match        https://www.amazon.*
// @exclude      */cart/*
// @exclude      */buy/*
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/koyasi777/amazon-cpu-tamer-pro
// @supportURL   https://github.com/koyasi777/amazon-cpu-tamer-pro/issues
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_ID = 'AmazonCpuTamerPRO';
  const FOREGROUND_INTERVAL = 125;
  const BACKGROUND_INTERVAL = 60000;
  const MIN_IFRAME_TIMEOUT = 1000;

  const safeWindow = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

  let isUserActive = true;
  let isTabHidden = document.hidden;

  document.addEventListener('visibilitychange', () => {
    isTabHidden = document.hidden;
  });
  document.addEventListener('keydown', () => isUserActive = true, true);
  document.addEventListener('click', () => isUserActive = true, true);

  // Task bundler (Top window only)
  if (safeWindow === safeWindow.top) {
    const taskMap = new Map();
    let taskIdCounter = 0;

    const scheduleIdle = (fn) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(fn, { timeout: 500 });
      } else {
        requestAnimationFrame(fn);
      }
    };

    const originalSetInterval = safeWindow.setInterval.bind(safeWindow);
    const originalClearInterval = safeWindow.clearInterval.bind(safeWindow);

    safeWindow.setInterval = function (fn, delay, ...args) {
      const id = taskIdCounter++;
      taskMap.set(id, {
        fn: () => fn(...args),
        interval: delay,
        lastExecution: 0
      });
      return id;
    };

    safeWindow.clearInterval = function (id) {
      taskMap.delete(id);
    };

    const bundledLoop = () => {
      const now = Date.now();
      const intervalLimit = isTabHidden ? BACKGROUND_INTERVAL : FOREGROUND_INTERVAL;

      if (!isUserActive && isTabHidden) {
        scheduleIdle(bundledLoop);
        return;
      }

      for (const [id, task] of taskMap.entries()) {
        if (now - task.lastExecution >= task.interval) {
          try {
            task.fn();
          } catch (e) {
            console.warn(`[${SCRIPT_ID}] Error in interval task:`, e);
          }
          task.lastExecution = now;
        }
      }

      isUserActive = false;
      scheduleIdle(bundledLoop);
    };

    scheduleIdle(bundledLoop);
  }

  // Timeout throttler for iframes
  if (safeWindow !== safeWindow.top) {
    const originalSetTimeout = safeWindow.setTimeout.bind(safeWindow);

    safeWindow.setTimeout = function (fn, timeout, ...args) {
      if (document.hidden) return;
      const adjusted = Math.max(timeout, MIN_IFRAME_TIMEOUT);
      return originalSetTimeout(fn, adjusted, ...args);
    };
  }

  // Optional: URL cleaner to remove tracking parameters
  if (safeWindow === safeWindow.top) {
    const cleanTrackingParams = () => {
      const url = new URL(location.href);
      const paramsToRemove = ['utm_source', 'utm_medium', 'utm_campaign', 'ref', 'tag'];

      let modified = false;
      for (const param of paramsToRemove) {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
          modified = true;
        }
      }

      if (modified) {
        history.replaceState(null, document.title, url.toString());
        console.info(`[${SCRIPT_ID}] Tracking parameters removed`);
      }
    };

    document.addEventListener('DOMContentLoaded', cleanTrackingParams, { once: true });
  }
})();
