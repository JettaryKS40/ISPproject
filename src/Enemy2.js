var Enemy2 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/enemy2.png' );

    },

    update: function( dt ) {
      var pos = this.getPosition();
      if ( pos.y > 0 ) {
          this.setPosition( new cc.Point( pos.x, pos.y - 5 ) );
      }
    }

});
