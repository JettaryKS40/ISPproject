var Enemy1 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/enemy1.png' );
        this.started = false;
    },

    update: function( dt ) {

    },

});
