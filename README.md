# Vigilante

Vigilante is a zero dependency module that monkey patches and intercepts __`all`__ network requests within a node application using the NodeJS http and https module.

```javascript
/**
 * Import the vigilante module. It emits success and error events.
 **/
require('./')
  .on('success', (request, response) => {
    console.log(request, response)
  })
  .on('error', (request, response) => {
    console.log(request, response)
  })
```

#### __`Sample Request`__

```json
{
  host: 'github.com',
  port: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/the-wunmi',
  path: '/the-wunmi',
  href: 'https://github.com/the-wunmi',
  url: undefined,
  method: 'GET',
  headers: undefined,
  body: undefined
}
```

#### __`Sample Response`__

```json
{
  statusCode: 200,
  headers: {...},
  trailers: {},
  httpVersion: '1.1',
  url: '',
  body: '...'
}
```
