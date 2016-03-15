var res = {

    background_png: 'res/images/grassbg.jpg',
    player_png: 'res/images/player.png',

    enemy1_png: 'res/images/enemy1.png',
    enemy2_png: 'res/images/enemy2.png',
    enemy3_png: 'res/images/enemy3.png',

    roadblock_png: 'res/images/sandbag.png'
    // damageSandbag1_png: 'res/images/damageSandbag1.png',
    // damageSandbag2_png: 'res/images/damageSandbag2.png',
    //
    // ammoBox_png: 'res/images/ammoBog.png'
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
