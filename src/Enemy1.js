var Enemy1 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/enemy1.png' );
        this.speed = 3;
        this.chance = 1;
    },

    randomPos: function() {
        var randomPosY = Math.random()*(570-130) + 130;
        this.setPosition( new cc.Point( 1110, randomPosY ));

    },

    randomSpeed: function() {
        return this.speed = Math.random()*(6-3) + 3;
    },

    randomChance: function() {
        return this.chance = Math.random()*(100-1) + 1;
    },

    update: function ( dt ) {
        this.walking();

    },

    walking: function( status ) {
      this.setPositionX( this.getPositionX() - this.speed );
      if( this.getPositionX() < -30 ){
          this.randomPos();
          this.randomSpeed();
      }

    },

    shooting: function() {

    },

    getHit: function( bullet , person ) {
        var bulletPos = bullet.getPosition();
        var PersonPos = person.getPosition();
        return ( ( Math.abs( bulletPos.x - PersonPos.x ) <= 50 ) && ( Math.abs( bulletPos.y - PersonPos.y ) <= 50 ) );
    }

});
