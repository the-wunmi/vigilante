const https = require('https')
require('./')
  .on('success', (request, response) => {
    console.log(request, response)
  })
  .on('error', (request, response) => {
    console.log(request, response)
  })

https.request('https://github.com/the-wunmi').end()