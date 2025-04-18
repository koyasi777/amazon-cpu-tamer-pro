# 🧠 Amazon CPU Tamer PRO

## 📌 概要

**AmazonのページでのCPU使用率を劇的に削減！**  
このユーザースクリプトは、Amazon上の過剰なJavaScript実行をインテリジェントに制御し、**PCのファン音・バッテリー消費・ページのモタつき**を解消します。

- DOM改変なし、安全かつ透明な設計
- アフィリエイトコード削除など一切なし
- タブ非表示・非アクティブ時にCPU使用を自動抑制
- `setInterval` などの処理をスマートに束ねて最適化
- トラッキング用URLパラメータを自動削除（ref, tag, utm など）

## 🌍 対応サイト

- `https://www.amazon.com/*`
- `https://www.amazon.co.jp/*`
- `https://www.amazon.co.uk/*`
- `https://www.amazon.es/*`
- `https://www.amazon.fr/*`
- `https://www.amazon.de/*`
- `https://www.amazon.it/*`
- `https://www.amazon.*`

※ `cart` や `buy` ページは除外済みです。

## ⚙️ インストール方法

1. ブラウザに Violentmonkey または Tampermonkey を導入
2. 以下のリンクからスクリプトをインストール  
   👉 [このスクリプトをインストールする](https://raw.githubusercontent.com/koyasi777/amazon-cpu-tamer-pro/main/amazon-cpu-tamer-pro.user.js)

## 💡 主な機能と仕組み

| 機能 | 説明 |
|------|------|
| 🎯 タスク束ね最適化 | `setInterval` を監視して、効率的に実行（CPU負荷軽減） |
| 💤 背景処理制御 | タブが非アクティブ時は、処理間隔を自動で大幅延長 |
| 🪟 iframe節電 | iframe内のタイマー処理にも自動調整を適用 |
| ✂️ URLトラッキング除去 | `ref`, `tag`, `utm_*` などの不要パラメータを即削除 |

## 🔒 安全性について

- DOM構造の書き換えは一切行いません
- 外部通信・広告挿入・トラッキング等は完全にゼロ
- `@grant none` により、外部API等を使用せず純粋なJSで動作

## 🛠 技術仕様

- `document-start` で最速起動、他スクリプトより先に実行
- `requestIdleCallback` を使って負荷の少ないタイミングで処理実行
- `visibilitychange` によるタブの状態検知で、リソース制御

## 📜 ライセンス

MIT License  
自由に改変・再配布可能ですが、使用は自己責任でお願いします。

---

> Amazonの動作が重い？タブ開きっぱなしでファンが唸る？  
> **Amazon CPU Tamer PRO** がその負荷、根本から静かに断ちます。
