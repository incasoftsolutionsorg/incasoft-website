import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

/**
 * Serves the Vercel function in `api/contact.ts` during `npm run dev`,
 * so the contact forms work locally exactly as they do on Vercel.
 */
function devContactApi(): Plugin {
  return {
    name: "dev-contact-api",
    apply: "serve",
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ""))
      server.middlewares.use("/api/contact", async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const mod = await server.ssrLoadModule("/api/contact.ts")
        if (req.method !== "POST") {
          res.statusCode = 405
          res.end()
          return
        }
        const response: Response = await mod.POST(
          new Request("http://localhost/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: Buffer.concat(chunks),
          }),
        )
        res.statusCode = response.status
        res.setHeader("Content-Type", "application/json")
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), devContactApi()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
