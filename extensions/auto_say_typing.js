
(function () {

  /* VARIABLES */

  const SAY_DELAY = 3000; // In order to avoid getting throttled

  let settings = {
        message: 'Typing...'
      },
      lastSayTime,
      lastKeypressTime,
      intervalId;

  /* INIT */

  function init () {

    initEvents ();
    initEngine ();

  }

  function initEvents () {

    const $input = $('#chatinput');

    $input.on ( 'keypress', onChatKeypress );
    $input.on ( 'focus', onChatFocus );
    $input.on ( 'blur', onChatBlur );

  }

  function initEngine () {

    const prev = UI.toggleChatBox;

    UI.toggleChatBox = function ( event ) {

      if ( $('#chatinput').val ().length ) {

        const elapsed = Date.now () - lastSayTime,
              delay = ( elapsed > SAY_DELAY ) ? 0 : SAY_DELAY - elapsed;

        setTimeout ( () => prev ( event ), delay );

      } else {

        prev ( event );

      }

    }

  }

  function initSettings () {

    const provider = new SettingsProvider ( settings, updated => settings = updated ),
          section = provider.addSection ( 'General' );

    section.addString ( 'message', 'Message' );

    return provider;

  }

  SWAM.on ( 'gameLoaded', init );

  /* EVENTS */

  function onChatKeypress () {

    lastKeypressTime = Date.now ();

  }

  function onChatFocus () {

    intervalId = setInterval ( say, SAY_DELAY );

    say ();

  }

  function onChatBlur () {

    clearInterval ( intervalId );

  }

  /* API */

  function say () {

    if ( lastKeypressTime && ( Date.now () - lastKeypressTime ) < ( SAY_DELAY * .8 ) ) return;

    lastSayTime = Date.now ();

    Network.sendSay ( settings.message );

  }

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Auto Say Typing',
    id: 'fabiospampinato.autoSayTyping',
    description: 'Automatically say "Typing..." while typing.',
    version: '1.0.0',
    author: 'Fabio Spampinato',
    settingsProvider: initSettings ()
  });

}());
