
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
