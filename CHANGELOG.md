# SL Swap Check — changelog

The version number lives in two places: `APP` in `index.html` (search for
`const APP =`) and `CACHE_VERSION` in `sw.js`. Bump both on every upload, or
phones keep serving the old files. The version shows in the ⋯ menu and at the
foot of every result receipt, so crew can tell you what they are looking at.

## 1.6 — 16 October 2026
- Fixed: "Clear this roster" and the last duty in the list sat behind the swap
  bar. The page now measures the bar and leaves exactly that much room, so it
  stays right however tall the bar grows.

## 1.5 — 16 October 2026
- Easier to read, same look. Grey text, the blue buttons and the red result bar
  were all slightly under the readable contrast line; they are darker now.
- Duty lines wrap instead of cutting the route off with "…", and small text
  (duty details, result items, the menu) is a size up with more line spacing.
- In dark mode the green, red and amber bars now use dark text — white on those
  light bars was hard to read.
- Cut the dense paragraphs in "What gets checked" down to five short lines.

## 1.4 — 16 October 2026
- Reverted the v1.3 restyle. Colours, type, radii and shadows are back to the
  v1.2 look. Everything v1.2 added (CMM guideline checks, Copy duty to send,
  the partial-roster warning, How to use) stays.

## 1.3 — 16 October 2026 (withdrawn)
- Apple-inspired restyle: parchment canvas, white cards with hairline borders
  instead of shadows, one action blue, pill buttons, San Francisco type at
  17px/400 with 600 for headings, and a press-to-shrink on every button.
- Thai Lion Air red is now the mark only — the icon and a thin red ring around
  it. Red in a result always means "not allowed".
- Dark mode is true black with iOS system colours.
- Dropped the Google Fonts link: the app uses the phone's own San Francisco, so
  nothing is fetched from the network, even on a first visit.

## 1.2 — 16 October 2026
- **Copy duty to send**: above the result bar, copies the duties you are giving
  as one pasteable line (`24/10 1400 2310 2`) for LINE, so neither of you has to
  hand over a whole roster. The other person pastes it into Paste text.
- The receipt now says when a roster is only partly entered, instead of giving a
  confident OK on two duties.
- Added **How to use** in the ⋯ menu and on the empty roster screen.

## 1.1 — 16 October 2026
- Added the CMM roster swap guideline, checked separately from the manual and
  shown in amber: finish by 23:00 before a day off; first duty after a day off
  not before 06:00 and not before the 36-hour break is over (CMM writes that as
  end of duty + 12 hours).
- Added reminders before sending a request: the CDIC swap window is closed on
  the 11th–16th, and a warning when a swapped duty is less than 3 days away.
- Result now has three states: red (manual broken), amber (manual fine, company
  guideline not), green (both fine).
- Appearance is Light or Dark only. Auto is gone; an install that had Auto keeps
  whatever it was showing.
- Added this version number to the app.

## 1.0 — September 2026
- First release: eCrew PDF import, manual chapter 7 checks (flight duty limits,
  rest, standby, reserve, duty hours, 36-hour break), swap result receipt,
  offline use, light and dark themes, days off / rest / annual leave.
