var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.player = new Player();
        this.player.setPosition( new cc.Point( 172, 330 ) );
        this.addChild( this.player, 1 );

        this.enemy = new Enemy1();
        this.enemy.randomPos();
        this.addChild( this.enemy, 1 );

        this.enemy2 = new Enemy1();
        this.enemy2.randomPos();
        this.addChild( this.enemy2, 1);

        this.enemy3 = new Enemy1();
        this.enemy3.randomPos();
        this.addChild( this.enemy3, 1);

        this.playerBullet = new Bullet();
        this.countBullet = 0;
        this.grassbg = new Background();
        this.grassbg.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.grassbg );

        this.check = 0;
        this.player.scheduleUpdate();
        this.enemy.scheduleUpdate();
        this.enemy2.scheduleUpdate();
        this.enemy3.scheduleUpdate();
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        return true;

    },

    onKeyDown: function( keyCode, event ) {
        this.player.move(keyCode) ;

        if ( keyCode == cc.KEY.e ) {
             console.log( "xpos: " + this.player.getPositionX() + " ypos: " + this.player.getPositionY() );
        }

        if ( keyCode == cc.KEY.q ) {
             console.log( "Check value = " + this.check );
        }

        if ( keyCode == cc.KEY.d ) {
             if( this.countBullet == 0 )
                 this.shoot();
                 this.countBullet = 1;
        }

    },

    onKeyUp: function( keyCode, event ) {
        this.player.move(999);
    },

    update: function( dt ) {

            if( this.enemy.getPositionX() < 1024 ) {
                if( this.enemy.randomChance() >= 97 )
                    this.enemyShot( this.enemy.getPositionX(), this.enemy.getPositionY() );
                    this.enemy.randomChance();
            }

            if( this.enemy2.getPositionX() < 1024 ) {
                if( this.enemy2.randomChance() >= 96 )
                    this.enemyShot( this.enemy2.getPositionX(), this.enemy2.getPositionY() );
                    this.enemy2.randomChance();
            }

            if( this.enemy3.getPositionX() < 1024 ) {
                if( this.enemy3.randomChance() >= 98 )
                    this.enemyShot( this.enemy3.getPositionX(), this.enemy3.getPositionY() );
                    this.enemy3.randomChance();
            }

            if( this.player.hit ( this.playerBullet, this.enemy ) )
                this.enemy.randomPos();

            if( this.player.hit ( this.playerBullet, this.enemy2 ) )
                this.enemy2.randomPos();

            if( this.player.hit ( this.playerBullet, this.enemy3 ) )
                this.enemy3.randomPos();

            if( this.countBullet == 1 )
                if( this.playerBullet.getPositionX() > 1024 )
                    this.countBullet = 0;


    },

    startGame: function() {

    },

    endGame: function() {

    },

    resetGame: function() {

    },

    shoot: function() {

        this.playerBullet = new Bullet();
        this.playerBullet.setPosition( new cc.Point( this.player.getPositionX()+40 , this.player.getPositionY()+20 ) );
        this.addChild( this.playerBullet );
        this.playerBullet.scheduleUpdate();
        this.playerBullet.playerShoot();

        if( this.playerBullet.getPositionX() > 1024 )
            this.removeChild( this.playerBullet );

    },

    enemyShot: function(x,y) {

        this.enemyBullet = new Bullet();
        this.enemyBullet.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet );
        this.enemyBullet.scheduleUpdate();
        this.enemyBullet.enemyShoot();

        if( this.enemyBullet.getPositionX() < 0 )
            this.removeChild( this.enemyBullet );
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
    },



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
