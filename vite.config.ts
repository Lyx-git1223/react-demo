import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import type { Plugin } from 'vite';
import mockjs from 'mockjs';
import url from 'node:url';
const viteServer = ():Plugin => {
  return {
    name: 'viteServer',
    configureServer(server) {
      server.middlewares.use('/api/list',(req, res) => {
        res.setHeader('content-type','application/json')
        const parseUrl = url.parse(req.originalUrl!,true).query;
        const data = mockjs.mock({
          'list|1000': [{
            'id|+1': 1,
            name: parseUrl.keyWord,
            address: '@county(true)',
          }]
        })
        res.end(JSON.stringify(data));
      });
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),viteServer()],
})
