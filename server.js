// Create Vue instance
// const Vue = require('vue')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer({
//   template: require('fs').readFileSync('./index.template.html', 'utf-8')
// })
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer('./build/vue-ssr-server-bundle.json', {
  runInNewContext: false, // recommended
  template: // (optional) page template
  clientManifest // (optional) client build manifext
})

// const context = {
//   title: 'Testing',
//   metas: `
//     <meta name="keyword" content="vue,ssr">
//     <meta name="description" content="vue srr demo">
//   `
// }

const createApp = require('/path/to/built-server-bundle.js')

server.get('*', (req, res) => {
  const context = { url: req.url }
//   createApp(context).then(app => {
//     renderer.renderToString(app, (err, html) => {
//       if (err) {
//         if (err.code === 404) {
//           res.status(404).end('Page not found')
//         } else {
//           res.status(500).end('Internal Server Error')
//         }
//       } else {
//         res.end(html)
//       }
//     })
//   })
// })
  // No need to pass an app here because it is auto created by executing the bundle. Now our server is decoupled from our Vue app
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
    } else {
      res.end(html)
    }
  })

server.listen(8000)
