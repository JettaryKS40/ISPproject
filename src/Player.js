var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/player.png' );
        this.started = false;
        this.directionSet = 0;
    },

    start: function() {
        this.started = true;
    },

    update: function( dt ) {
        var pos = this.getPosition();

        if ( this.directionSet == 87 ) {
             if ( pos.y < 650) {
                  this.setPosition( new cc.Point( pos.x , pos.y + 10 ) );
             }
        }

        if ( this.directionSet == 83 ) {
             if ( pos.y > 150) {
                  this.setPosition( new cc.Point( pos.x , pos.y - 10 ) );
             }
        }


    },

    move: function( direction ) {

        this.directionSet = direction;

    },

    stop: function() {
        this.setPosition( new cc.Point( pos.x , pos.y ) );
    },

    endGame: function() {
	      this.started = false;
    },

    hit: function( bullet , person ) {
        var bulletPos = bullet.getPosition();
        var PersonPos = person.getPosition();
        return ( ( Math.abs( bulletPos.x - PersonPos.x ) <= 50 ) && ( Math.abs( bulletPos.y - PersonPos.y ) <= 50 ) );
    }

});

Player.DIR = {
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
};
