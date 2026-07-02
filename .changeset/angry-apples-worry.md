---
"taurpc": major
---

TauRPC 2.0.0

Breaking changes:

- Updated export behaviour, now the user is in charge of calling the exporter. Previously the types would be automatically exported in dev mode.

Features:

- Typesafe error handling (#67)

This version also internally upgrades to specta v2 which brought along quite some changes. The exported types for events look different now.
