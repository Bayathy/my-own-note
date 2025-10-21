import { Hono } from "hono";
import { cors } from "hono/cors";

// biome-ignore lint/complexity/noBannedTypes: Empty bindings object for future use
type Bindings = {
  // Add your Cloudflare Workers bindings here
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware
app.use("*", cors());

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.get("/api/notes", (c) => {
  return c.json({
    notes: [],
    message: "Notes endpoint - to be implemented",
  });
});

export default app;
