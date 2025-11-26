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
import fetchStatusCodes from 'fetch-status-codes';

await fetchStatusCodes();
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

await fetchStatusCodes({ resolveRedirects: false });
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
```

License
-------

The BSD 3-Clause License. See the [license file](LICENSE) for details.
