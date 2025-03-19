
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point '@' to the src directory
      '@': resolve(__dirname, './'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'exports/TreatmentRecommenderExport.tsx'),
      name: 'TreatmentRecommender',
      fileName: 'treatment-recommender',
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
      },
    },
  },
});
