const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-docs-js": hot(preferDefault(require("/home/abaig/Desktop/Work/Javascript/gophertuts.io/src/templates/docs.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/abaig/Desktop/Work/Javascript/gophertuts.io/.cache/dev-404-page.js")))
}

