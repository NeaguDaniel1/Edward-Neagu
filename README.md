# Orizont Travel – site de agenție de turism (proiect școlar)

Site static (HTML + CSS + JavaScript), **fără nicio dependență externă**, așa că merge:
- **offline, de pe stick** – deschizi direct `index.html`;
- **online, pe Cloudflare Pages** – fără build, fără configurări speciale.

## Pagini

| Fișier | Ce conține |
|---|---|
| `index.html` | Pagina principală: căutare rapidă, avantaje, destinații populare, statistici, pași, testimoniale, newsletter |
| `destinatii.html` | Toate destinațiile, cu filtre (România / Europa / Exotic), căutare, sortare și detalii în fereastră |
| `oferte.html` | Oferte last minute / early booking, numărătoare inversă, tabel cu circuite |
| `rezervare.html` | Formular de rezervare cu **calculator de preț live** (adulți, copii, cameră, masă, asigurare, cod de reducere `SCOALA10`) |
| `despre.html` | Povestea agenției, valori, echipa, întrebări frecvente |
| `contact.html` | Date de contact, formular cu validare, hartă stilizată |
| `404.html` | Pagina de eroare (folosită automat de Cloudflare Pages) |

Structură: `css/style.css` (stiluri), `js/data.js` (destinațiile și ofertele – aici modifici prețuri și texte), `js/script.js` (interactivitate), `img/` (ilustrații SVG).

> Formularele sunt demonstrative: nu trimit date nicăieri, doar afișează un mesaj de confirmare.

## 1. Pe stick (offline)

1. Copiază **tot folderul** (cu `css`, `js`, `img`) pe stick.
2. Deschide `index.html` cu dublu-click (Chrome, Edge sau Firefox).

## 2. Online pe Cloudflare Pages

### Varianta A – legat de GitHub (se actualizează singur la fiecare commit)
1. Intră pe <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → tab-ul **Pages** → **Connect to Git**.
2. Alege repository-ul `Edward-Neagu` și branch-ul pe care e site-ul.
3. La setări: **Framework preset:** `None`, **Build command:** gol, **Build output directory:** `/`.
4. **Save and Deploy**. Site-ul va fi la o adresă de forma `https://nume-proiect.pages.dev`.

### Varianta B – încărcare manuală (Direct Upload)
1. **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Dai un nume proiectului și tragi folderul site-ului în pagină → **Deploy site**.

### Varianta C – din terminal
```bash
npx wrangler pages deploy . --project-name=orizont-travel
```

## Personalizare rapidă
- **Numele agenției:** caută „Orizont” în fișierele `.html` și înlocuiește.
- **Destinații / prețuri:** editează `js/data.js`.
- **Culori:** variabilele de la începutul `css/style.css` (`--primary`, `--accent`).
