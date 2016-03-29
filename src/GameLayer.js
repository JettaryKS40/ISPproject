var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, 100 ) );
        this.addChild( this.player, 1 );

        this.grassbg = new Background();
        this.grassbg.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.grassbg );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.enemy = new Enemy1();
        this.enemy.setPosition( new cc.Point( screenWidth - 200, screenHeight ) );
        this.addChild( this.enemy );

        this.bonusEnemy = new Enemy2();
        this.bonusEnemy.setPosition( new cc.Point( screenWidth / 2, screenHeight ) );
        this.addChild( this.bonusEnemy );

        this.boss = new Enemy3();
        this.boss.setPosition( new cc.Point( screenWidth / 3, screenHeight ) );
        this.addChild( this.boss );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.roadblock1 = new Cover();
        this.roadblock1.setPosition( new cc.Point( 250 , screenHeight / 3 ) );
        this.addChild( this.roadblock1 );

        this.roadblock2 = new Cover();
        this.roadblock2.setPosition( new cc.Point( 500 , screenHeight / 3 ) );
        this.addChild( this.roadblock2 );

        this.roadblock3 = new Cover();
        this.roadblock3.setPosition( new cc.Point( 750 , screenHeight / 3 ) );
        this.addChild( this.roadblock3 );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.player.scheduleUpdate();
        this.enemy.scheduleUpdate();
        this.bonusEnemy.scheduleUpdate();
        this.boss.scheduleUpdate();

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
