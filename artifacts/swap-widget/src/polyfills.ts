import { Buffer } from "buffer";
import { EventEmitter } from "events";

if (typeof window !== "undefined") {
  (window as any).global = window;
  (window as any).Buffer = Buffer;
  (window as any).process = (window as any).process || { env: {}, version: "" };
  (window as any).EventEmitter = EventEmitter;
}
