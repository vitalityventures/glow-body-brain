
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
      fileName: (format) => `treatment-recommender.${format}.js`,
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
        // Ensure the CSS is properly extracted and directly usable
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return 'assets/[name][extname]';
        },
      },
    },
    // Generate sourcemaps for easier debugging
    sourcemap: true,
    // Ensure we're targeting browsers to avoid modern syntax issues
    target: 'es2015',
    // Make sure the file extension is compatible with all hosting environments
    outDir: '../dist',
    // Add asset path info to help with debugging
    reportCompressedSize: true,
  },
});
