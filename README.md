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

## Curated collection

Edit `src/data/curated.json` to add or update entries on `/curated`. Each entry has a `title` and a `links` array of `{ "url": "https://…", "label": "Link label" }` objects. The first link is the title's destination; entries with multiple links display all of them below the title. Array order controls the default display order.

The collection is a snapshot imported from the Obsidian article stash, with duplicate URLs and tracking parameters removed. The site builds entirely from this repository; it does not read or modify the vault. Local image attachments and notes without links are not included.
