
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
  // Use environment variable for base URL, critical for GitHub Pages
  base: process.env.BASE_URL || '/',
  build: {
    lib: {
      entry: resolve(__dirname, './exports/TreatmentRecommenderExport.tsx'),
      name: 'TreatmentRecommender',
      // Fixed filename with NO hash to ensure predictable paths
      fileName: () => 'widget',
      formats: ['umd'], // Only generate UMD format for browser compatibility
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['react', 'react-dom'],
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Ensure CSS has a consistent name with NO hash
        assetFileNames: (info) => {
          if (info.name === 'style.css') return 'widget-style.css';
          return 'assets/[name][extname]';
        },
        // Ensure relative paths work correctly in all environments
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Generate sourcemaps for easier debugging
    sourcemap: true,
    // Ensure we're targeting browsers to avoid modern syntax issues
    target: 'es2015',
    // Make sure asset path info helps with debugging
    reportCompressedSize: true,
    // Always output to the root of the dist directory
    outDir: '../dist',
    // Ensure output files are copied to the root of outDir
    emptyOutDir: false,
  },
});
