import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = () => {
  // Определите URLs для включения в sitemap.xml
  const urls = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/auth/login', changefreq: 'monthly', priority: 0.5 },
    { url: '/auth/register', changefreq: 'monthly', priority: 0.5 },
    { url: '/tags', changefreq: 'weekly', priority: 0.7 },
    { url: '/genres', changefreq: 'weekly', priority: 0.7 },
    { url: '/actors', changefreq: 'weekly', priority: 0.8 },
    { url: '/posts', changefreq: 'daily', priority: 0.9 },
    { url: '/posts/popular', changefreq: 'daily', priority: 0.9 },
    { url: '/orderwish', changefreq: 'weekly', priority: 0.7 },
    { url: '/search', changefreq: 'daily', priority: 0.8 },
    // Добавьте другие URL-адреса
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (entry) => `
      <url>
        <loc>${entry.url}</loc>
        <changefreq>${entry.changefreq}</changefreq>
        <priority>${entry.priority}</priority>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  // Запишите sitemap.xml в файл
  const sitemapPath = path.join(__dirname, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap generated successfully!');
};

// Вызовите функцию для генерации sitemap.xml
generateSitemap();
