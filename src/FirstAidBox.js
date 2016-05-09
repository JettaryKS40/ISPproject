var FirstAidBox = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/hpbox.png' );

    },

    randomChance: function() {
        return this.chance = Math.random()*(100-1) + 1;
    },

    randomPos: function() {
        var randomPosX = Math.random()*(600-500) + 500;
        var randomPosY = Math.random()*(570-130) + 130;
        this.setPosition( new cc.Point( randomPosX, randomPosY ));

    },

    take: function( bullet ) {
        var bulletPos = bullet.getPosition();
        var object = this.getPosition();
        return ( ( Math.abs( bulletPos.x - object.x ) <= 50 ) && ( Math.abs( bulletPos.y - object.y ) <= 50 ) );
    }

});
