
(function () {

  /* VARIABLES */

  let prevMinimapSize = window.config.minimapSize;

  /* INIT */

  function init () {

    initEvents ();

  }

  function initEvents () {

    SWAM.on ( 'keydown', onKeydown );

  }

  SWAM.on ( 'gameLoaded', init );

  /* EVENTS */

  function onKeydown ( event ) {

    switch ( event.originalEvent.key ) {
      case '6': //TODO: This should be customizable
        toggleChat ();
        break;
      case '7': //TODO: This should be customizable
        toggleSidebar ();
        break;
      case '8': //TODO: This should be customizable
        toggleLeaderboard ();
        break;
      case '9': //TODO: This should be customizable
        toggleMinimap ();
        break;
      default:
        return;
    }

    event.stopImmediatePropagation ();

  }

  /* API */

  function _toggleElement ( selector, force ) {
    if ( force === undefined ) {
      force = !$(selector).is ( ':visible' );
    }
    if ( force ) {
      UI.show ( selector );
    } else {
      UI.hide ( selector );
    }
  }

  function toggleChat () {
    if ( $('#chatbox').is ( ':visible' ) ) {
      UI.minimizeChat ();
    } else {
      UI.maximizeChat ();
    }
  }

  function toggleLeaderboard ( force ) {
    _toggleElement ( '#scoreboard', force );
  }

  function toggleMinimap () {
    const visibility = !game.graphics.gui.minimap.visible;
    if ( visibility ) {
      window.config.minimapSize = prevMinimapSize
    } else {
      prevMinimapSize = window.config.minimapSize;
      window.config.minimapSize = 0;
    }
    UI.visibilityMinimap ( visibility );
    UI.resizeMinimap ();
  }

  function toggleSidebar ( force ) {
    _toggleElement ( '#sidebar', force );
  }

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Toggle Elements',
    id: 'fabiospampinato.toggleElements',
    description: 'Toggle elements of the UI with a few keypresses.',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
