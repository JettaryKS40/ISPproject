var Enemy3 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/enemy3.png' );

    },

    update: function( dt ) {
      var pos = this.getPosition();
      if ( pos.y > 0 ){
          this.setPosition( new cc.Point( pos.x, pos.y - 5 ) );
      }
    }

});
