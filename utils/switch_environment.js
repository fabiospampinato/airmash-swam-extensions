
function switchEnvironment ( development = true ) {

  /* VARIABLES */

  const STORAGE_KEY = 'SWAM_Extensions',
        PRODUCTION_TO_DEVELOPMENT_REGEX = /.*fabiospampinato.*master\/(.*)/,
        PRODUCTION_TO_DEVELOPMENT_REPLACE = 'http://localhost:4444/$1',
        PRODUCTION_TO_DEVELOPMENT = [PRODUCTION_TO_DEVELOPMENT_REGEX, PRODUCTION_TO_DEVELOPMENT_REPLACE],
        DEVELOPMENT_TO_PRODUCTION_REGEX = /.*localhost:4444\/(.*)/,
        DEVELOPMENT_TO_PRODUCTION_REPLACE = 'https://rawgit.com/fabiospampinato/airmash-swam-extensions/master/$1',
        DEVELOPMENT_TO_PRODUCTION = [DEVELOPMENT_TO_PRODUCTION_REGEX, DEVELOPMENT_TO_PRODUCTION_REPLACE],
        ENVIRONMENT = development ? PRODUCTION_TO_DEVELOPMENT : DEVELOPMENT_TO_PRODUCTION;

  /* SWITCH */

  function switchUrls () {

    const extensions = JSON.parse ( localStorage.getItem ( STORAGE_KEY ) );

    Object.keys ( extensions.extensionsToLoad ).forEach ( id => {

      const url = extensions.extensionsToLoad[id].url,
            newUrl = url.replace ( ...ENVIRONMENT );

      extensions.extensionsToLoad[id].url = newUrl;

    });

    localStorage.setItem ( STORAGE_KEY, JSON.stringify ( extensions ) );

  }

  switchUrls ();

  window.location.reload ();

}

// switchEnvironment ();
