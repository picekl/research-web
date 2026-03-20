# Research Profile

This is a lightweight one-page research profile site inspired by academic personal pages.

## Edit your content

Most of the profile content lives in [`data/profile-base.js`](/Users/lukaspicek/Documents/Projects/research-web/data/profile-base.js) and [`data/publications.js`](/Users/lukaspicek/Documents/Projects/research-web/data/publications.js):

- `profileBase.name`, `profileBase.role`, `profileBase.summary`
- `profileBase.bio`, `profileBase.interests`, `profileBase.projects`, `profileBase.news`
- `profileBase.links`, `profileBase.email`, `profileBase.image`
- `publicationsData`, `selectedPublicationTitles`, `publicationFilterGroups`

## Preview locally

Open [`index.html`](/Users/lukaspicek/Documents/Projects/research-web/index.html) directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

This repo is set up to deploy automatically from `main` using GitHub Pages and GitHub Actions.

1. Push the repository to GitHub.
2. In GitHub, open `Settings` -> `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` again if needed, or run the `Deploy GitHub Pages` workflow manually.

After the workflow finishes, the site should be available at:

- `https://picekl.github.io/research-web/`

## Files

- [`index.html`](/Users/lukaspicek/Documents/Projects/research-web/index.html): page structure
- [`styles.css`](/Users/lukaspicek/Documents/Projects/research-web/styles.css): visual design and responsive layout
- [`data/profile-base.js`](/Users/lukaspicek/Documents/Projects/research-web/data/profile-base.js): core profile content
- [`data/publications.js`](/Users/lukaspicek/Documents/Projects/research-web/data/publications.js): publications data and filter groups
- [`js/common.js`](/Users/lukaspicek/Documents/Projects/research-web/js/common.js): shared DOM utilities and render helpers
- [`js/home.js`](/Users/lukaspicek/Documents/Projects/research-web/js/home.js): homepage rendering
- [`js/archive-page.js`](/Users/lukaspicek/Documents/Projects/research-web/js/archive-page.js): archive page rendering and filters
