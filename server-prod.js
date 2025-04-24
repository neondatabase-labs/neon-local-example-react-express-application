import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }));

async function renderPage(req, res, dataFetcher) {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');

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
    const { getDefaultData } = await import('./dist/functions/function.js');
    return await getDefaultData();
  });
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
