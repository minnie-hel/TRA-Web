import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { handleNewsApi } from './server/newsApi.ts'

function staticNewsCopy(): Plugin {
  return {
    name: 'static-news-copy',
    closeBundle() {
      const source = path.join(process.cwd(), 'data', 'news.json')
      const target = path.join(process.cwd(), 'dist', 'news.json')
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, target)
      }
    },
  }
}

/** GitHub Pages serves SPA routes via 404.html (same as index). */
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const index = path.join(process.cwd(), 'dist', 'index.html')
      const fallback = path.join(process.cwd(), 'dist', '404.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, fallback)
      }
    },
  }
}

function newsApi(): Plugin {
  return {
    name: 'news-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        if (!path.startsWith('/api/')) return next()
        void handleNewsApi(req, res).catch(() => {
          if (!res.headersSent) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'server' }))
          }
        })
      })
    },
  }
}

const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), newsApi(), staticNewsCopy(), githubPagesSpaFallback()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
