# Skill Map: a learning-path knowledge graph

An interactive knowledge graph of what I'm learning. It starts from **AI**, expands into **Finance**, and shows where the two connect (**AI × Finance**).

- **Knowledge graph:** domains → topics → concepts (terminology), with dashed cross-links between related ideas, including across domains. Click any node to see its definition, connected concepts and the best courses for it.
- **Skills gained:** mark a course *Completed* and every concept it covers lights up. Each domain hub shows a progress ring.
- **My learning log:** a separate tab where you paste any course link (Udemy, Coursera, YouTube…). The title and provider are filled in from the link, and likely concepts are pre-selected. Add status, dates and notes. Your courses appear on the graph as ★ dashed diamonds when **Show courses** is on.

## Run it

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

To host it, enable **GitHub Pages** for this repo (Settings → Pages → deploy from `main`, root).

## Grow the map

Everything lives in [`data.js`](data.js):

| Key | What it is |
| --- | --- |
| `domains` | Big hubs. `anchor` is the rough position on the canvas. |
| `topics` | Sub-areas inside a domain. |
| `concepts` | Terminology. Attach with `topic` (or `domain`); `related: [ids]` draws cross-links. |
| `courses` | Curated best links. `covers: [concept ids]` drives "skills gained". |

To add a new domain (say, Economics), add one entry to `domains` with a new `anchor`, then add its topics, concepts and courses.

## Where progress is saved

Course status, learned concepts and your learning log are saved in your browser (`localStorage`). Use **Export JSON** in *My learning log* to back them up or move them to another device, and **Import JSON** to restore them. You can also commit the exported file to this repo.
