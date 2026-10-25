# pug-browser

## Schrift Inter

`src/Inter/inter.scss` definiert die `@font-face`-Regeln für Inter:

- `Inter`: Variable Fonts (Gewichte 100–900, normal und kursiv)
- `Inter 18pt`, `Inter 24pt`, `Inter 28pt`: statische Schnitte

Die referenzierten WOFF-Dateien werden ohne zusätzliche Pakete erzeugt:

```sh
node src/Inter/build-woff.mjs
```

Dabei entstehen die Dateien in `src/Inter/woff/`; Kommas im Dateinamen werden
durch `-` ersetzt. Der URL-Pfad der Schriften lässt sich vor dem Import anpassen:

```scss
@use "inter" with (
    $inter-font-path: "/pfad/zu/woff",
    $inter-include-static: false // nur die Variable Fonts einbinden
);

body { font-family: inter.$inter-font-family; }
```

### Installation im CMS

`src/sql/install/tualocms_dateien_inter.sql` legt alle WOFF-Dateien in
`tualocms_dateien` ab (Inhalt als base64-Data-URL in `ds_files_data`):

- `id` und `file_id`: aus dem Dateinamen abgeleitete UUIDs, ein erneuter Import
  aktualisiert daher die bestehenden Datensätze
- `titel`: `inter/<filename>`, z. B. `inter/Inter-VariableFont_opsz-wght.woff`
- `typ`: Dateityp `Schriften` (`font`, bzw. ein vorhandener Typ gleichen Namens)

Voraussetzung sind die Tabellen aus `cms/src/sql/install/tualocms_dateien_typen.sql`,
`cms/src/sql/install/tualocms_dateien.sql` und `ds/src/sql/ds_files.sql`.
Die Datei wird nach `build-woff.mjs` neu erzeugt mit:

```sh
node src/Inter/build-sql.mjs
```

Nach Änderungen am WOFF-Generator beide Skripte erneut ausführen und die
SQL-Datei erneut importieren. Bereits gespeicherte Dateien werden über ihre
stabilen UUIDs aktualisiert. Anschließend den Browser-Cache für die
Schriftdateien leeren bzw. mit deaktiviertem Cache neu laden.
Die WOFF-Struktur und SQL-Nutzdaten lassen sich ohne Zusatzpakete prüfen:

```sh
node --test src/Inter/build-woff.test.mjs
```

Die Schriften sind dann unter `./tualocms/page/asset/inter/<filename>` erreichbar:

```scss
@use "inter" with (
    $inter-font-path: "./tualocms/page/asset/inter",
    $inter-static-font-path: "./tualocms/page/asset/inter"
);
```
