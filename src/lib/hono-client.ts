import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

export const honoClient = hc<AppType>("http://localhost:3000");
