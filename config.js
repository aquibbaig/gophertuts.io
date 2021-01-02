const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://gophertuts.surge.sh',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://golang.org/lib/godoc/images/go-logo-blue.svg',
    logoLink: '/',
    title:
      // "<a href='https://hasura.io/learn/'><img class='img-responsive' src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/learn-logo.svg' alt='Learn logo' /></a>",
      "",
      githubUrl: 'https://github.com/aquibbaig/gophertuts.io',
    helpUrl: '',
    tweetText: '',
    social: `<li>
		    <a href="https://twitter.com/BaigAquib" target="_blank" rel="noopener">
		      <div class="twitterBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Twitter'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/gRPC',
    ],
    collapsedNav: [
      '/codeblock', // add trailing slash if enabled above
    ],
    links: [{ text: 'Golang', link: 'https://golang.org/' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://golang.org/'>golang </a><div class='greenCircle'></div>fundamentals",
  },
  siteMetadata: {
    title: 'Gophertuts',
    description: 'Golang made easy.',
    ogImage: null,
    docsLocation: 'https://github.com/aquibbaig/gophertuts.io/tree/master/content',
    favicon: '',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gophertuts',
      short_name: 'Gophertuts',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
