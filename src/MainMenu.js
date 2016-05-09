var MainMenu = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/MainMenu.jpg' );
        this.select = 0;
        this.getKey = 0;
        this.startgame = 0;
        this.check = 0;
    },

    update: function( dt ) {
        this.changePage();
        this.selectPage();
    },

    changePage: function() {
      if( this.check == 0 ) {
        this.check = 1;
        if( this.getKey == 13 ) {
            this.selectPage();
            this.select++;
            this.check = 1;
        }
      }
    },

    getStart: function() {
        return this.startgame;
    },

    selectPage: function() {
      if( this.select == 1 ) {
          this.initWithFile( 'res/images/howto1.jpg' );
      }

      if( this.select == 2 ) {
          this.initWithFile( 'res/images/howto2.jpg' );
      }

      if( this.select == 3 ) {
          this.initWithFile( 'res/images/howto3.jpg' );
      }

      if( this.select == 4 ) {
          this.startgame = 1;
          this.getStart();
          this.removeAllChildren(true);
          this.setPosition( new cc.Point( -999, -999 ) );
      }


    },

    receiveKey: function( key ) {
        this.getKey = key;
    },

    releaseKey: function( key ) {
        this.check = 0;
    }

});
