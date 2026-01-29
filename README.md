# Koľko stojí realita

Jednoduchá kalkulačka reálnych mesačných životných nákladov na Slovensku. 4 otázky, 30 sekúnd – zistíš, koľko ťa reálne stojí život podľa regiónu, bývania, detí a auta.

## Tech stack

- **Next.js 14** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS**, **Framer Motion**
- OG obrázok pre sociálne siete (`/api/og`)

## Lokálny vývoj

```bash
npm install
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

## Skripty

| Príkaz      | Popis              |
|------------|--------------------|
| `npm run dev`   | Dev server         |
| `npm run build` | Production build   |
| `npm run start` | Spustí production  |
| `npm run lint`  | ESLint             |

## GitHub a deploy

### Prvý push na GitHub

1. **Ak máš `index.lock` chybu:** zatvor Cursor/VS Code alebo iný program, ktorý môže držať Git, potom zmaž súbor `.git/index.lock` (alebo v termináli: `Remove-Item .git/index.lock -Force`).

2. **Vytvor nový repozitár na GitHube:** [github.com/new](https://github.com/new)  
   - Názov napr. `kolko-stoji-realita`  
   - Nepridávaj README ani .gitignore (už sú v projekte)

3. **V priečinku projektu spusti:**

```powershell
git add -A
git commit -m "Koľko stojí realita - kalkulačka životných nákladov"
git branch -M main
git remote add origin https://github.com/TVOJ_USERNAME/kolko-stoji-realita.git
git push -u origin main
```

(Nahraď `TVOJ_USERNAME` svojím GitHub používateľským menom.)

### Deploy

Projekt je pripravený na **Vercel**. Stačí napojiť GitHub repo a nasadiť.

---

*Toto nie je oficiálna štatistika – ide o realistický odhad založený na bežných životných nákladoch.*
