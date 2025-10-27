import { describe, expect, it } from "vitest";
import app from "./index";

describe("Hono API", () => {
	describe("GET /", () => {
		it("should return 'Hello Hono!' with 200 status", async () => {
			const res = await app.request("/");

			expect(res.status).toBe(200);
			expect(await res.text()).toBe("Hello Hono!");
		});

		it("should have correct content-type header", async () => {
			const res = await app.request("/");

			expect(res.headers.get("content-type")).toContain("text/plain");
		});
	});

	describe("404 Not Found", () => {
		it("should return 404 for non-existent routes", async () => {
			const res = await app.request("/non-existent");

			expect(res.status).toBe(404);
		});
	});
});
