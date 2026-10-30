# snigdhasen.in

Personal academic website of Dr. Snigdha Sen, built with Hugo and the HugoBlox Academic CV template. Deploys to GitHub Pages on every push to `main`.

## Edit common things

| To change | Edit |
| --- | --- |
| Bio, education, experience, awards, profile links | `data/authors/me.yaml` |
| Photo | `assets/media/authors/me.png` (square, ≥ 800 px) |
| CV | `static/uploads/resume.pdf`, then re-enable the button in `content/_index.md` |
| Research text, home page sections | `content/_index.md` |
| Menu | `config/_default/menus.yaml` |
| Publications | `publications.bib`, then `academic import publications.bib content/publications/ --compact` (or push — the import workflow opens a PR). Change her name to `me` in each new paper's `authors:` list. |

## Still to do before launch (Snigdha)

- [ ] Rewrite the bio in `me.yaml` in her own words
- [ ] Add degree institutes, years and PhD thesis title
- [ ] Confirm job titles and add start/end dates; then re-enable the Experience menu item
- [ ] Confirm the awards (participant or mentor?) and add the KSCST date
- [ ] Add a headshot and CV PDF
- [ ] Check co-authors on the pre-2021 papers (from ORCID, no DOI) and remove any she doesn't want listed
- [ ] Review the Research text on the home page

## Run locally

Needs Hugo Extended (version in `hugoblox.yaml`), Go, Node 22.

    corepack enable && pnpm install && pnpm dev

## Note

`layouts/_partials/functions/build_links.html` overrides one theme template to fix a nil-map error on Hugo 0.162. Delete it if a future theme update fixes the bug upstream.
