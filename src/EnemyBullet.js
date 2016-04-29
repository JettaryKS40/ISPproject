var EnemyBullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );

    },

    enemyShoot: function() {
        this.setRotation( 270 );

    },

    update: function( dt ) {
        var pos = this.getPosition();
        pos.x -= 35;
        this.setPosition ( new cc.Point ( pos.x , pos.y ) );

    },

});
