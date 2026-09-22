# Contributing

Use Node 20 or 22. Run `npm ci`, then `npm run dev`.
Open `http://localhost:5173/?fixture=1`; also check `state=loading`, `state=empty` and `state=error`.
If 5173 is occupied, use `npm run dev -- --port 5174` and the matching preview URL.
Do not stop another project's server.

Keep runtime dependencies limited to the Forma SDK. Use the CDN Weave components and the local 4/8/16 px spacing scale.
Use SDK 0.96.0 declarations and the linked worked example to verify host contracts.
Mark behavior that has not been tested in a live Forma project as unverified.

Run `npm run typecheck` and `npm run build` before opening a pull request.
For UI changes, check 190, 240 and 440 px, keyboard focus, reduced motion and all fixture states.
Capture `docs/screens/example-440.png` at a 440 × 480 CSS px viewport with device scale 2 after fonts and Weave modules load.
Use synthetic data in public screenshots and reports.

Motion: no signature effect, custom transitions or keyframes. Only native Weave states. Animation dependency budget: 0 kB.
Native CDN transitions are owned by Autodesk; this template does not override their reduced-motion behavior.

The rename script requires a clean git tree, including untracked files.
After renaming, review and commit those changes before rerunning it.
Running it with the same name on a clean tree makes no further changes.
