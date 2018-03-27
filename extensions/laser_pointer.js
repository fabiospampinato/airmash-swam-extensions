
(function () {

  /* VARIABLES */

  let active = false,
      prevAngle,
      $laserPointer;

  /* INIT */

  function init () {

    initHTML ();
    initStyle ();
    initGame ();
    initEvents ();

  }

  function initHTML () {

    const html = '<div id="laser-pointer"></div>';

    $('body').append ( html );

    toggle ( false );

  }

  function initStyle () {

    const style = `
      <style>
        #laser-pointer {
          display: block;
          height: 1px;
          width: calc( 50vw * 1.5 );
          opacity: .25;
          background: white;
          position: fixed;
          top: 50%;
          left: 50%;
          transform-origin: 0;
        }
      </style>
    `;

    $('head').append ( style );

  }

  function initGame () {

    $laserPointer = $('#laser-pointer');

    SWAM.one ( 'playerAdded', Player => {

      const proto = Object.getPrototypeOf ( Player ),
            prev = proto.update;

      proto.update = function ( ...args ) {

        prev.call ( this, ...args );

        const me = Players.getMe ();

        if ( me && this.id === me.id ) {

          update ( this.rot );

        }

      };

    });

  }

  function initEvents () {

    SWAM.on ( 'keydown', onKeydown );

  }

  SWAM.on ( 'gameLoaded', init );

  /* EVENTS */

  function onKeydown ( event ) {

    if ( event.originalEvent.key === 'p' ) { //TODO: This should be customizable

      event.stopImmediatePropagation ();

      toggle ( !active );

    }

  }

  /* API */

  function update ( angle ) {

    if ( !active ) return;

    if ( angle === prevAngle ) return;

    const deg = ( 360 * angle / 6.2777775 ) - 90; //TODO: `6.2777775` has been chosen empirically, what's the logic behind it?

    $laserPointer[0].style.transform = `rotate(${deg}deg)`;

    prevAngle = angle;

  }

  function toggle ( force ) {
    active = force === undefined ? !active : force;
    if ( active ) {
      UI.show ( '#laser-pointer' );
    } else {
      UI.hide ( '#laser-pointer' );
    }
  }

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Laser Pointer',
    id: 'fabiospampinato.laserPointer',
    description: 'Add a laser pointer to your spaceship!',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
