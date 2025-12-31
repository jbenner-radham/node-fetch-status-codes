Changelog
=========

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[Unreleased]
------------

### Changed

- The default setting for the `resolveRedirects` option is now `false`. This reduces the operation
  time by approximately one second. However, if the old behavior is desired you can manually set the
  option to `true`.
- Upgraded [jsdom](https://github.com/jsdom/jsdom#readme) from v27.3.0 to v27.4.0.

[0.2.0] - 2025-12-23
--------------------

### Added

- A `fetchStatusCodeClasses` function, to fetch the HTTP status code classes.

### Changed

- Upgraded [jsdom](https://github.com/jsdom/jsdom#readme) from v27.2.0 to v27.3.0.

### Fixed

- Redirect resolution. Previously it was only being done on 301 status codes,
  now all 3xx responses with a location header are resolved.

[0.1.1] - 2025-11-26
--------------------

### Fixed

- Add missing keywords to `package.json`.

[0.1.0] - 2025-11-26
--------------------

### Added

- Initial release.

[UNRELEASED]: https://github.com/jbenner-radham/node-fetch-status-codes/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/jbenner-radham/node-fetch-status-codes/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/jbenner-radham/node-fetch-status-codes/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/jbenner-radham/node-fetch-status-codes/releases/tag/v0.1.0
