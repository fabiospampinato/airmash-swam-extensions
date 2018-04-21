
(function () {

  /* THEME */

  class HitCirclesTheme extends VanillaTheme {

    constructor () {

      super ();

      SWAM.on ( 'mobAdded', ( ...args ) => setTimeout ( () => this._onMobAdded ( ...args ) ) ); //FIXME: Super ugly, but the tint gets overridden otherwise

      setTimeout ( this.setLayers.bind ( this ) );

    }

    setLayers () {

      game.graphics.layers.shadows.visible = false;
      game.graphics.layers.smoke.visible = false;

    }

    _getPlayerTint ( player ) {

      return this.settings.gameplay.colorPlayers
               ? player.team === 1
                 ? 6148089
                 : player.team === 2
                   ? 16342394
                   : 16777215
               : 16777215;

    }

    _onMobAdded ( data, existing, playerId ) {

      if ( !playerId ) return;

      if ( game.gameType !== 2 ) return;

      if ( !this.settings.gameplay.colorMissiles ) return;

      let mob = Mobs.get ( data.id );

      if ( ![ 1, 2, 3, 5, 6, 7 ].includes ( mob.type ) ) return;

      let player = Players.get ( playerId );

      mob.sprites.thruster.tint = 16777215;
      mob.sprites.sprite.tint = this._getPlayerTint ( player );

    }

    tintPlayer ( player ) {

      player.sprites.sprite.tint = this._getPlayerTint ( player );

    }

    _getFileName ( str ) {

      str = str.substring ( str.lastIndexOf ( '/' ) + 1 );

      if ( str.indexOf ( '?' ) > - 1 ) {
        str = str.substr ( 0, str.indexOf ( '?' ) );
      }

      return str;

    }

    injectTextures ( files, textureInfo, flagTextureInfo, spriteInfo, textures ) {

      const customFiles = ['aircraft.png', 'gui.png', 'items.png', 'map_forest.jpg', 'map_rock.jpg', 'map_sand.jpg', 'map_sea.jpg', 'mountains.png', 'particles.png', 'shadows.png'];
      // const otherFiles = ['map_rock_mask.jpg','map_sand_mask.jpg', 'map_sea_mask.jpg'];

      for ( let key in files ) {

        const fileName = this._getFileName ( files[key] );

        if ( !customFiles.includes ( fileName ) ) continue;

        // files[key] = `http://localhost:4444/themes/hit_circles/assets/${fileName}`; // Development
        files[key] = `https://raw.githubusercontent.com/fabiospampinato/airmash-swam-extensions/master/themes/hit_circles/assets/${fileName}`; // Production

      }

    }

  }

  $.extend ( HitCirclesTheme, {
    themeName: 'Hit Circles',
    description: 'A theme that replace every image with their actual hit circles.',
    author: 'Fabio Spampinato'
  });

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Hit Circles Theme',
    id: 'fabiospampinato.hitCircles',
    description: 'A theme that replace every image with their actual hit circles.',
    version: '1.0.0',
    author: 'Fabio Spampinato',
    themes: [HitCirclesTheme]
  });

}());
