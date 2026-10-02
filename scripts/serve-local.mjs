import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function readOption(name) {
  const prefix = `${name}=`;

  for (let index = args.length - 1; index >= 0; index -= 1) {
    if (args[index].startsWith(prefix)) {
      return args[index].slice(prefix.length);
    }

    if (args[index] === name) {
      return args[index + 1];
    }
  }

  return undefined;
}

const port = Number(readOption("--port") ?? process.env.PORT ?? 8000);
const host =
  readOption("--host") ??
  process.env.HOST ??
  (process.env.CODESPACES === "true" ? "0.0.0.0" : "127.0.0.1");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("Port must be an integer between 1 and 65535.");
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function sendText(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  response.end(body);
}

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(
    new URL(requestUrl ?? "/", "http://localhost").pathname,
  );
  const requestedPath = path.resolve(root, pathname.replace(/^[/\\]+/, ""));

  if (requestedPath !== root && !requestedPath.startsWith(`${root}${path.sep}`)) {
    return null;
  }

  return requestedPath;
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendText(response, 405, "Method Not Allowed");
    return;
  }

  let filePath;

  try {
    filePath = resolveRequestPath(request.url);
  } catch (error) {
    console.error(`Invalid request URL: ${request.url}`, error);
    sendText(response, 400, "Bad Request");
    return;
  }

  if (!filePath) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const finalStats = fileStats.isDirectory() ? await stat(filePath) : fileStats;
    if (!finalStats.isFile()) {
      sendText(response, 404, "Not Found");
      return;
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Length": finalStats.size,
      "Content-Type":
        contentTypes[path.extname(filePath).toLowerCase()] ??
        "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    const stream = createReadStream(filePath);
    stream.on("error", (error) => {
      console.error(`Failed to read ${filePath}`, error);
      response.destroy(error);
    });
    stream.pipe(response);
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
      sendText(response, 404, "Not Found");
      return;
    }

    console.error(`Failed to serve ${request.url}`, error);
    sendText(response, 500, "Internal Server Error");
  }
});

server.listen(port, host, () => {
  const localHost = host === "0.0.0.0" ? "127.0.0.1" : host;
  console.log(`Serving workshop from ${root}`);
  console.log(`Open the handson site: http://${localHost}:${port}/`);
  console.log(
    `Open the app:          http://${localHost}:${port}/app/support-ticket-dashboard/`,
  );
  if (process.env.CODESPACES === "true") {
    console.log(`In Codespaces, open forwarded port ${port} from the Ports tab.`);
  }
  console.log("Press Ctrl+C to stop.");
});
