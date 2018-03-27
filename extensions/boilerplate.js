
(function () {

  /* INIT */

  function init () {

  }

  SWAM.on ( 'gameLoaded', init );

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Name',
    id: 'fabiospampinato.name',
    description: 'Description.',
    version: '1.0.0',
    author: 'Fabio Spampinato'
  });

}());
