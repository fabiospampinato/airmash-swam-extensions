
(function () {

  /* INIT */

  function init () {

    Games.showBTRWin = () => {};

  }

  SWAM.on ( 'gameLoaded', init );

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'No BTR Win',
    id: 'fabiospampinato.noBTRWin',
    description: 'Hide the BTR win dialog.',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
