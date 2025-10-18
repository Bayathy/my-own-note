# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Next.js 15 + Tauri 2 のハイブリッドデスクトップアプリケーション。
Tiptapエディタを使用したノートアプリケーションとして開発中。

## 開発コマンド

### Next.jsアプリケーション
```bash
# 開発サーバー起動
bun dev

# 静的ビルド (Tauri用にexportモード)
bun run build

# 型チェック
bun run type-check

# Lintチェック
bun run lint

# Lint自動修正
bun run lint:fix

# フォーマット
bun run format

# CI実行 (lint + type-check + build)
bun run ci
```

### Tauriデスクトップアプリ
```bash
# Tauriアプリ開発モード (ホットリロード有効)
bun run tauri:dev

# Tauriアプリビルド (プロダクション)
bun run tauri:build
```

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router), React 19
- **デスクトップ**: Tauri 2 (Rust)
- **エディタ**: Tiptap 3 (React)
- **UIライブラリ**: shadcn/ui, Tailwind CSS 4, Framer Motion
- **開発ツール**: Biome (lint/format), TypeScript

## アーキテクチャ

### ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── (editor)/          # エディタルートグループ
│   │   ├── layout.tsx     # エディタレイアウト (Sidebar + ResizablePanel)
│   │   └── page.tsx       # エディタページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── components/            # 共有コンポーネント
│   ├── ui/               # shadcn/ui コンポーネント
│   │   ├── sidebar.tsx
│   │   ├── resizable.tsx
│   │   ├── button.tsx
│   │   └── ...
│   └── note-sidebar.tsx  # ノート用サイドバー
├── features/              # 機能別モジュール
│   └── editor/
│       └── components/
│           └── editor.tsx # Tiptapエディタコンポーネント
├── lib/                   # ユーティリティ
│   └── utils.ts          # cn()などのヘルパー
└── hooks/                 # カスタムフック
    └── use-mobile.ts     # モバイル検出フック
src-tauri/                 # Tauriバックエンド (Rust)
├── src/
│   ├── main.rs           # メインエントリーポイント
│   └── lib.rs            # ライブラリコード
└── Cargo.toml            # Rust依存関係
```

### 重要な設定

#### Next.js設定 (next.config.ts)
- `output: "export"`: Tauri用の静的エクスポート
- `images.unoptimized: true`: 静的エクスポート用
- `assetPrefix`: 開発時のTauri連携用ホスト設定

#### Tiptapエディタ
- `immediatelyRender: false`: SSR問題回避のため、サーバーサイドでの即座レンダリングを無効化
- クライアントサイドコンポーネント (`"use client"`)

#### Biome設定
- Next.js/React推奨ルール適用
- インデント: スペース2つ
- Import自動整理有効

### 開発フロー

1. **フロントエンド開発**: `bun dev` でNext.jsアプリを開発
2. **デスクトップ統合開発**: `bun run tauri:dev` でTauri + Next.jsをホットリロードで開発
3. **型安全性**: `bun run type-check` で型エラー検出
4. **コード品質**: `bun run lint` でBiomeによるチェック
5. **CI前確認**: `bun run ci` で全チェック実行

### 注意事項

- Tiptapエディタは必ずクライアントコンポーネントとして実装
- Tauri開発時は環境変数 `TAURI_DEV_HOST` で開発ホストを指定可能
- Next.jsは静的エクスポートモード (SSR/ISR不可)
- Biomeがlint/formatツールとして統合されている (ESLint/Prettierは不使用)

## shadcn/ui 導入手順

### 初期化

```bash
bunx shadcn@latest init
```

初期化時の設定:
- スタイル: `new-york`
- ベースカラー: `neutral`
- CSS変数: 有効
- Tailwind設定: `src/app/globals.css`

### コンポーネント追加

```bash
# 個別コンポーネント追加
bunx shadcn@latest add button
bunx shadcn@latest add sidebar
bunx shadcn@latest add resizable

# 複数同時追加
bunx shadcn@latest add sidebar resizable button
```

### 使用例

```tsx
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function MyComponent() {
  return (
    <SidebarProvider>
      <Sidebar>
        <Button>Click me</Button>
      </Sidebar>
    </SidebarProvider>
  );
}
```

### Biome設定の調整

shadcn/uiコンポーネントとの互換性のため、`biome.json`で以下を設定:

```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noDocumentCookie": "off"
      },
      "correctness": {
        "useExhaustiveDependencies": "warn"
      }
    }
  }
}
```
