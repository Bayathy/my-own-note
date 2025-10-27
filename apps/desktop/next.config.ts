import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Electron開発時はdevサーバー、本番時は静的エクスポート
	output: process.env.NODE_ENV === "production" ? "export" : undefined,
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
