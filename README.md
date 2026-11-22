# News Image — 22 November 2026

[![make.fun](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![make.fun](https://make.fun/badge/news-image-20261122/rohanajesika/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![make.fun](https://make.fun/badge/news-image-20261122/rohanajesika/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

One image that sums up the world's news of **Sunday 22 November 2026**:
50 sourced stories on a single UTC wire, drawn as a one-page newspaper
poster (1024×1024, 185,790 bytes).

## What the poster shows

- **Masthead** — the day it sums up, in full: Sunday, 22 November 2026.
- **Three leads** — Iran strikes US assets in Bahrain as tankers are hit
  in the Strait of Hormuz; the EU and Indonesia sign their trade deal
  after ten years of talks; a Russian missile strike on Lviv kills two.
- **The wire** — 47 more stories in UTC order, each with its source and
  its UTC time, across 14 sections: conflict, diplomacy, economy, climate,
  justice, politics, health, technology, sport, culture, disaster,
  migration, energy and transport.
- **Date check** — a panel proving every story happened, or was first
  reported, on Sunday 22 November 2026 in some time zone. `†` marks the
  10 overnight items whose event fell on 21 Nov 19:00–23:30 UTC and
  reached 22 November's editions in Asia-Pacific. The poster was built at
  01:30 UTC, before the rest of Sunday's news — so the panel also lists
  the day's fixtures still to come (Hull v Brighton 14:00 UTC,
  Liverpool v Man Utd 16:30 UTC).
- **By the numbers** — 50 stories, 14 sources, 14 sections, 10 overnight,
  wire 00:05–01:34 UTC.

Sources include AFP, Al Jazeera, ARY News, CBS News, CNA, Daily Jagran,
Euronews, France 24, NAMPA, PW.live, SBS News, SCMP, Sportradar and The
Insight International. The research notes behind every headline are kept
with the build notes, outside this repository.

## The program

`main.ts` (Node 22, standard library only) copies the finished poster
`entry.png` into `MAKEFUN_OUTPUT_DIR` (default `/output`). Before copying
it checks the poster's PNG signature, its IEND trailer and its pixel size
against the 1024×1024 gate, and after copying it checks the copy's byte
count. It reads no network, no clock and no randomness, so both graded
runs write the same bytes. It locates the poster through its own file
URL, so it runs from any working directory, and it creates no
directories — the grader provides a writable output directory.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Licence

MIT — see [LICENSE](LICENSE).
