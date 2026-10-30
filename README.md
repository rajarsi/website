# snigdhasen.in

Live at https://snigdhasen.in (GitHub Pages; DNS at GoDaddy: four A records to GitHub Pages IPs, CNAME www → rajarsi.github.io).

Personal academic website of Dr. Snigdha Sen, built with Hugo and the HugoBlox Academic CV template. Deploys to GitHub Pages on every push to `main`.

## Edit common things

| To change | Edit |
| --- | --- |
| Bio, education, experience, awards, profile links | `data/authors/me.yaml` |
| Photo | `assets/media/portrait.jpg` (home page) and `assets/media/authors/me.png` (square avatar) |
| CV | Edit `cv/Snigdha_Sen_Academic_CV.docx` (or rebuild with `node cv/build_cv.js`), export to PDF and save as `static/uploads/resume.pdf` |
| Home page text, numbers, research cards, talks/grants/patents | `content/_index.md` (layout: `layouts/_partials/hbx/blocks/profile-home/block.html`; colours and fonts: `layouts/_partials/hooks/head-end/sen-brand.html`) |
| Menu | `config/_default/menus.yaml` |
| Publications | `publications.bib`, then `academic import publications.bib content/publications/ --compact` (or push — the import workflow opens a PR). Change her name to `me` in each new paper's `authors:` list. |

## Still to do (Snigdha)

- [ ] Review the bio (`me.yaml`) and Research text (`content/_index.md`) — drafted from her CV and brief profile
- [ ] Add the KSCST/VTU exhibition date for Care-In-A-Cup to show it under Awards
- [ ] Check co-authors on the pre-2021 papers (from ORCID, no DOI)

## Run locally

Needs Hugo Extended (version in `hugoblox.yaml`), Go, Node 22.

    corepack enable && pnpm install && pnpm dev

## Note

`layouts/_partials/functions/build_links.html` overrides one theme template to fix a nil-map error on Hugo 0.162. Delete it if a future theme update fixes the bug upstream.
