# GameGuide360

Black + Gold static HTML/CSS/JS starter for GitHub + Vercel.

## Upload
Upload **contents** of this folder to the root of your GitHub repository, then import the repository in Vercel as an Other/static project. No build command is required.

## Add a new game
1. Copy `posts/example-game.html` to `posts/new-game.html` and replace placeholder text with independently verified, original content, including unique SEO title and description.
2. Add an entry to `posts.json` with `title`, `category`, ISO date `YYYY-MM-DD`, `url`, and optional `image` path.
3. Add the new URL to `sitemap.xml`. This starter does NOT automatically update the sitemap.
4. Commit. Once Vercel deploys, the new post appears in date-descending order on homepage and All Games.

## Before launch
Replace the example article, review legal/policy pages, supply contact details, add only authorized links, and check Vercel's commercial-use and content policies. No real game claims are included.


WHITE + RED THEME UPDATE
------------------------
This package keeps all 22 posts and updates css/style.css with a responsive white/red design (5 cards per row on wide desktop, 2 on mobile). Upload the CONTENTS of this extracted folder into the existing repository root, preserving css/, js/, images/, posts/ paths. Back up existing files before replacing them. Images and official links remain unverified/placeholders.


CARD BUTTONS: Each game card has Download and View Information. Download is visibly disabled until a verified downloadUrl is added to posts.json. View Information links to the corresponding article.
