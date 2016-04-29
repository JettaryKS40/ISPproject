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
        this.enemyBullet1 = new EnemyBullet();
        this.enemyBullet2 = new EnemyBullet();
        this.enemyBullet3 = new EnemyBullet();

        this.countBullet = 0;
        this.countEnemyBullet = 0;

        this.grassbg = new Background();
        this.grassbg.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.grassbg );

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 30 );
        this.scoreLabel.setPosition( new cc.Point( 890, 700 ) );
        this.scoreLabel.setString( "Score: "+0 );
        this.addChild( this.scoreLabel );

        this.gameover = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.gameover.setPosition( new cc.Point( 170 , 100 ) );
        this.gameover.setString("HP: "+100);
        this.addChild( this.gameover );

        this.salt = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt.setString("HP: "+100);
        this.addChild( this.salt );

        this.salt2 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt2.setString("HP: "+100);
        this.addChild( this.salt2 );

        this.salt3 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt3.setString("HP: "+100);
        this.addChild( this.salt3 );

        this.score = 0;
        this.hp = 100;
        this.check = 0;
        this.state = GameLayer.STATES.STARTED;

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
        if( this.state == GameLayer.STATES.STARTED ) {
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
        }

    },

    onKeyUp: function( keyCode, event ) {
        this.player.move(999);
    },

    update: function( dt ) {
            if( this.state == GameLayer.STATES.STARTED ) {

                this.salt.setString( "อิอิ" );
                this.salt2.setString( "u noob" );
                this.salt3.setString( "bobo la" );

                this.salt.setPosition( new cc.Point( this.enemy.getPositionX(), this.enemy.getPositionY() + 60 ) );
                this.salt2.setPosition( new cc.Point( this.enemy2.getPositionX(), this.enemy2.getPositionY() + 60 ) );
                this.salt3.setPosition( new cc.Point( this.enemy3.getPositionX(), this.enemy3.getPositionY() + 60 ) );

                if( this.enemy.getPositionX() < 1024 ) {
                    if( this.enemy.randomChance() >= 99 )
                        this.enemyShot( this.enemy.getPositionX(), this.enemy.getPositionY() );
                        this.enemy.randomChance();
                  }

                  if( this.enemy2.getPositionX() < 1024 ) {
                      if( this.enemy2.randomChance() >= 99 )
                      this.enemyShot2( this.enemy2.getPositionX(), this.enemy2.getPositionY() );
                      this.enemy2.randomChance();
                  }

                  if( this.enemy3.getPositionX() < 1024 ) {
                      if( this.enemy3.randomChance() >= 99 )
                      this.enemyShot3( this.enemy3.getPositionX(), this.enemy3.getPositionY() );
                      this.enemy3.randomChance();
                  }

                  if( this.player.hit ( this.playerBullet, this.enemy ) ) {
                      this.enemy.randomPos();
                      this.score++;
                      this.scoreLabel.setString( "Score: "+this.score );
                  }

                  if( this.player.hit ( this.playerBullet, this.enemy2 ) ) {
                      this.enemy2.randomPos();
                      this.score++;
                      this.scoreLabel.setString( "Score: "+this.score );
                  }

                  if( this.player.hit ( this.playerBullet, this.enemy3 ) ) {
                      this.enemy3.randomPos();
                      this.score++;
                      this.scoreLabel.setString( "Score: "+this.score );
                  }

                  if( this.enemy.getHit ( this.enemyBullet1, this.player ) ) {
                      this.enemyBullet1.setPosition( new cc.Point( 999 , 999 ) );
                      this.removeChild( this.enemyBullet1 );
                      this.hp-=5;
                      this.gameover.setString("HP: "+ this.hp);
                      if( this.hp <= 0){
                          this.player.setPosition( new cc.Point( -100, -100 ) );
                          this.gameover.setString("DEAD");
                          this.state = GameLayer.STATES.DEAD;
                      }
                  }

                  if( this.enemy2.getHit ( this.enemyBullet2, this.player ) ) {
                      this.enemyBullet2.setPosition( new cc.Point( 999 , 999 ) );
                      this.removeChild( this.enemyBullet2 );
                      this.hp-=6;
                      this.gameover.setString("HP: "+ this.hp);
                      if( this.hp <= 0){
                          this.player.setPosition( new cc.Point( -100, -100 ) );
                          this.gameover.setString("DEAD");
                          this.state = GameLayer.STATES.DEAD;
                      }

                  }

                  if( this.enemy3.getHit ( this.enemyBullet3, this.player ) ) {
                      this.enemyBullet3.setPosition( new cc.Point( 999 , 999 ) );
                      this.removeChild( this.enemyBullet3 );
                      this.hp-=3;
                      this.gameover.setString("HP: "+ this.hp);
                      if( this.hp <= 0){
                          this.player.setPosition( new cc.Point( -100, -100 ) );
                          this.gameover.setString("DEAD");
                          this.state = GameLayer.STATES.DEAD;
                      }

                  }


                  if( this.countBullet == 1 )
                      if( this.playerBullet.getPositionX() > 1024 )
                          this.countBullet = 0;


            }
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

        this.enemyBullet1 = new EnemyBullet();
        this.enemyBullet1.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet1 );
        this.enemyBullet1.scheduleUpdate();
        this.enemyBullet1.enemyShoot();

        if( this.enemyBullet1.getPositionX() < 0 )
            this.removeChild( this.enemyBullet1 );
    },

    enemyShot2: function(x,y) {

        this.enemyBullet2 = new EnemyBullet();
        this.enemyBullet2.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet2 );
        this.enemyBullet2.scheduleUpdate();
        this.enemyBullet2.enemyShoot();

        if( this.enemyBullet2.getPositionX() < 0 )
            this.removeChild( this.enemyBullet2 );
    },

    enemyShot3: function(x,y) {

        this.enemyBullet3 = new EnemyBullet();
        this.enemyBullet3.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet3 );
        this.enemyBullet3.scheduleUpdate();
        this.enemyBullet3.enemyShoot();

        if( this.enemyBullet3.getPositionX() < 0 )
            this.removeChild( this.enemyBullet3 );
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
