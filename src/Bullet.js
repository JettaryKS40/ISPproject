var Bullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
        this.checkOne = 0;
        this.checkTwo = 0;
    },

    playerShoot: function() {
        this.setRotation( 90 );
        this.checkOne = 1;
    },

    enemyShoot: function() {
        this.setRotation( 270 );
        this.checkTwo = 1;
    },

    update: function( dt ) {
        var pos = this.getPosition();

        if ( this.checkOne == 1 ) {
             pos.x += 20;
             this.setPosition ( new cc.Point ( pos.x , pos.y ) );
        }

        if ( this.checkTwo == 1 ) {
             pos.x -= 20;
             this.setPosition ( new cc.Point ( pos.x , pos.y ) );
        }

    },

});
