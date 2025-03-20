
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Connect } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages or preview environments, we need to use the repository name as the base path
  // Extract it from env or use '/' for local development
  const baseUrl = process.env.BASE_URL || '/';
  console.log('Building with base URL:', baseUrl);
  
  return {
    base: baseUrl,
    server: {
      host: "::",
      port: 8080,
      // Add middleware to handle path redirection for client-side routing
      middlewares: [
        (req: Connect.IncomingMessage, res: Connect.ServerResponse, next: Connect.NextFunction) => {
          // For client-side routing, send index.html for HTML requests that aren't for files
          if (req.url && req.url.startsWith('/') && !req.url.includes('.') && !req.url.startsWith('/assets/')) {
            console.log(`Client-side routing middleware: redirecting ${req.url} to index.html`);
            req.url = '/index.html';
          }
          next();
        }
      ]
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Ensure we use client-side routing properly
    optimizeDeps: {
      include: ['react-router-dom'],
      // Force include problematic dependencies
      force: true
    },
    build: {
      // Ensure source maps are generated
      sourcemap: true,
      // Output more detailed build information
      reportCompressedSize: true,
      // Make sure assets are properly referenced
      assetsDir: 'assets',
      // Add rollup specific options to ensure compatibility
      rollupOptions: {
        output: {
          manualChunks: undefined,
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
  };
});
