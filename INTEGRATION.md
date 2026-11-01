# Safe feature detection

Feature detection is exported from `features.mjs` as well as the existing entry module. Its storage probe restores a preexisting namespaced probe value, removes only its own newly created probe, and leaves an application's `test` key untouched. Blocked storage getters and writes return unavailable rather than aborting detection.

`useResponsive` now passes the initializer lazily to React, avoiding a new storage probe on every ordinary render. Resize behavior and the public feature field names remain unchanged.

Six dependency-free tests cover server execution, storage preservation, cleanup, blocked access, failed writes and mobile/screen detection. Four additional consumer tests exercise the compiled ESM/CommonJS package entries, server-safe detection and button rendering with React 18.3.1.

The package reuses the verified dual-format build pattern from `nexus-ui-components`. React remains external; consumers need no JSX loader for the package root. `nexus-mobile-kit/features` exposes the pure feature utility separately. A pinned build tool, committed lockfile, package dry-run and read-only CI make this reproducible. The existing React peer range is retained, not expanded.

These tests do not certify the drawer, gestures, focus management, hydration or complete-page accessibility. Downstream adoption requires its own browser and human acceptance. No publication or deployment is performed.
