# BALU – site atelier de tâmplărie

Site static (HTML, CSS și puțin JavaScript), fără instalări. Se publică direct pe Vercel.

## Pagini

| Fișier | Pagina |
|---|---|
| `index.html` | Pagina principală (hero, cifre, echipă, categorii, 3D, CNC, lucrări, clipuri, hartă, recenzii, shop, cerere ofertă) |
| `lucrari.html` | Portofoliu cu filtre pe categorii |
| `proiect-scara-lemn-natur.html` | Exemplu de pagină de proiect (galerie, descriere, clip, proiecte similare) |
| `atelier.html` | Povestea, echipa, proiectare 3D, atelier CNC, toate clipurile |
| `shop.html` | Shop „în curând” |

## Unde se schimbă lucrurile

- **Logo:** se înlocuiesc `assets/img/logo-dark.svg` (pe fundal deschis) și `assets/img/logo-light.svg` (în footer), păstrând aceleași nume.
- **Culori și fonturi:** la începutul fișierului `assets/css/style.css`, în blocul `:root`.
- **Numărul de WhatsApp din formular:** în `assets/js/main.js`, variabila `WHATSAPP`.
- **Fotografii:** în `assets/img/` (lățime de aproximativ 1400 px, JPG).
- **Clipul din hero:** în `index.html` există un comentariu care arată cum se înlocuiește poza cu un clip video.

## Ce rămâne de completat

- Toate textele dintre paranteze pătrate: `[000]`, `[oraș, țară]`, `[contact@balu.ro]`, rețele sociale.
- Casetele cu linie punctată: randări 3D reale, fotografii sau clipuri CNC, povestea atelierului.
- Recenziile sunt **exemple** și trebuie înlocuite cu recenzii reale.
- Fotografiile marcate „Vizualizare” sunt piese reale prezentate într-un ambient vizualizat digital.

## Pentru programare (etapa următoare)

- Trimiterea reală a formularului (email și fotografii), de exemplu printr-un serviciu de formulare. Acum, formularul pregătește un mesaj pe WhatsApp.
- Versiunile în germană și engleză (butoanele DE / EN afișează acum „în curând”).
- Harta reală a lucrărilor.
- Magazinul online.
