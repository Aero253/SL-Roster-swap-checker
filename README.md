# SL Swap Check

A small web app for cabin crew: check a duty swap against the flight time limitations
in the Thai Lion Air Cabin Crew Manual, chapter 7 (Issue SL003, Rev 00).

Import each person's eCrew **Personal Crew Schedule Report** PDF, tap the duties being
traded, and the app says whether the swap is legal and which rule breaks if it isn't.

It runs entirely in the browser. Rosters are stored on the phone only, PDFs are never
uploaded, and there is no backend.

## What it checks

- Maximum flight duty period (Table 2 and the extension table, including sector limits)
- Minimum rest before each flight, at home base and away
- A night's sleep between a late finish and an early start
- Standby length, reserve length and consecutive reserve days
- Duty hours in any 7, 14 and 28 days
- A 36-hour break with 2 local nights at least every 168 hours, extended to 60 hours
  after four or more early, late or night duties

Not checked: flight hours, acclimatisation (Table 3), travel time to a layover hotel,
and section 7.1.7. Annual leave and rest days are locked and cannot be put in a swap.

This is an unofficial helper. Crew scheduling has the final say, and the current
revision of the manual always wins.

Built by **Panupong Muangyai**, cabin crew at DMK.

## Publish it on GitHub Pages

1. On github.com, create a new **public** repository, for example `swap-check`.
2. Choose **Add file → Upload files** and drag in everything from this folder, including
   the `vendor` folder. Keep `index.html` at the top level of the repository, with
   `vendor/pdf.min.mjs` and `vendor/pdf.worker.min.mjs` inside `vendor`.
3. Commit, then go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source: Deploy from a branch**, branch **main**,
   folder **/ (root)**, and press **Save**.
5. Wait a minute or two. The site appears at
   `https://<your-username>.github.io/swap-check/`.

On an iPhone, open that link in Safari, tap the share button and choose
**Add to Home Screen**. It then opens full screen like an app.

## Offline

Everything the app needs is in the repository, including the PDF reader in `vendor`, so
after the first visit it works with no signal at all: opening the app, importing a PDF,
checking a swap. Rosters are kept in the browser's local storage on that phone.

## Dark mode

The ⋯ menu has Light, Dark and Auto. Auto follows the phone's setting. The choice is
remembered. The result receipt stays on white paper on purpose, so it always reads
clearly.

## When the manual is revised

The app is built from one revision of the manual, shown in the header and in the
⋯ menu under *Rules version*. When a new revision comes out:

1. In `index.html`, search for `const RULES =` and update the issue and date.
2. Search for `FTL RULES ENGINE`. The comment there lists every limit and where it
   lives: the two FDP tables, the rest minimums, the cumulative duty hours, the
   standby and reserve limits, and the recovery rules.
3. Bump `CACHE_VERSION` in `sw.js` and upload both files.

## Updating the app

`sw.js` caches the app so it opens offline. After you upload a new `index.html`,
open `sw.js` and bump the version:

```js
const CACHE_VERSION = 'swapcheck-v3';   // was swapcheck-v2
```

Without that, phones keep serving the old cached version.

## How the PDF import works

`pdf.js` is served from `vendor/`, with jsDelivr as a fallback if those files are
missing. The importer reads each row of the schedule table by its position on the page:

- Report time from the *Report times* column, on-blocks from *Debrief times* minus the
  30 minutes of post-flight duty
- Sector count from the routes, ignoring positioning sectors marked with `*`
- Away from base when the first sector doesn't start at your home base
- `RFD` as reserve, `SB` as standby at home, `OFF` and `PHDO` as days off,
  `A/L` as annual leave

If a PDF won't read, open it, copy all the text and use **Paste** instead.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app: rules engine, PDF importer and interface |
| `manifest.json` | Name, colours and icons for Add to Home Screen |
| `sw.js` | Service worker for offline use, cache-first |
| `vendor/pdf.*.mjs` | Mozilla's pdf.js, bundled so PDF import works offline (Apache 2.0) |
| `icon-*.png`, `apple-touch-icon.png` | App icons |

The icon uses the Thai Lion Air lion, which is the airline's trademark. This app is not
made or endorsed by the airline, so ask the company before putting its mark on a public
site, or swap in a plain icon.
