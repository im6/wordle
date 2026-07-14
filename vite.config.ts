import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths so the build works under the /wordle/ GitHub Pages subpath.
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
