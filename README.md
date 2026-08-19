# Anna Bajorek — Portfolio

Statyczna strona portfolio (czysty HTML/CSS/JS, bez frameworków i bez etapu builda).

## Struktura

```
/index.html
/css/style.css
/js/script.js
/images/
  /photography/   ← placeholdery SVG dla 6 projektów fotograficznych
  /film/          ← placeholdery SVG (still frames) dla 3 projektów filmowych
  /store/         ← placeholdery SVG produktów
  /bio/           ← placeholder portretu
  hero.svg        ← nieużywany placeholder w tle (zapasowy)
/documents/
  CV_Anna_Bajorek.pdf  ← placeholder PDF, do podmiany na prawdziwe CV
```

## Podmiana zdjęć na prawdziwe

Wszystkie obecne pliki `.svg` w `/images/` to **placeholdery** (abstrakcyjne,
tonalne kompozycje) — potrzebne tylko po to, żeby galerie działały i miały
poprawne proporcje od razu po wgraniu strony. Aby wstawić prawdziwe zdjęcia:

1. Wyeksportuj zdjęcia w formacie `.jpg` (jakość ok. 80–85%) lub `.webp`,
   tak aby **dłuższy bok miał 1800 px** (zgodnie z obecnymi placeholderami —
   to wystarczająca rozdzielczość przy wyświetlaniu na ~85% wysokości ekranu,
   przy rozsądnej wadze pliku). Krótszy bok wynika z proporcji zdjęcia.
2. Nadpisz pliki w odpowiednim folderze, zachowując te same nazwy
   **lub** podmień ścieżki `src="images/..."` w `index.html`.
3. Ważne: **nie przycinaj** zdjęć do jednego formatu — galeria celowo
   zachowuje oryginalne proporcje każdej fotografii (`object-fit: contain`,
   `width: auto`). To jest kluczowy element designu.
4. Liczbę zdjęć w danym projekcie można swobodnie zwiększać/zmniejszać —
   wystarczy dodać/usunąć znaczniki `<figure class="frame">…</figure>`
   wewnątrz odpowiedniego `<div class="gallery-track" data-track>`.
   Licznik "01 / 07" przelicza się automatycznie w JS.

## Podmiana treści

- **Teksty projektów, lata, opisy** — bezpośrednio w `index.html`,
  w blokach `.project-intro`.
- **Filmy Vimeo** — podmień numer wideo w `src` iframe'a:
  `https://player.vimeo.com/video/TWOJE_ID?title=0&byline=0&portrait=0`
- **CV** — nadpisz `documents/CV_Anna_Bajorek.pdf` prawdziwym plikiem
  o tej samej nazwie (lub zmień link w sekcji Bio).
- **Kontakt** — e-mail, Instagram, Vimeo w sekcji `#contact` oraz w linku
  `mailto:` w sekcji Store.
- **Sklep** — każdy produkt to blok `<article class="product">` w sekcji
  `#store`; edytuj tytuł, opis, cenę i link `mailto:`.

## Hosting na GitHub Pages

1. Utwórz nowe repozytorium na GitHub (np. `anna-bajorek-portfolio`).
2. Wgraj do niego całą zawartość tego folderu (zachowując strukturę).
3. W ustawieniach repozytorium: **Settings → Pages → Branch** ustaw
   `main` (lub `master`) i folder `/ (root)`.
4. Strona pojawi się pod adresem
   `https://TWOJA-NAZWA-UZYTKOWNIKA.github.io/anna-bajorek-portfolio/`
5. Plik `.nojekyll` jest już dołączony — zapobiega niepotrzebnemu
   przetwarzaniu strony przez Jekyll.

Strona nie wymaga żadnego kroku budowania (`npm install`, bundlerów itd.) —
to czysty HTML/CSS/JS gotowy do wdrożenia od razu.

## Wsparcie przeglądarek / dostępność

- Responsywność: pełna, od telefonu po duże ekrany.
- Na urządzeniach dotykowych/mniejszych ekranach (`max-width: 640px`)
  poziome galerie automatycznie zamieniają się w pionowe przewijanie.
- Uwzględniono `prefers-reduced-motion` — animacje i płynne przewijanie
  wyłączają się dla użytkowników, którzy wybrali tę preferencję systemowo.
- Widoczny fokus klawiatury (`:focus-visible`) na wszystkich linkach i
  przyciskach.
