<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Simulated parking data lives only in `src/data/`; each spec rule's logic lives as pure functions in `src/lib/` (e.g. `ocupacao.ts`, `aviso-saida.ts`) with tests. Why: the spec requires data separated from the UI so the source can later be swapped (cameras) without redoing the screen.
- The app runs fully in the browser with no backend or login. Why: the spec's v0.1 scope excludes server, database and login.
- The GitHub Pages site is a separate static entry (`pages/` + `vite.pages.config.ts`, built by `.github/workflows/deploy-pages.yml`) that renders the same `SafeparkApp` component. Why: GitHub Pages only serves static files, so it cannot run the server-rendered app.
