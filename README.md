# closedai.in

Swapnil Nair's static personal site and writing archive, built with Astro.

## Local development

```sh
npm install
npm run dev
```

Run the production checks with:

```sh
npm run check
npm run build
```

## Publish an article

Create a typed MDX draft:

```sh
npm run new:post -- "Article title"
```

The command writes `src/content/blog/article-title.mdx` with `draft: true`. Edit the article, choose at least one topic, add a concise description, and set `draft: false` when it is ready to appear on the site, topic pages, RSS feed, and sitemap.

Optional frontmatter supports `updatedAt`, `series`, `seriesOrder`, `featured`, and a custom social `image`.

## Content

- Articles: `src/content/blog/`
- Case studies: `src/content/work/`
- Content contracts: `src/content.config.ts`

The site is fully static. There is no CMS, database, or production JavaScript runtime.
