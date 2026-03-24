# Komanda Ryžys Landing (Vite + React + Tailwind)

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## If you are getting git conflicts before commit

Use this safe sequence to preserve your work and re-apply cleanly:

```bash
git status
git add -A
git stash push -m "wip-before-kr-sync"
git fetch origin
git checkout <your-branch>
git pull --rebase origin <your-branch>
git stash pop
```

If conflicts still appear:

```bash
git status
# open conflicted files and keep the desired blocks
# then:
git add <resolved-files>
git rebase --continue
```

If you need to discard local conflicted state and recover this version:

```bash
git reset --hard
# optional: restore the last good commit from this branch
git log --oneline -n 5
```

## Project structure

- `src/App.jsx`: App shell + interactions (auth panel, toasts, section wiring).
- `src/components/*`: Feature sections (Hero, How it works, Features, Venues, Community, Pricing).
- `tailwind.config.js`: Brand theme, animations, shadows.
- `src/index.css`: Global styles and shared utility classes.
