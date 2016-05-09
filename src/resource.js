var res = {

    background_jpg: 'res/images/grassbg.jpg',
    backgroundRED_jpg: 'res/images/grassbgRED.jpg',
    player_png: 'res/images/player.png',

    enemy1_png: 'res/images/enemy1.png',

    roadblock_png: 'res/images/sandbag.png',

    bullet_png: 'res/images/bullet.png',

    hpBox_png: 'res/images/hpbox.png',

    mainPage_jpg: 'res/images/MainMenu.jpg',
    howToPage1_jpg: 'res/images/howto1.jpg',
    howToPage2_jpg: 'res/images/howto2.jpg',
    howToPage3_jpg: 'res/images/howto3.jpg',

    song_mp3: 'res/sound/song.mp3',

    deag_wav: 'res/sound/deag.wav',

    hit_wav: 'res/sound/hit.wav',
    ding_wav: 'res/sound/ding.wav',

    fireM1_wav: 'res/sound/fireM1.mp3',
    lastM1_wav: 'res/sound/lastM1.mp3',
    reloadM1_wav: 'res/sound/reload.mp3',
    changeRoundM1_wav: 'res/sound/changeRound.mp3',

    sad_mp3: 'res/sound/end/sad.mp3',
    onlytime_mp3: 'res/sound/end/onlytime.wav',
    sadviolin_mp3: 'res/sound/end/sadviolin.wav',

    airporn_mp3: 'res/sound/mlg/AIRPORN.mp3',
    omg_mp3: 'res/sound/mlg/OMG.mp3',
    sickReaction_mp3: 'res/sound/mlg/sickReaction.mp3',

    // damageSandbag1_png: 'res/images/damageSandbag1.png',
    // damageSandbag2_png: 'res/images/damageSandbag2.png',
    //
    // ammoBox_png: 'res/images/ammoBog.png'
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
