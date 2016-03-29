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
             this.setPosition( new cc.Point( pos.x , pos.y + 10 ) );
        }

        if ( this.directionSet == 68 ) {
             this.setPosition( new cc.Point( pos.x + 10 , pos.y ) );
        }

        if ( this.directionSet == 83 ) {
             this.setPosition( new cc.Point( pos.x , pos.y - 10 ) );
        }

        if ( this.directionSet == 65 ) {
             this.setPosition( new cc.Point( pos.x - 10 , pos.y ) );
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
    }

});

Player.DIR = {
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
};
