
(function () {

  /* THEME */

  class HitCirclesTheme extends VanillaTheme {

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
