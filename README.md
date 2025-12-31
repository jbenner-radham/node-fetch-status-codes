fetch-status-codes
==================

Fetch the HTTP status codes from the [IANA](https://www.iana.org/) registry.

Install
-------

```sh-session
npm install fetch-status-codes
```

Usage
-----

```typescript
import fetchStatusCodes, { fetchStatusCodeClasses } from 'fetch-status-codes';

// Calling `fetchStatusCodes()` without any arguments implicitly sets the `resolveRedirects` option
// to `false`.
await fetchStatusCodes();
// >>> [
// >>>   {
// >>>     value: 100,
// >>>     description: 'Continue'
// >>>     references: [
// >>>       {
// >>>         name: 'RFC9110, Section 15.2.1',
// >>>         url: 'https://www.iana.org/go/rfc9110'
// >>>       }
// >>>     ]
// >>>   },
// >>>   ...
// >>> ]

// Calling `fetchStatusCodes()` with the `resolveRedirects` option set to `true` gives you arguably
// better URLs since they aren't redirects and they will link directly to the relevant section if
// applicable. However, this will also add approximately one second of additional execution time to
// the app e.g., ~1.616s without resolution versus ~2.655s with resolution.
await fetchStatusCodes({ resolveRedirects: true });
// >>> [
// >>>   {
// >>>     value: 100,
// >>>     description: 'Continue'
// >>>     references: [
// >>>       {
// >>>         name: 'RFC9110, Section 15.2.1',
// >>>         url: 'https://www.rfc-editor.org/rfc/rfc9110.html#section-15.2.1'
// >>>       }
// >>>     ]
// >>>   },
// >>>   ...
// >>> ]

await fetchStatusCodeClasses();
// >>> [
// >>>   {
// >>>     value: '1xx',
// >>>     name: 'Informational',
// >>>     description: 'Request received, continuing process'
// >>>   },
// >>>   ...
// >>> ]
```

License
-------

The BSD 3-Clause License. See the [license file](LICENSE) for details.
