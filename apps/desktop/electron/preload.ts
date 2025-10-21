import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  // 将来的にIPCメソッドをここに追加
  platform: process.platform,
});
