var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, 10 ) );
        this.addChild( this.player, 1 );

        this.grassbg = new Background();
        this.grassbg.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.grassbg );

        this.roadblock = new Cover();
        this.roadblock.setPosition( new cc.Point( 300 , screenHeight / 2 ) );
        this.addChild( this.roadblock );

        this.player.scheduleUpdate();

        this.addKeyboardHandlers();

        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function( keyCode, event ) {
        this.player.move(keyCode) ;
        console.log( keyCode.toString() + "keyDown" );
    },

    onKeyUp: function( keyCode, event ) {
        console.log( keyCode.toString() );
        this.player.move(0) ;
    },

    update: function( dt ) {

    },

    startGame: function() {

    },

    endGame: function() {

    },

    resetGame: function() {

    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },

            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }

        }, this);
    }

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    STARTED: 1,
    DEAD: 2

};
