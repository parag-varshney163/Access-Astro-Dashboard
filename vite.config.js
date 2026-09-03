// import tailwindcss from '@tailwindcss/vite';
// import { defineConfig } from 'vite';
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })
// import tailwindcss from '@tailwindcss/vite';
// import { defineConfig } from 'vite';
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  preview: {
    host: true,
    allowedHosts: ['access-dashboard-frontend.onrender.com']
  },
});