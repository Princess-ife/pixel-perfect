import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { NodeRequest, sendNodeResponse } from "srvx/node";

const { values } = parseArgs({
  options: {
    host: { type: "string", default: "127.0.0.1" },
    port: { type: "string", default: "4173" },
    help: { type: "boolean", short: "h" },
  },
});
if (values.help) {
  console.log("Usage: npm run preview -- [--host 127.0.0.1] [--port 4173]\nRun npm run build first.");
  process.exit(0);
}
const port = Number(values.port);
if (!/^\d+$/.test(values.port) || !Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("Preview port must be an integer between 1 and 65535.");
  process.exit(1);
}

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, ".output/public");
// Nitro emits this portable SSR service alongside the Cloudflare Worker entry.
const entry = path.join(root, ".output/server/_ssr/ssr.mjs");
try {
  await stat(entry);
  await stat(publicDir);
} catch {
  console.error("Production build missing. Run npm run build before npm run preview.");
  process.exit(1);
}
const app = (await import(pathToFileURL(entry).href)).default;
const publicRoot = await realpath(publicDir);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://preview.local").pathname);
    const candidate = path.resolve(publicRoot, `.${pathname}`);
    if ((req.method === "GET" || req.method === "HEAD") && candidate.startsWith(publicRoot + path.sep)) {
      let file;
      try {
        const resolved = await realpath(candidate);
        if (resolved.startsWith(publicRoot + path.sep)) {
          const info = await stat(resolved);
          if (info.isFile()) file = { resolved, info };
        }
      } catch (error) {
        if (!["ENOENT", "ENOTDIR"].includes(error.code)) throw error;
      }
      if (file) {
        res.writeHead(200, {
          "Content-Type": contentTypes[path.extname(file.resolved).toLowerCase()] ?? "application/octet-stream",
          "Content-Length": file.info.size,
          "Cache-Control": "no-cache",
        });
        if (req.method === "HEAD") res.end();
        else createReadStream(file.resolved).on("error", () => res.destroy()).pipe(res);
        return;
      }
    }
    const response = await app.fetch(new NodeRequest({ req, res }));
    await sendNodeResponse(res, response);
  } catch (error) {
    console.error("Preview request failed:", error);
    if (!res.headersSent) res.writeHead(error instanceof URIError ? 400 : 500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Preview request failed. See the terminal for details.");
  }
});
server.on("error", (error) => {
  console.error(`Could not start preview: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, values.host, () => {
  console.log(`Production preview: http://${values.host.includes(":") ? `[${values.host}]` : values.host}:${port}/`);
});
