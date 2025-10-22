/**
 * Vitest Global Setup
 * グローバルなテストセットアップを行います
 */

import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => {
	// テスト全体の初期化処理
	console.log("🧪 Starting API tests...");
});

afterAll(() => {
	// テスト全体のクリーンアップ処理
	console.log("✅ All API tests completed");
});

afterEach(() => {
	// 各テスト後のクリーンアップ
	// 必要に応じてモックのリセットなどを追加
});
