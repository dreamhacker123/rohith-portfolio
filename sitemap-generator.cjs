const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://rohithsatyanivas.com' });

  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });

  sitemap.end();

  const data = await streamToPromise(sitemap);
  fs.writeFileSync("public/sitemap.xml", data.toString());

  console.log("✅ Sitemap generated with only home route.");
})();
