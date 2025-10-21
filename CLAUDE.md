# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Turborepoを使用したmonorepo構成のノートアプリケーション。
Next.js 15 + ElectronのデスクトップアプリとHono + Cloudflare WorkersのAPIで構成。

## プロジェクト構造

```
.
├── apps/
│   ├── desktop/        # Next.js 15 + Electron デスクトップアプリ
│   └── api/            # Hono + Cloudflare Workers API
├── packages/
│   ├── shared/         # 共有型定義とユーティリティ
│   ├── tsconfig/       # 共有TypeScript設定
│   └── biome-config/   # 共有Biome設定
└── turbo.json          # Turborepo設定
```

## 開発コマンド

### モノレポ全体
```bash
# 全ワークスペースの開発サーバー起動
bun run dev

# 全ワークスペースのビルド
bun run build

# 型チェック (全ワークスペース)
bun run type-check

# Lint (全ワークスペース)
bun run lint

# フォーマット
bun run format

# クリーンアップ
bun run clean
```

### 個別ワークスペース
```bash
# デスクトップアプリ開発
cd apps/desktop && bun run dev

# Electronアプリ開発
cd apps/desktop && bun run electron:dev

# API開発
cd apps/api && bun run dev

# 特定ワークスペースのビルド
bun run build --filter=@amethyst/desktop
bun run build --filter=@amethyst/api
```

## 技術スタック

### Desktop App (`apps/desktop`)
- **フロントエンド**: Next.js 15 (App Router), React 19
- **デスクトップ**: Electron
- **エディタ**: Tiptap 3 (React)
- **UIライブラリ**: shadcn/ui, Tailwind CSS 4, Framer Motion
- **テスト**: Vitest, Playwright
- **開発ツール**: Biome, TypeScript

### API (`apps/api`)
- **フレームワーク**: Hono
- **ランタイム**: Cloudflare Workers
- **開発ツール**: Wrangler, TypeScript, Biome

### Shared Packages
- **`@amethyst/shared`**: 共有型定義とユーティリティ
- **`@amethyst/tsconfig`**: 共有TypeScript設定
  - `base.json`: 共通設定
  - `nextjs.json`: Next.js用設定
  - `workers.json`: Cloudflare Workers用設定
- **`@amethyst/biome-config`**: 共有Biome設定
  - `base.json`: 共通設定
  - `nextjs.json`: Next.js + React用設定
  - `workers.json`: Workers用設定

## アーキテクチャ

### Desktop App ディレクトリ構造

```
apps/desktop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (editor)/          # エディタルートグループ
│   │   │   ├── layout.tsx     # エディタレイアウト
│   │   │   └── page.tsx       # エディタページ
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ホームページ
│   │   └── globals.css        # グローバルスタイル
│   ├── components/            # 共有コンポーネント
│   │   └── shadcn/           # shadcn/ui コンポーネント
│   ├── features/              # 機能別モジュール
│   │   ├── editor/           # Tiptapエディタ
│   │   └── file/             # ファイル管理
│   ├── lib/                   # ユーティリティ
│   └── hooks/                 # カスタムフック
├── electron/                  # Electronメインプロセス
│   ├── main.ts               # メインエントリーポイント
│   └── preload.ts            # プリロードスクリプト
├── public/                    # 静的ファイル
├── package.json
├── tsconfig.json
└── biome.json
```

### API ディレクトリ構造

```
apps/api/
├── src/
│   └── index.ts              # Honoアプリエントリーポイント
├── wrangler.jsonc            # Cloudflare Workers設定
├── package.json
├── tsconfig.json
└── biome.json
```

## 重要な設定

### Turborepo設定 (turbo.json)
- パイプライン定義でビルド順序を制御
- キャッシュ設定で効率的なビルド
- 依存関係の自動解決

### TypeScript設定の共通化
各ワークスペースは`@amethyst/tsconfig`を継承:
```json
{
  "extends": "@amethyst/tsconfig/nextjs.json"  // or workers.json
}
```

### Biome設定の共通化
各ワークスペースは`@amethyst/biome-config`を継承:
```json
{
  "extends": ["@amethyst/biome-config/nextjs.json"]  // or workers.json
}
```

### Next.js設定 (apps/desktop/next.config.ts)
- `output: "export"`: Electron用の静的エクスポート
- `images.unoptimized: true`: 静的エクスポート用

### Cloudflare Workers設定 (apps/api/wrangler.jsonc)
- `compatibility_date`: Workers APIの互換性日付
- `main`: エントリーポイントの指定

## 開発フロー

1. **依存関係インストール**: `bun install` (ルートで実行)
2. **開発サーバー起動**:
   - デスクトップ: `cd apps/desktop && bun run dev`
   - API: `cd apps/api && bun run dev`
3. **型チェック**: `bun run type-check` (ルートで全チェック)
4. **Lint**: `bun run lint` (ルートで全チェック)
5. **ビルド**: `bun run build` (全ワークスペース)

## 注意事項

### Desktop App
- Tiptapエディタは必ずクライアントコンポーネント (`"use client"`)
- Next.jsは静的エクスポートモード (SSR/ISR不可)
- Electronとの連携は`electron/`ディレクトリで管理

### API
- Honoアプリは`export default app`でエクスポート
- Cloudflare Workersの環境変数は`wrangler.jsonc`で管理
- ローカル開発は`wrangler dev`で実行

### 共通
- 各ワークスペースは独立したpackage.jsonを持つ
- 共有設定は`packages/`で一元管理
- Biomeがlint/formatツールとして統合 (ESLint/Prettierは不使用)
- Turborepoがビルドキャッシュとタスクオーケストレーションを管理

## shadcn/ui 導入手順

### コンポーネント追加 (apps/desktopで実行)

```bash
cd apps/desktop
bunx shadcn@latest add button
bunx shadcn@latest add sidebar
bunx shadcn@latest add resizable
```

### 使用例

```tsx
import { Button } from "@/components/shadcn/button";
import { Sidebar, SidebarProvider } from "@/components/shadcn/sidebar";

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

## CI/CD

GitHub Actionsで以下をチェック:
- Lint & Type Check (全ワークスペース)
- Test (Desktop App)
- Build (Desktop App & API)
- Electron Build (macOS)
- Security Audit

詳細は`.github/workflows/ci.yml`を参照。
