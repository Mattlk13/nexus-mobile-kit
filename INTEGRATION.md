# Safe feature detection

Feature detection is exported from `features.mjs` as well as the existing entry module. Its storage probe restores a preexisting namespaced probe value, removes only its own newly created probe, and leaves an application's `test` key untouched. Blocked storage getters and writes return unavailable rather than aborting detection.

`useResponsive` now passes the initializer lazily to React, avoiding a new storage probe on every ordinary render. Resize behavior and the public feature field names remain unchanged.

Six dependency-free tests cover server execution, storage preservation, cleanup, blocked access, failed writes and mobile/screen detection. These tests do not certify the drawer, gestures, focus management, hydration or complete-page accessibility. Downstream adoption requires its own browser and human acceptance.
