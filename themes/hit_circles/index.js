
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
               ? player
                 ? player.team === 1
                   ? 6148089
                   : player.team === 2
                     ? 16342394
                     : 16777215
                 : 16378973
               : 16777215

    }

    _getMobScale ( mob ) {

      return mob.type === 2
               ? [.2, .2]
               : mob.type === 3
                 ? [.2, .2]
                 : [.2, .15];

    }

    _onMobAdded ( data, existing, playerId ) {

      if ( game.gameType !== 2 ) return;

      if ( !this.settings.gameplay.colorMissiles ) return;

      let mob = Mobs.get ( data.id );

      if ( !mob ) return;

      if ( ![ 1, 2, 3, 5, 6, 7 ].includes ( mob.type ) ) return;

      let player = Players.get ( playerId );

      /* TINTING */

      mob.sprites.thruster.tint = 16777215;
      mob.sprites.sprite.tint = this._getPlayerTint ( player );

      /* SCALING */

      mob.sprites.sprite.scale.set ( ...this._getMobScale ( mob ) );

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

    _getCustomFiles () {

      return {
        'aircraft.png': 'aircraft.png',
        'gui.png': 'gui.png',
        'items.png': 'items.png',
        'map_forest.jpg': 'map_forest.jpg',
        'map_rock.jpg': 'map_rock.jpg',
        'map_sand.jpg': 'map_sand.jpg',
        'map_sea.jpg': 'map_sea.jpg',
        'mountains.png': 'mountains.png',
        'particles.png': 'particles.png',
        'shadows.png': 'shadows.png'
      };

    }

    injectTextures ( files, textureInfo, flagTextureInfo, spriteInfo, textures ) {

      const customFiles = this._getCustomFiles ();

      for ( let key in files ) {

        const fileName = this._getFileName ( files[key] );

        if ( fileName in customFiles ) {

          // files[key] = `http://localhost:4444/themes/hit_circles/assets/${customFiles[fileName]}`; // Development
          files[key] = `https://raw.githubusercontent.com/fabiospampinato/airmash-swam-extensions/master/themes/hit_circles/assets/${customFiles[fileName]}`; // Production

        }

      }

    }

  }

  $.extend ( HitCirclesTheme, {
    themeName: 'Hit Circles',
    description: 'A theme that replace every image with their actual hit circles.',
    author: 'Fabio Spampinato'
  });

  /* THEME + GRID */

  class HitCirclesGridTheme extends HitCirclesTheme {

    _getCustomFiles () {

      return $.extend ( super._getCustomFiles (), {
        'map_forest.jpg': 'map_forest_grid.jpg',
        'map_rock_mask.jpg': 'map_rock_mask_grid.jpg',
        'map_sand_mask.jpg': 'map_sand_mask_grid.jpg',
        'map_sea.jpg': 'map_sea_grid.jpg',
        'map_sea_mask.jpg': 'map_sea_mask_grid.png'
      });

    }

  }

  $.extend ( HitCirclesGridTheme, {
    themeName: 'Hit Circles + Plain Grid',
    description: 'A theme that replace every image with their actual hit circles, and uses a plain grid as the background.',
    author: 'Fabio Spampinato'
  });

  /* REGISTER */

  SWAM.registerExtension ({
    name: 'Hit Circles Theme',
    id: 'fabiospampinato.hitCircles',
    description: 'A theme that replace every image with their actual hit circles.',
    version: '1.0.0',
    author: 'Fabio Spampinato',
    themes: [HitCirclesTheme, HitCirclesGridTheme]
  });

}());
