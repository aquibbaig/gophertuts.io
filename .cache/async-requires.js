// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-docs-js": () => import("../src/templates/docs.js" /* webpackChunkName: "component---src-templates-docs-js" */),
  "component---cache-dev-404-page-js": () => import("dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */)
}

