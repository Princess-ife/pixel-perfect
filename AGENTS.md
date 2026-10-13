<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- All portfolio content (projects, videos, contact links) lives in src/data/projects.ts; pages render from it so updates happen in one place.
- Project preview images are pointers in src/assets/previews/<slug>.*.asset.json and video thumbnails in src/assets/videos/<video-slug>.*.asset.json, auto-matched by filename in src/data/previews.ts; missing ones render a labelled upload placeholder.
- Portrait, about photo and resume live in the `profile` object in src/data/projects.ts; undefined shows a placeholder (resume button stays disabled).
