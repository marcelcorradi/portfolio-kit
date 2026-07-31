import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Where the site is served from.
  //
  //   '/'              custom domain (yourname.com), or a user site
  //                    (youruser.github.io). Also add public/CNAME for a
  //                    custom domain.
  //   '/your-repo/'    GitHub Pages project site
  //                    (youruser.github.io/your-repo)
  //
  // React Router reads this via `basename: import.meta.env.BASE_URL` in
  // main.tsx, so routing follows automatically. Change it here only.
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})