import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  optimizeDeps:{
    exclude:['@ffmpeg/ffmpeg'],
  },
  publicDir:'public',
  
});




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import {nodePolyfills} from 'vite-plugin-node-polyfills';

// // Vite configuration
// export default defineConfig({
//   plugins: [
//     react(),
//     nodePolyfills(),

//   ],
//   optimizeDeps: {
//     esbuildOptions: {
//       // Polyfill Node.js globals like process, buffer, etc.
//       define: {
//         global: 'globalThis',
//         process: 'process',
//       },
//       plugins: [
//         nodePolyfills({
//           buffer: true,
//           process: true,
//         }),
//       ],
//     },
//   },
//   resolve: {
//     alias: {
//       // Set up aliases for Node.js modules
//       stream: 'stream-browserify',
//       buffer: 'buffer/',
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           ffmpeg: ['@ffmpeg/ffmpeg'], // Put ffmpeg in its own chunk
//         },
//       },
//     },
//   },
//   publicDir: 'public', // Ensure public assets are served correctly
// });





