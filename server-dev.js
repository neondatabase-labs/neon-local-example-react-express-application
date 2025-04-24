import 'dotenv/config';
import fs from 'fs';
import express from 'express';
import { createServer } from 'vite';

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});

app.use(vite.middlewares);

async function renderPage(req, res, dataFetcher) {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

    const data = await dataFetcher(req);

    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;
    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    console.error('Rendering error:', error);
    res
      .status(500)
      .set({ 'Content-Type': 'text/html' })
      .end(`<html><body><h1>Server Error</h1><p>${error.toString()}</p></body></html>`);
  }
}

app.use('*', async (req, res) => {
  await renderPage(req, res, async () => {
    const { getDefaultData } = await vite.ssrLoadModule('/src/function.js');
    return await getDefaultData();
  });
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
