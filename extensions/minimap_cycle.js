
(function () {

  /* VARIABLES */

  let sizes = [240, 480, 0], //TODO: This should be customizable
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

  SWAM.on ( 'gameLoaded', init );

  /* EVENTS */

  function onKeydown ( event ) {

    if ( event.originalEvent.key === 'n' ) { //TODO: This should be customizable

      event.stopImmediatePropagation ();

      cycle ();

    }

  }

  /* API */

  function cycle ( index ) {

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
    author: 'Fabio Spampinato'
  });

}());
