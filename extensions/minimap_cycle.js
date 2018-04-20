
(function () {

  /* VARIABLES */

  let settings = {
        sizes: '240, 480, 0'
      },
      sizeIndex = -1;

  /* INIT */

  function init () {

    initEvents ();
    initGame ();

  }

  function initEvents () {

    SWAM.on ( 'keydown', onKeydown );

  }

  function initGame () {

    SWAM.on ( 'gamePrep', () => cycle ( 0 ) );

  }

  function initSettings () {

    const provider = new SettingsProvider ( settings, updated => settings = updated ),
          section = provider.addSection ( 'General' );

    section.addString ( 'sizes', 'Minimap sizes' );

    return provider;

  }

  SWAM.on ( 'gameLoaded', init );

  /* EVENTS */

  function onKeydown ( event ) {

    if ( event.originalEvent.key === 'n' ) { //TODO: This should be customizable

      event.stopImmediatePropagation ();

      cycle ();

    }

  }

  /* API */

  function _getSizes () {

    return settings.sizes.split ( ',' ).map ( size => size.trim () );

  }

  function cycle ( index ) {

    const sizes = _getSizes ();

    sizeIndex = index === undefined ? ( sizeIndex + 1 ) % sizes.length : index;

    const size = sizes[sizeIndex];

    window.config.minimapSize = size;

    UI.visibilityMinimap ( !!size );
    UI.resizeMinimap ();

  }

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Minimap Cycle',
    id: 'fabiospampinato.minimapCycle',
    description: 'Cycle between different minimap sizes.',
    version: '1.0.0',
    author: 'Fabio Spampinato',
    settingsProvider: initSettings ()
  });

}());
