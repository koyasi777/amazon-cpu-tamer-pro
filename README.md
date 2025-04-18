# 🧠 Amazon CPU Tamer PRO

## 📌 概要

**AmazonのページでのCPU使用率を劇的に削減！**  
このユーザースクリプトは、Amazon上の過剰なJavaScript実行をインテリジェントに制御し、**PCのファン音・バッテリー消費・ページのモタつき**を解消します。

- DOM改変なし、安全かつ透明な設計
- アフィリエイトコード削除など一切なし
- タブ非表示・非アクティブ時にCPU使用を自動抑制
- `setInterval` などの処理をスマートに束ねて最適化
- トラッキング用URLパラメータを自動削除（`ref`, `tag`, `utm_*` など）

## 🌍 対応サイト

以下のAmazon公式ドメインに対応：

- `https://www.amazon.com/*`
- `https://www.amazon.co.jp/*`
- `https://www.amazon.co.uk/*`
- `https://www.amazon.es/*`
- `https://www.amazon.fr/*`
- `https://www.amazon.de/*`
- `https://www.amazon.it/*`

### ⛔ 除外ページ

以下の購入系ページは安全性のため**除外**されています：

- カートページ：`*/cart/*`
- 購入フロー：`*/buy/*`

## ⚙️ インストール方法

1. ブラウザに **[Violentmonkey](https://violentmonkey.github.io/)** または **[Tampermonkey](https://www.tampermonkey.net/)** を導入
2. 以下のリンクをクリック  
   👉 **[このスクリプトをインストールする](https://raw.githubusercontent.com/koyasi777/amazon-cpu-tamer-pro/main/amazon-cpu-tamer-pro.user.js)**  
3. 自動的にインストール画面が開くので、有効化すれば完了！

## 💡 主な機能と仕組み

| 機能 | 説明 |
|------|------|
| 🎯 タスク束ね最適化 | `setInterval` を監視して、効率的に実行（CPU負荷軽減） |
| 💤 背景処理制御 | タブが非アクティブ時は、処理間隔を大幅延長 |
| 🪟 iframe節電 | iframe内のタイマー処理にも自動調整を適用 |
| ✂️ URLトラッキング除去 | `ref`, `tag`, `utm_*` などの不要パラメータを即削除 |

## 🔒 安全性について

- DOM構造の書き換えは**一切なし**
- 外部通信・広告挿入・トラッキング等は**完全ゼロ**
- `@grant none` により、外部APIを使わず純粋なJSで動作
- `document-start` 実行で、ページが重くなる前に起動！

## 🛠 技術仕様

- `requestIdleCallback` を使って負荷の少ないタイミングで処理実行
- `visibilitychange` によるタブ状態検知でリソースを制御
- `Map` & `setTimeout` ラップによるスマートスケジューリング
- URLの履歴書き換えでトラッキング除去（`history.replaceState`）

## 📜 ライセンス

MIT License  
自由に改変・再配布可能ですが、使用は自己責任でお願いします。

---

> Amazonの動作が重い？タブ開きっぱなしでファンが唸る？  
> **Amazon CPU Tamer PRO** がその負荷、根本から静かに断ちます。
