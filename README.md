# Trivia Time 🎉

A bright, friendly trivia app for little learners (built with a 5-year-old in mind). Pick a topic, then pick a game. Each round is 10 questions with big tappable buttons, cheerful sounds, voice answers, and a star score at the end. Wrong answers reveal the correct answer so kids learn as they play.

## Topics & games

### 🌍 Geography (20 countries)
- **Flags** — see a flag, pick the country.
- **Shapes** — see a country's silhouette, pick which country it is.
- **Symbols** — see a cultural emoji (🍣, 🗽, 🦘…), pick the country.
- **Clues** — read (or hear) 3 short facts, pick the country.

### 🐾 Animals (~20 animals across mammals, birds, reptiles, amphibians, fish, insects)
- **Pictures** — see the animal, pick its name.
- **Sounds** — see (or hear) the sound it makes ("Moooo!"), pick the animal.
- **Babies** — see the baby's name ("Joey", "Tadpole"), pick the parent.
- **Clues** — read (or hear) 3 short facts, pick the animal.

## Accessibility for pre-readers

- **🔊 Read aloud** on Clue/Sound/Baby modes uses the browser's speech synthesis to read the question out loud — kids who can't yet read can play independently.
- **🎤 Say it!** uses speech recognition: the child shouts the answer ("Lion!", "Brazil!", "Italia!") and the matching choice is auto-selected. Kid-friendly aliases are supported (USA = America, UK = Britain = England, Bunny = Rabbit, …).

Voice features need Chrome, Edge, or Safari (iOS 14.5+); Firefox lacks SpeechRecognition, so the mic button hides itself there.

## Run locally

It's plain HTML/CSS/JS — no build step. Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Merge this branch into `main` (or set it as the default branch).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to the active branch publishes automatically; the URL appears in the workflow run summary (typically `https://<user>.github.io/<repo>/`).

## Credits / assets

- Flags from the [flag-icons](https://github.com/lipis/flag-icons) project (SVG).
- Country silhouettes from the [mapsicon](https://github.com/djaiss/mapsicon) project (SVG).
- Animal images, country symbols, and topic icons are Unicode emoji rendered by the device.

Flag and shape images are loaded over HTTPS at runtime, so the app needs an internet connection the first time a country is shown (browsers cache them afterward). Animal modes work fully offline.
