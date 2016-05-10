var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.mainPage = new MainMenu();
        this.mainPage.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.mainPage, 1 );

        this.player = new Player();

        this.enemy = new Enemy1();
        this.enemy.randomPos();
        this.addChild( this.enemy, 2 );

        this.enemy2 = new Enemy1();
        this.enemy2.randomPos();
        this.addChild( this.enemy2, 2 );

        this.enemy3 = new Enemy1();
        this.enemy3.randomPos();
        this.addChild( this.enemy3, 2 );

        this.enemy4 = new Enemy1();
        this.enemy4.setPosition( new cc.Point( 999, 999 ) );
        this.addChild( this.enemy4, 2 );

        this.enemy5 = new Enemy1();
        this.enemy5.setPosition( new cc.Point( 999, 999 ) );
        this.addChild( this.enemy5, 2 );

        this.enemy6 = new Enemy1();
        this.enemy6.setPosition( new cc.Point( 999, 999 ) );
        this.addChild( this.enemy6, 2 );

        this.firstaid = new FirstAidBox();
        this.firstaid.setPosition( new cc.Point( 999, 999 ));
        this.addChild( this.firstaid, 2 );

        this.playerBullet = new Bullet();
        this.enemyBullet1 = new EnemyBullet();
        this.enemyBullet2 = new EnemyBullet();
        this.enemyBullet3 = new EnemyBullet();
        this.enemyBullet4 = new EnemyBullet();
        this.enemyBullet5 = new EnemyBullet();
        this.enemyBullet6 = new EnemyBullet();

        this.ammoStack = 8;

        this.checkPage = 0;

        this.checkPhaseTwo = 0;
        this.damageToPlayer = 4;
        this.countBullet = 0;
        this.countEnemyBullet = 0;

        this.grassbg = new Background();
        this.grassbg.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.grassbg );

        this.ammoCounter = cc.LabelTTF.create( '0', 'Arial', 30 );
        this.ammoCounter.setPosition( new cc.Point( 890, 120 ) );
        this.ammoCounter.setString( "Ammo: " + this.ammoStack + " /8" );
        this.addChild( this.ammoCounter );

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 30 );
        this.scoreLabel.setPosition( new cc.Point( 890, 700 ) );
        this.scoreLabel.setString( "Score: "+0 );
        this.addChild( this.scoreLabel );

        this.gameover = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.gameover.setPosition( new cc.Point( 170 , 100 ) );
        this.gameover.setString("HP: "+100);
        this.addChild( this.gameover );

        this.salt = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt.setString("");
        this.addChild( this.salt );

        this.salt2 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt2.setString("");
        this.addChild( this.salt2 );

        this.salt3 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt3.setString("");
        this.addChild( this.salt3 );

        this.salt4 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt4.setString("");
        this.addChild( this.salt4 );

        this.salt5 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt5.setString("");
        this.addChild( this.salt5 );


        this.getStartGame = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.getStartGame.setPosition( new cc.Point( 1024/2, 768/2 ));
        this.getStartGame.setString( "" );
        this.addChild( this.getStartGame );


        this.salt6 = cc.LabelTTF.create( '0', 'Arial', 28 );
        this.salt6.setString("");
        this.addChild( this.salt6 );

        this.hardMode = 0;
        this.score = 0;
        this.hp = 100;
        this.check = 0 ;
        this.itemHPChance = 0;
        this.healrate = 15;
        this.state = GameLayer.STATES.INTRO;

        this.checkSongBoss = 0;
        this.checkSongEnd = 0;

        cc.audioEngine.playMusic( 'res/sound/song.mp3', true );

        this.mainPage.scheduleUpdate();
        this.addKeyboardHandlers();
        this.scheduleUpdate();

        return true;

    },

    onKeyDown: function( keyCode, event ) {
        this.player.move(keyCode) ;
        // console.log( keyCode.toString() );

        if( this.state == GameLayer.STATES.INTRO ) {
            if ( keyCode == 13 ) {
                this.mainPage.receiveKey( keyCode );

            }

            if(this.mainPage.getStart() == 1){
                this.removeChild( this.mainPage, true );
                this.state = GameLayer.STATES.STARTED;
                this.player.setPosition( new cc.Point( 172, 330 ) );
                this.addChild( this.player, 2 );
                this.getStartGame.setPosition( new cc.Point( 1024/2, 768/2 ));
                this.getStartGame.setString( "Press Enter to start" );

            }
        }


        if( this.state == GameLayer.STATES.STARTED ) {
              if ( this.ammoStack > 0 ) {
                   if ( keyCode == cc.KEY.space ) {
                        if( this.countBullet == 0 && this.ammoStack > 0 ) {
                            this.shoot();
                            this.countBullet = 1;
                            cc.audioEngine.playEffect( 'res/sound/fireM1.mp3', false);
                            this.ammoStack--;

                            if( this.ammoStack == 0 ) {
                                cc.audioEngine.playEffect( 'res/sound/lastM1.mp3', false);
                            }

                            this.ammoCounter.setString( "Ammo: " + this.ammoStack + " /8" );
                        }
                  }
              }


              if( keyCode == cc.KEY.r ) {
                  if( this.ammoStack == 1 ) {
                      cc.audioEngine.playEffect( 'res/sound/m1ping.mp3', false);
                      this.ammoStack = 9;
                      this.ammoCounter.setString( "Ammo: " + this.ammoStack + " /8" );
                      cc.audioEngine.playEffect( 'res/sound/reload.mp3', false);
                  }

                  if( this.ammoStack == 0 ) {
                      cc.audioEngine.playEffect( 'res/sound/reload.mp3', false);
                      this.ammoStack = 8;
                      this.ammoCounter.setString( "Ammo: " + this.ammoStack + " /8" );
                  }
              }
      }
        if( keyCode == 8 ) {
          cc.audioEngine.playMusic( 'res/sound/song.mp3', true );
          this.resetGame();
        }

    },

    onKeyUp: function( keyCode, event ) {
        this.player.move(999);
        this.mainPage.releaseKey(keyCode);
    },

    update: function( dt ) {

            if( this.state == GameLayer.STATES.INTRO ) {

                if(this.mainPage.getStart() == 1){

                   this.getStartGame.setPosition( new cc.Point( 1024/2, 768/2 ));
                   this.getStartGame.setString( "Press Enter to start" );

                }

                else {  this.getStartGame.setString( "" ); }
            }

            if( this.state == GameLayer.STATES.STARTED ) {
                  this.getStartGame.setString( "" );
                  this.setupEnemy();
                  this.startGame();

                  this.checkingHit( this.enemy, this.enemyBullet1 );
                  this.checkingHit( this.enemy2, this.enemyBullet2 );
                  this.checkingHit( this.enemy3, this.enemyBullet3 );
                  this.checkingHit( this.enemy4, this.enemyBullet4 );
                  this.checkingHit( this.enemy5, this.enemyBullet5 );
                  this.checkingHit( this.enemy6, this.enemyBullet6 );

                  if( this.countBullet == 1 )
                      if( this.playerBullet.getPositionX() > 1024 )
                          this.countBullet = 0;


                  if( this.itemHPChance >= 95 ) {
                      this.itemHPChance = 0;
                      this.firstaid.randomPos();
                  }

                  if ( this.firstaid.take( this.playerBullet ) ) {
                       cc.audioEngine.playEffect( 'res/sound/ding.wav', false);
                       if( this.hp < 100 ) {
                           this.hp += this.healrate;

                           var checker = this.hp - 100;
                           if( this.hp > 100 ) { this.hp -= checker; }
                       }

                       else if( this.hp >= 100 ) {
                            this.hp += 0;
                            this.score++;
                            this.scoreLabel.setString( "Score: "+this.score );
                       }

                       this.firstaid.setPosition( new cc.Point( 999, 999 ));
                       this.gameover.setString("HP: "+ this.hp);

                  }

                  if( this.score >= 100 ) {

                      this.hardMode = 1;
                      this.phase2();
                      this.checkingHit( this.enemy4, this.enemyBullet4 );
                      this.checkingHit( this.enemy5, this.enemyBullet5 );
                      this.checkingHit( this.enemy6, this.enemyBullet6 );
                  }
            }

            if( this.state == GameLayer.STATES.DEAD ) {
                  this.endGame();
            }

    },

    checkingHit: function( target, checkBullet ) {
        if( target.getHit ( checkBullet, this.player ) ) {
            checkBullet.setPosition( new cc.Point( 999 , 999 ) );
            this.removeChild( checkBullet );
            this.hp -= this.damageToPlayer;
            this.gameover.setString("HP: "+ this.hp);

            if( this.hp <= 0){
                this.player.setPosition( new cc.Point( -100, -100 ) );
                this.gameover.setString("DEAD");
                this.state = GameLayer.STATES.DEAD;

              }

            }

    },

    setupEnemy: function() {

        this.player.scheduleUpdate();
        this.enemy.scheduleUpdate();
        this.enemy2.scheduleUpdate();
        this.enemy3.scheduleUpdate();

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
    },

    phase2: function() {

        if( this.hardMode == 1 ) {
            this.damageToPlayer = 8;
            this.healrate = 25;

            if( this.checkSongBoss == 0 ) {
                cc.audioEngine.playEffect( 'res/sound/mlg/AIRPORN.mp3', false);
                cc.audioEngine.playEffect( 'res/sound/mlg/OMG.mp3', false);
                cc.audioEngine.playEffect( 'res/sound/mlg/sickReaction.mp3', false);
                this.enemy4.randomPos();
                this.enemy5.randomPos();
                this.enemy6.randomPos();
                this.checkSongBoss = 1;
            }

            this.grassbg.initWithFile( 'res/images/grassbgRED.jpg' );
            this.enemy4.scheduleUpdate();
            this.enemy5.scheduleUpdate();
            this.enemy6.scheduleUpdate();



            if( this.checkPhaseTwo = 0 ) {
              this.resetScreen();
              this.checkPhaseTwo = 1;

            }

            if( this.enemy4.getPositionX() < 1024 ) {
                if( this.enemy4.randomChance() >= 90 )
                    this.enemyShot( this.enemy4.getPositionX(), this.enemy4.getPositionY() );
                    this.enemy4.randomChance();

            }

            if( this.enemy5.getPositionX() < 1024 ) {
                if( this.enemy5.randomChance() >= 95 )
                    this.enemyShot2( this.enemy5.getPositionX(), this.enemy5.getPositionY() );
                    this.enemy5.randomChance();

            }

            if( this.enemy6.getPositionX() < 1024 ) {
                if( this.enemy6.randomChance() >= 93 )
                    this.enemyShot3( this.enemy6.getPositionX(), this.enemy6.getPositionY() );
                    this.enemy6.randomChance();

            }
        }
    },

    startGame: function() {

        if( this.player.hit ( this.playerBullet, this.enemy ) ) {
            this.killCount( this.enemy );
        }

        if( this.player.hit ( this.playerBullet, this.enemy2 ) ) {
            this.killCount( this.enemy2 );
        }

        if( this.player.hit ( this.playerBullet, this.enemy3 ) ) {
            this.killCount( this.enemy3 );
        }

        if( this.player.hit ( this.playerBullet, this.enemy4 ) ) {
            this.killCount( this.enemy4 );
        }

        if( this.player.hit ( this.playerBullet, this.enemy5 ) ) {
            this.killCount( this.enemy5 );
        }

        if( this.player.hit ( this.playerBullet, this.enemy6 ) ) {
            this.killCount( this.enemy6 );
        }

    },

    killCount: function( person ) {
      cc.audioEngine.playEffect( 'res/sound/hit.wav', false);
        person.randomPos();
        this.score++;
        this.scoreLabel.setString( "Score: "+this.score );
        this.itemHPChance = this.firstaid.randomChance();

    },

    endGame: function() {
        this.grassbg.initWithFile( 'res/images/grassbgRED.jpg' );

        if(this.checkSongEnd == 0) {
           cc.audioEngine.stopMusic();
           cc.audioEngine.playEffect( 'res/sound/end/sad.mp3', false);
           cc.audioEngine.playEffect( 'res/sound/end/onlytime.wav', false);
           cc.audioEngine.playEffect( 'res/sound/end/sadviolin.wav', false);
           this.checkSongEnd = 1;
        }

        this.salt.setString( "อิอิ" );
        this.salt2.setString( "u noob" );
        this.salt3.setString( "bobo la" );
        this.salt4.setString( "#REKT" );
        this.salt5.setString( "まだまだ。。" );
        this.salt6.setString( "อ่อนแอ" );

        this.salt.setPosition( new cc.Point( this.enemy.getPositionX(), this.enemy.getPositionY() + 60 ) );
        this.salt2.setPosition( new cc.Point( this.enemy2.getPositionX(), this.enemy2.getPositionY() + 60 ) );
        this.salt3.setPosition( new cc.Point( this.enemy3.getPositionX(), this.enemy3.getPositionY() + 60 ) );
        this.salt4.setPosition( new cc.Point( this.enemy4.getPositionX(), this.enemy4.getPositionY() + 60 ) );
        this.salt5.setPosition( new cc.Point( this.enemy5.getPositionX(), this.enemy5.getPositionY() + 60 ) );
        this.salt6.setPosition( new cc.Point( this.enemy6.getPositionX(), this.enemy6.getPositionY() + 60 ) );

    },
    resetScreen: function() {

        this.removeAllChildren(true);

        this.addChild( this.player, 1 );
        this.addChild( this.enemy, 1 );
        this.addChild( this.enemy2, 1 );
        this.addChild( this.enemy3, 1 );
        this.addChild( this.enemy4, 1 );
        this.addChild( this.enemy5, 1 );
        this.addChild( this.enemy6, 1 );
        this.addChild( this.firstaid, 1 );
        this.addChild( this.grassbg );
        this.addChild( this.scoreLabel );
        this.addChild( this.gameover );
        this.addChild( this.ammoCounter );
        this.addChild( this.salt );
        this.addChild( this.salt2 );
        this.addChild( this.salt3 );
        this.addChild( this.salt4 );
        this.addChild( this.salt5 );
        this.addChild( this.salt6 );

        this.player.scheduleUpdate();
        this.enemy.scheduleUpdate();
        this.enemy2.scheduleUpdate();
        this.enemy3.scheduleUpdate();

        this.addKeyboardHandlers();
        this.scheduleUpdate();

    },

    resetGame: function() {

        this.resetScreen();
        this.grassbg.initWithFile( 'res/images/grassbg.jpg' );

        this.checkPhaseTwo = 0;
        this.hardMode = 0;
        this.state = GameLayer.STATES.STARTED;

        this.player.setPosition( new cc.Point( 172, 330 ) );
        this.enemy.randomPos();
        this.enemy2.randomPos();
        this.enemy3.randomPos();

        this.enemy4.setPosition( new cc.Point( 999, 999 ) );
        this.enemy5.setPosition( new cc.Point( 999, 999 ) );
        this.enemy6.setPosition( new cc.Point( 999, 999 ) );

        this.checkSongBoss = 0;
        this.checkSongEnd = 0;

        this.damageToPlayer = 4;
        this.healrate = 15;
        this.hp = 100;
        this.gameover.setString("HP: "+ this.hp);

        this.score = 0;
        this.scoreLabel.setString( "Score: "+this.score );

        this.salt.setString( "" );
        this.salt2.setString( "" );
        this.salt3.setString( "" );
        this.salt4.setString( "" );
        this.salt5.setString( "" );
        this.salt6.setString( "" );

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
        cc.audioEngine.playEffect( 'res/sound/deag.wav', false);

        if( this.enemyBullet1.getPositionX() < 0 )
            this.removeChild( this.enemyBullet1 );
    },

    enemyShot2: function(x,y) {

        this.enemyBullet2 = new EnemyBullet();
        this.enemyBullet2.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet2 );
        this.enemyBullet2.scheduleUpdate();
        this.enemyBullet2.enemyShoot();
        cc.audioEngine.playEffect( 'res/sound/deag.wav', false);

        if( this.enemyBullet2.getPositionX() < 0 )
            this.removeChild( this.enemyBullet2 );
    },

    enemyShot3: function(x,y) {

        this.enemyBullet3 = new EnemyBullet();
        this.enemyBullet3.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet3 );
        this.enemyBullet3.scheduleUpdate();
        this.enemyBullet3.enemyShoot();
        cc.audioEngine.playEffect( 'res/sound/deag.wav', false);

        if( this.enemyBullet3.getPositionX() < 0 )
            this.removeChild( this.enemyBullet3 );
    },

    enemyShot4: function(x,y) {

        this.enemyBullet4 = new EnemyBullet();
        this.enemyBullet4.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet4 );
        this.enemyBullet4.scheduleUpdate();
        this.enemyBullet4.enemyShoot();
        cc.audioEngine.playEffect( 'res/sound/deag.wav', false);

        if( this.enemyBullet4.getPositionX() < 0 )
            this.removeChild( this.enemyBullet4 );
    },

    enemyShot5: function(x,y) {

        this.enemyBullet5 = new EnemyBullet();
        this.enemyBullet5.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet5 );
        this.enemyBullet5.scheduleUpdate();
        this.enemyBullet5.enemyShoot();
        cc.audioEngine.playEffect( 'res/sound/deag.wav', false);

        if( this.enemyBullet5.getPositionX() < 0 )
            this.removeChild( this.enemyBullet5 );
    },

    enemyShot6: function(x,y) {

        this.enemyBullet6 = new EnemyBullet();
        this.enemyBullet6.setPosition( new cc.Point( x , y ) );
        this.addChild( this.enemyBullet6 );
        this.enemyBullet6.scheduleUpdate();
        this.enemyBullet6.enemyShoot();
        cc.audioEngine.playEffect( 'res/sound/deag.wav', false);

        if( this.enemyBullet6.getPositionX() < 0 )
            this.removeChild( this.enemyBullet6 );
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
    INTRO: 0,
    STARTED: 1,
    DEAD: 2

};
