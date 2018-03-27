
(function () {

  /* INIT */

  function init () {

    initHTML ();
    initStyle ();
    initEvents ();

  }

  function initHTML () {

    const html = `
      <div id="flag-border-blue-left"></div>
      <div id="flag-border-blue-right"></div>
      <div id="flag-border-red-left"></div>
      <div id="flag-border-red-right"></div>
    `;

    $('body').append ( html );

    toggleRed ( false );
    toggleBlue ( false );

  }

  function initStyle () {

    const style = `
      <style>
        #flag-border-blue-left, #flag-border-red-left, #flag-border-blue-right, #flag-border-red-right {
          pointer-events: none;
          position: fixed;
          top: 0;
          bottom: 0;
          border-style: solid;
          width: 50vw;
          box-sizing: border-box;
          opacity: .75;
        }

        #flag-border-blue-left, #flag-border-red-left {
          left: 0;
          border-width: 5px 0 5px 5px;
        }

        #flag-border-blue-right, #flag-border-red-right {
          right: 0;
          border-width: 5px 5px 5px 0;
        }

        #flag-border-blue-left, #flag-border-blue-right {
          border-color: #2d6eeb;
        }

        #flag-border-blue-left {
          z-index: 1;
        }

        #flag-border-red-left, #flag-border-red-right {
          border-color: #bc2a2e;
        }

        #flag-border-red-right {
          z-index: 1;
        }
      </style>
    `;

    $('head').append ( style );

  }

  function initEvents () {

    SWAM.on ( 'CTF_FlagEvent', onFlagEvent );

  }

  SWAM.on ( 'gameLoaded', init );

  /* EVENTS */

  function onFlagEvent ( event, team, verb ) {

    const taken = ( verb === 'taken' );

    if ( team === 1 ) {
      toggleBlue ( taken );
    } else if ( team === 2 ) {
      toggleRed ( taken );
    }

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

  function toggleBlue ( force ) {
    _toggleElement ( '#flag-border-blue-left', force );
    _toggleElement ( '#flag-border-blue-right', force );
  }

  function toggleRed ( force ) {
    _toggleElement ( '#flag-border-red-left', force );
    _toggleElement ( '#flag-border-red-right', force );
  }

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Flag Borders',
    id: 'fabiospampinato.flagBorders',
    description: 'Show borders around your window whenever a flag is being carried.',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
