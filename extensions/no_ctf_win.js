
(function () {

  /* INIT */

  function init () {

    Games.showCTFWin = () => {};

  }

  SWAM.on ( 'gameLoaded', init );

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'No CTF Win',
    id: 'fabiospampinato.noCTFWin',
    description: 'Hide the CTF win dialog.',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
