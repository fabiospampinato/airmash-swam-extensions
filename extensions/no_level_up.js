
(function () {

  /* INIT */

  function init () {

    Games.showLevelUP = () => {};

  }

  SWAM.on ( 'gameLoaded', init );

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'No Level Up',
    id: 'fabiospampinato.noLevelUp',
    description: 'Hide the level up dialog.',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
