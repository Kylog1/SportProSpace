# Media kit — karta zawodnika

Szablon dwustronicowej karty A4, którą Sport Space Pro wysyła markom, przedstawiając
zawodnika. Jeden plik HTML, zero zależności, drukuje się do PDF z przeglądarki.

## Jak zrobić kartę dla zawodnika

1. Skopiuj `karta-zawodnika.html` do `karty/` pod nazwiskiem:
   `karty/karta-nazwisko.html`
2. Podmień wartości w obiekcie `DANE` na początku bloku `<script>`. To jedyne
   miejsce do edycji — reszta pliku renderuje się sama.
3. Uzupełnij wszystko, co jest w `[nawiasach kwadratowych]`.
4. Zdjęcie zawodnika połóż obok pliku i wpisz nazwę w polu `zdjecie`.
   Puste pole zostawia placeholder z inicjałami.
5. Otwórz w przeglądarce → `Ctrl+P` → **Zapisz jako PDF**, format **A4**,
   marginesy **brak**, grafika tła **włączona**.

Katalog `karty/` jest wyłączony z repozytorium — trafiają tam dane osobowe
i statystyki konkretnych zawodników, które nie powinny siedzieć w gicie.

## Co wchodzi na kartę

Strona 1 to strona decyzyjna: kto to jest, zasięg po kanałach, statystyki
z 30 dni, dorobek sportowy, wizerunek i rekomendowane kategorie marek.

Strona 2 to szczegóły: trzy najlepsze publikacje z liczbami, dotychczasowe
współprace, formaty i stawki, zobowiązania realizacyjne.

## Czego na karcie nie ma i być nie może

Nic z diagnostyki Commercial Score: ani wyniku ogólnego, ani rozbicia na
kategorie, ani deklaracji o poszukiwaniu partnerów, ani słabych stron.
Marka, która zobaczy „gotowość komercyjna 25/100", nie przeczyta reszty.
Wynik Commercial Score jest materiałem sprzedażowym dla Sport Space Pro
i informacją zwrotną dla zawodnika — nie dla kupującego.

Nie ma też danych kontaktowych zawodnika. Wszystkie ustalenia idą przez
`hello@sportspacepro.pl`.

## Zasady wypełniania

- **Liczby tylko ze statystyk.** Marka poprosi o zrzuty ekranu. Rozbieżność
  między kartą a statystykami kończy rozmowę.
- **Nie pokazuj kanału z zerem.** Brak TikToka jest neutralny, `TikTok: 0`
  czyta się jako zaniedbanie. Usuń wiersz z tablicy `kanaly`.
- **Poziom rozgrywkowy uczciwie.** Jeśli zawodnik jest w kadrze klubu, ale gra
  w rezerwach, napisz jedno i drugie. Sprawdzenie zajmuje minutę.
- **Osiągnięcie nazwij konkretnie.** „Wicemistrzostwo Polski 2024", nie „medal
  w kraju". Kategoria z ankiety nie sprzedaje, konkret sprzedaje.
- **Trzy wartości ustal w rozmowie z zawodnikiem.** On wie, co publikuje, ale
  sam tego nie nazwie. Konkretnie i po ludzku: „praca u podstaw", nie
  „profesjonalizm".
- **Kategorie marek to Twoja robota, nie jego.** Zawodnik zwykle potrafi
  powiedzieć tylko „coś ze sportem". Nazwanie kategorii jest tą częścią karty,
  po której marka poznaje, że pisał ją ktoś zawodowo.
- **Historia współprac jest ważniejsza, niż wygląda.** Nawet jedna zrealizowana
  kampania mówi marce „ten zawodnik już raz dowiózł" i zdejmuje największe
  ryzyko, jakim jest zniknięcie po podpisaniu umowy. Jeśli nazwy marki nie można
  podać, wystarczy branża i rok.
- **Sekcja „Realizacja" opisuje przyszłość, nie przeszłość.** Zamiast ukrywać
  nieregularność publikacji, podaj liczby, do których zawodnik się zobowiązuje
  w umowie: czas realizacji materiału, czas odpowiedzi, publikacje miesięcznie.
- **`pokazacStawki: false`** ukrywa kolumnę ze stawkami. Używaj przy pierwszym
  kontakcie z dużą marką albo dopóki stawki nie są ustalone z zawodnikiem.

## Gdy treść nie mieści się na stronie

Usuń jeden wiersz z `dowody` albo jedną pozycję z `formaty`. Karta ma się
zmieścić na dwóch stronach — trzecia oznacza, że coś jest zbędne.
