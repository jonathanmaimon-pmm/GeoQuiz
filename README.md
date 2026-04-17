# Geography Quiz 🌍

A bright, friendly geography quiz for little explorers (built with a 5-year-old in mind).

## Games

- **Flags** — see a flag, pick the country.
- **Shapes** — see a country's silhouette, pick which country it is.
- **Symbols** — see a cultural emoji (🍣, 🗽, 🦘…) and pick the country.

Each round is 10 questions with big tappable buttons, cheerful sounds, and a star score at the end. Wrong answers reveal the correct country so kids can learn as they play.

## Run locally

It's plain HTML/CSS/JS — no build step. Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

Two options:

**Option A — via the included workflow (recommended):**
1. Merge this branch into `main`.
2. On GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` will publish the site automatically. The URL appears in the workflow run summary (usually `https://<user>.github.io/<repo>/`).

**Option B — branch-based Pages:**
1. Push to a branch (e.g. `main`).
2. **Settings → Pages → Source: Deploy from a branch** → pick `main` / `/ (root)`.

## Credits / assets

- Flags from the [flag-icons](https://github.com/lipis/flag-icons) project (SVG).
- Country silhouettes from the [mapsicon](https://github.com/djaiss/mapsicon) project (SVG).
- Cultural icons are Unicode emoji rendered by the device.

Both image sources are loaded over HTTPS at runtime, so the app needs an internet connection the first time a flag or shape is shown (browsers will cache them afterward).
