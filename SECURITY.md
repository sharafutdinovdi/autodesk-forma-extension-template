# Security policy

Security fixes target the current template on `main`. Repositories generated from it must apply updates themselves.

Report a vulnerability through [GitHub private vulnerability reporting](https://github.com/sharafutdinovdi/autodesk-forma-extension-template/security/advisories/new).
If that channel is unavailable, open an issue requesting a private contact without disclosing the vulnerability.
Include affected versions, reproduction steps and impact once a private channel is established.
Do not attach credentials, project identifiers or real proposal geometry to a public issue.

This client runs in the user's browser. Never embed secrets in it or in `VITE_*` variables.
The starter reads a proposal and does not write elements or draw overlays.
Fixture data is synthetic and does not initialize the Forma SDK.

The Autodesk Design System styles, fonts and component modules load from Autodesk's CDN.
Review changes to that external dependency and to the pinned npm lockfile before deployment.
