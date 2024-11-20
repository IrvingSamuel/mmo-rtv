/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */


var Game = {};


Game.preload = function()
    {
        this.load.image('mapa', 'assets/mapa2.png');
        this.load.image("limits", "assets/limits2.png");
        this.load.image("roofs", "assets/roofs2.png");
        this.load.image("round", "assets/mobileround.png");
        this.load.image("analog", "assets/mobileanalog.png");
        this.load.image("guns", "assets/gun.png");
        this.load.image("dashs", "assets/dash.png");
        this.load.spritesheet('hitbox', 'assets/fake.png', { frameWidth: 22, frameHeight: 15 });
        this.load.spritesheet('hitboxP', 'assets/fake.png', { frameWidth: 30, frameHeight: 50 });
        this.load.spritesheet('fake', 'assets/fake.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('isaac', 'assets/isaac all.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('joaquim', 'assets/joaquim all.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('hyoma', 'assets/hyoma all.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('peko', 'assets/peko all.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('master', 'assets/master all.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bullet', 'assets/hado.png', { frameWidth: 2, frameHeight: 2 });
        this.load.audio('gun', 'assets/sounds/gun.mp3');
        this.load.audio('death', 'assets/sounds/death.mp3');
        this.load.audio('master', 'assets/sounds/master.mp3');
}

Game.create = function()
    {   

        this.physics.world.setFPS(90);
        this.input.addPointer(5);

        var gun = this.sound.add('gun');

        var death = this.sound.add('death');

        var master = this.sound.add('master');

        Game.playerMap = {};
        Game.playerHb = {};
        Game.playerHp = {};
        Game.bulletsP = {};
        
        Cthis = this;

        Game.addNewPlayer = function (id, x, y,client,sprite){
            playerids.push(id);
            if(me == -1 && id == client){
                me = client;
                indexMe = playerids.indexOf(me);
                spriteCli = spriteMe;
            }
            else{
                indexCli = playerids.indexOf(id);
                spriteCli = sprite;
            }

            if(spriteCli == 'master'){
                master.play();
            }
            if(id == client){
                Game.playerMap[id] = Cthis.physics.add.sprite(x, y, 'fake');
            }
            else{
                Game.playerMap[id] = Cthis.physics.add.sprite(x, y, `${spriteCli}`);
            }

            Game.playerHb[id] = Cthis.physics.add.sprite(x, y + 25, 'hitbox');

            Game.playerHb[id].setCollideWorldBounds(true);

            Game.playerHp[id] = Cthis.physics.add.sprite(x, y + 5, 'hitboxP');

            Game.playerHp[id].setCollideWorldBounds(true);

            Game.playerMap[id].setDepth(parseInt(Game.playerHb[id].y));

            for(var i = 0; i < Game.playerHb.length; i++){
                if(id != i){
                    Cthis.physics.add.collider(Game.playerHb[id], Game.playerHb[i]);
                    Cthis.physics.add.collider(Game.playerHp[id], Game.playerHp[i]);
                }
            }

            Cthis.anims.create({
                key: `left${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 118, end: 125 }),
                frameRate: 10,
                repeat: -1
            });
    
            Cthis.anims.create({
                key: `turn${id}`,
                frames: [ { key: `${spriteCli}`, frame: 130 } ],
                frameRate: 20
            });
    
            Cthis.anims.create({
                key: `turnup${id}`,
                frames: [ { key: `${spriteCli}`, frame: 104 } ],
                frameRate: 20
            });
    
            Cthis.anims.create({
                key: `turnleft${id}`,
                frames: [ { key: `${spriteCli}`, frame: 117 } ],
                frameRate: 20
            });
    
            Cthis.anims.create({
                key: `turnright${id}`,
                frames: [ { key: `${spriteCli}`, frame: 143 } ],
                frameRate: 20
            });
    
            Cthis.anims.create({
                key: `dashdown${id}`,
                frames: [{key: `${spriteCli}`, frame: 86}],
                frameRate: 10
            });
    
            Cthis.anims.create({
                key: `dashup${id}`,
                frames: [{key: `${spriteCli}`, frame: 60}],
                frameRate: 10
            });
    
            Cthis.anims.create({
                key: `dashleft${id}`,
                
                frames: [{key: `${spriteCli}`, frame: 73}],
                frameRate: 10
            });
    
            Cthis.anims.create({
                key: `dashright${id}`,
                frames: [{key: `${spriteCli}`, frame: 99}],
                frameRate: 10
            });
    
            Cthis.anims.create({
                key: `right${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 143, end: 150 }),
                frameRate: 10,
                repeat: -1
            });
    
            Cthis.anims.create({
                key: `up${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 105, end: 112 }),
                frameRate: 10,
                repeat: -1
                
            });
    
            Cthis.anims.create({
                key: `down${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 131, end: 138 }),
                frameRate: 10,
                repeat: -1
            });
            Cthis.anims.create({
                key: `hadoup${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 208, end: 212 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `hadodown${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 234, end: 238 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `hadoright${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 247, end: 251 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `hadoleft${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 221, end: 225 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `turnrighthado${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 252, end: 257}),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `turnlefthado${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 226, end: 231 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `turnuphado${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 213, end: 218 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `turnhado${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 239, end: 244 }),
                frameRate: 20
            });
            Cthis.anims.create({
                key: `dead${id}`,
                frames: Cthis.anims.generateFrameNumbers(`${spriteCli}`, { start: 260, end: 265 }),
                frameRate: 10
            });
            Cthis.anims.create({
                key: `body${id}`,
                frames: [{key: `${spriteCli}`, frame: 265}],
                frameRate: 20
            });
        }
        
        Game.addNewBullet = function (x, y, signal, direction, idP){
            
            gun.play();

            Game.removeBullet(idP);
            Game.bulletsP[idP] = [ Cthis.physics.add.sprite(x, y, 'bullet'), signal, direction ];
            Cthis.physics.add.overlap(
                limits,
                Game.bulletsP[idP],
                function overlap(_limits, bullet) {
                    bullet.setVelocityX(0);
                    bullet.setVelocityY(0);
                    Game.removeBullet(idP);           
                },
                function process(_limits, bullet) {
                  // It would be more efficient to create a CanvasTexture and check that instead.
                  // But getPixelAlpha() is convenient for an example.
            
                  return (
                    this.textures.getPixelAlpha(
                      Math.floor(bullet.body.center.x - limitsTopLeft.x),
                      Math.floor(bullet.body.center.y - limitsTopLeft.y),
                      "limits"
                    ) === 255
                  );
                },
                Cthis
              );

            if(idP != indexMe){
                Cthis.physics.add.collider(Game.playerHp[me], Game.bulletsP[idP][0], function (plane, obstacle) {
                    if(dead == false){
                        reached = true;
                        dead = true;
                        Client.reach(indexMe);
                        death.play();
                        Game.removeBullet(idP);
                    }
                });
            }

            if(Game.bulletsP[idP][1] == '+'){
                if(Game.bulletsP[idP][2] == '+'){
                    Game.bulletsP[idP][0].setVelocityX(400);
                }
                else{
                    Game.bulletsP[idP][0].setVelocityX(-400);
                }
            }
            else{
                if(Game.bulletsP[idP][2] == '+'){
                    Game.bulletsP[idP][0].setVelocityY(400);
                }
                else{
                    Game.bulletsP[idP][0].setVelocityY(-400);
                }
            }

        }
        this.cameras.main.width = cw;
        this.cameras.main.height = ch;
        this.cameras.main.setBounds(0, 0, w , h);

        this.physics.world.setBounds(0, 0, w, h);

        // var container = this.add.container(w, h).setName('conty');

        // ts = this.add.tileSprite(-midw, -midh, w, h, 'mapa').setName('tiley').setScale(1);
        // container.add(ts);

        bg = this.physics.add.staticImage(midw, midh, "mapa");
        limits = this.physics.add.staticImage(midw, midh, "limits");
        roofs = this.physics.add.staticImage(midw, midh, "roofs").setDepth(1920);

        var limitsTopLeft = limits.getTopLeft();


        cursors = this.input.keyboard.addKeys(
        {
            test:Phaser.Input.Keyboard.KeyCodes.ENTER,

            up:Phaser.Input.Keyboard.KeyCodes.W,
        
            down:Phaser.Input.Keyboard.KeyCodes.S,
        
            left:Phaser.Input.Keyboard.KeyCodes.A,
        
            right:Phaser.Input.Keyboard.KeyCodes.D,
        
            run:Phaser.Input.Keyboard.KeyCodes.SHIFT,

            sprint:Phaser.Input.Keyboard.KeyCodes.CTRL,

            dash:Phaser.Input.Keyboard.KeyCodes.K,

            hado:Phaser.Input.Keyboard.KeyCodes.H
        });
        
        Client.askNewPlayer(spriteMe);

        hp1 = this.physics.add.sprite(700, 475, 'hitbox');

        hc1 = this.physics.add.sprite(700, 455, 'hitboxP');

        player = this.physics.add.sprite(700, 450, spriteMe);

        hp1.setCollideWorldBounds(true);

        hc1.setCollideWorldBounds(true);

        this.physics.add.overlap(
            limits,
            hp1,
            function overlap(_limits, hp1) {
                hp1.setVelocityX(0);
                hp1.setVelocityY(0);
                dash = 0;
                collided = true;    
                recharged = false;            
            },
            function process(_limits, hp1) {
              // It would be more efficient to create a CanvasTexture and check that instead.
              // But getPixelAlpha() is convenient for an example.
        
              return (
                this.textures.getPixelAlpha(
                  Math.floor(hp1.body.center.x - limitsTopLeft.x),
                  Math.floor(hp1.body.center.y - limitsTopLeft.y),
                  "limits"
                ) === 255
              );
            },
            this
          );

        if (mobile == false){
            this.cameras.main.startFollow(player, true, 0.09, 0.09);
        }
        else{
            this.cameras.main.startFollow(player, true, 1, 1);
        }

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setZoom(zoom);

        if(mobile == true){

            buttonG = this.add.text(this.cameras.main.centerX - 50, this.cameras.main.centerY + 80, '   ')
            .setOrigin(0.5)
            .setPadding(12)
            .setStyle({ backgroundColor: '#00000000' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', aim)
            .on('pointerup', disparate)
            .setDepth(parseInt(ch));

            buttonD = this.add.text(this.cameras.main.centerX - 50, this.cameras.main.centerY + 160, '   ')
            .setOrigin(0.5)
            .setPadding(12)
            .setStyle({ backgroundColor: '#00000000' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', dasher)
            .setDepth(parseInt(ch));

            guns = this.physics.add.staticImage(this.cameras.main.centerX - 50, this.cameras.main.centerY + 80, "guns").setScale(0.08).setDepth(2000);
            dashs = this.physics.add.staticImage(this.cameras.main.centerX - 50, this.cameras.main.centerY + 160, "dashs").setScale(0.08).setDepth(2000);

            apx = parseInt(this.cameras.main.midPoint.x - (cw /2) + 170);
            apy = parseInt(this.cameras.main.midPoint.y + (ch /2) - 120);

            round = this.physics.add.staticImage(apx, apy, 'round').setDepth(2000);
            analog = this.physics.add.staticImage(apx, apy, 'analog').setDepth(2000);
        }
}
    
Game.update = function(time, delta, signal, direction)
    { 
            if (dead == true){
                if(danim == false){
                    movement = 'dead';
                    player.x = hp1.x;
                    player.y = hp1.y - 25;
                    hc1.x = hp1.x;
                    hc1.y = hp1.y - 20;
                    player.setDepth(parseInt(hp1.y));
                    hp1.setVelocityY(20);
                    timedEvent = this.time.delayedCall(500, function () { danim = true; hp1.setVelocityY(0); }, [], this);
                    player.anims.play(`${movement}${me}`, true);
                    Client.sendClick(player.x, player.y, `${movement}${me}`);
                }
                else{
                    movement = 'body';
                    hp1.setVelocityY(200);
                    player.anims.play(`${movement}${me}`, true);
                    Client.sendClick(player.x, player.y, `${movement}${me}`);
                }
                if(verifyed == 0){
                    verifyed = 1;
                    Client.verifyPlayers();
                    timedEvent = this.time.delayedCall(3000, function () { verifyed = 0}, [], this);
                }
            }
            else if (collided == true){
                hp1.setVelocityX(0);
                hp1.setVelocityY(0);
                if(sprinted == true)
                {
                    repulse = 0.83;
                }
                else if(cursors.dash.isDown)
                {
                    repulse = 4.2;
                }
                else if(cursors.run.isDown)
                {
                    repulse = 4.2;
                }
                else{
                    repulse = 4.2;
                }
                if(pressedV == "up"){
                    hp1.y = hp1.y + repulse;
                }
                else if(pressedV == "down"){
                    hp1.y = hp1.y - repulse;
                }
                if(pressedH == "right"){
                    hp1.x = hp1.x - repulse;
                }
                else if(pressedH == "left"){
                    hp1.x = hp1.x + repulse;
                }
                player.x = hp1.x;
                player.y = hp1.y - 25;
                hc1.x = hp1.x;
                hc1.y = hp1.y - 20;
                player.setDepth(parseInt(hp1.y));
                collided = false
                player.anims.play(`${movement}${me}`, true);
                Client.sendClick(player.x, player.y, `${movement}${me}`);
                recharged = false;
                rechargedH = false;
                timedEvent = this.time.delayedCall(500, function () { recharged = true; rechargedH = true; }, [], this);
            }
            else{
                // ts.tilePositionX = Math.cos(-iter) * 40;
                // ts.tilePositionY = Math.sin(-iter) * 40;
                // 
                // iter += 0.01;
                // 
                player.x = hp1.x;
                player.y = hp1.y - 25;
                hc1.x = hp1.x;
                hc1.y = hp1.y - 20;
                player.setDepth(parseInt(hp1.y));

                if(mobile == true){ 
                    pointer = this.input.activePointer;
                    if (pointer.isDown == true) {
                        if(touched == false && pointer.x < (cw / 2)){
                            touchX = pointer.x;
                            touchY = pointer.y;
                            touched = true;
                        }
                        else if(touched == true){
                            apx = parseInt(this.cameras.main.midPoint.x - (cw /2) + 170);
                            apy = parseInt(this.cameras.main.midPoint.y + (ch /2) - 120);
                            if(pointer.x < (cw / 2)){
                                movePx = parseInt(pointer.x - touchX);
                                movePy = parseInt(pointer.y - touchY);
                            }
                            
                            if(movePx > 50){
                                movePx = 50;
                            }
                            else if(movePx < -50){
                                movePx = -50;
                            }
                            if(movePy > 50){
                                movePy = 50;
                            }
                            else if(movePy < -50){
                                movePy = -50;
                            }

                            dw = parseInt(movePx);
                            dh = parseInt(movePy);

                            if(movePx < 0){
                                dw = dw * (-1);
                            }
                            if(movePy < 0){
                                dh = dh * (-1);
                            }

                            analog.x = apx + movePx;
                            analog.y = apy + movePy;
                            round.x = apx;
                            round.y = apy;
                        }
                        
                    }
                    else if (pointer.isDown == false && touched == true) {
                        apx = parseInt(this.cameras.main.midPoint.x - (cw /2) + 170);
                        apy = parseInt(this.cameras.main.midPoint.y + (ch /2) - 120);
                        touchX = 0;
                        touchY = 0;
                        touched = false;
                        movePx = 0;
                        movePy = 0;
                        dw = 0;
                        dh = 0;
                        analog.x = apx + movePx;
                        analog.y = apy + movePy;
                        round.x = apx;
                        round.y = apy;
                    }   
                    buttonG.x = Cthis.cameras.main.midPoint.x + (cw * 0.32);
                    buttonG.y = Cthis.cameras.main.midPoint.y + (ch * 0.30);
                    buttonD.x = Cthis.cameras.main.midPoint.x + (cw * 0.32);
                    buttonD.y = Cthis.cameras.main.midPoint.y + (ch * 0.10);
                    guns.x = Cthis.cameras.main.midPoint.x + (cw * 0.32);
                    guns.y = Cthis.cameras.main.midPoint.y + (ch * 0.30);
                    dashs.x = Cthis.cameras.main.midPoint.x + (cw * 0.32);
                    dashs.y = Cthis.cameras.main.midPoint.y + (ch * 0.10);
                }
                

                if (cursors.test.isDown){
                    if(send_test == 0){
                        send_test = 1;
                        Client.sendTest();
                        timedEvent = this.time.delayedCall(1000, function () { send_test = 0}, [], this);
                    }
                }
                if(verifyed == 0){
                    verifyed = 1;
                    Client.verifyPlayers();
                    timedEvent = this.time.delayedCall(3000, function () { verifyed = 0}, [], this);
                }
                if (cursors.dash.isDown)
                {   
                    if(recharged == true){
                        dash = 400;
                        recharged = false;
                        movement = `dash${movement}`;
                        timedEvent = this.time.delayedCall(300, function () { dash = 0 }, [], this);
                        timedEvent = this.time.delayedCall(1000, onEvent, [], this);
                    }
                }
                if (cursors.sprint.isDown)
                {   
                    if (p == false){
                        if(sprinted == true)
                        {
                            sprinted = false;
                        }
                        else
                        {
                            sprinted = true;
                        }
                    }
                    p = true;
                }
                if (cursors.sprint.isUp){
                    p = false;
                }
                if (cursors.run.isDown && sprinted == false)
                {
                    velocity = 250;
                    fr = 20;
                }
                else if (sprinted == true)
                {
                    velocity = 50;
                    fr = 5;
                }
                else
                {
                    velocity = 150;
                    fr = 10;
                }
                if (cursors.left.isDown || movePx < 0)
                {
                    saque =false;

                    hp1.setVelocityX(-velocity);

                    if(movePx < 0){
                        hp1.setVelocityX(-dw*3);
                    }

                    if(dash >=1){
                        if(mobile == true){
                            if(dw > dh){
                                hp1.setVelocityX(-dash);
                            }
                        }
                        else{
                            hp1.setVelocityX(-dash);
                        }
                    }
                    else{
                        movement = 'left';
                        
                    }

                    pressed = "left";
                    pressedH = "left";

                    if(kv == 0 || dw > dh){
                        player.anims.play(`${movement}${me}`, true);
                        Client.sendClick(player.x, player.y, `${movement}${me}`);
                    }
                    
                    
                    kh = 1;
                    
                    

                }
                else if (cursors.right.isDown  || movePx > 0)
                {
                    
                    saque =false;
                    hp1.setVelocityX(velocity);

                    if(movePx > 0){
                        hp1.setVelocityX(dw*3);
                    }

                    if(dash >=1){
                        if(mobile == true){
                            if(dw > dh){
                                hp1.setVelocityX(dash);
                            }
                        }
                        else{
                            hp1.setVelocityX(dash);
                        }
                    }
                    else{
                        movement = 'right';
                    }
                    
                    pressed = "right";
                    pressedH = "right";

                    if(kv == 0 || dw > dh){
                        player.anims.play(`${movement}${me}`, true);
                        Client.sendClick(player.x, player.y, `${movement}${me}`);
                    }
                    
                    

                    kh = 1;                  

                }

                else
                {
                    pressedH = "";
                    hp1.setVelocityX(0);
                    kh = 0;
                }

                if (cursors.up.isDown  || movePy < 0)
                {

                    saque =false;
                    hp1.setVelocityY(-velocity);

                    if(movePy < 0){
                        hp1.setVelocityY(-dh*3);
                    }
                    
                    if(dash >=1){
                        if(mobile == true){
                            if(dh > dw){
                                hp1.setVelocityY(-dash);
                            }
                        }
                        else{
                            hp1.setVelocityY(-dash);
                        }
                    }
                    else{
                        if(mobile == true){
                            if(dh > dw){
                                movement = 'up';
                            }
                        }
                        else{
                            movement = 'up';
                        }
                    }

                    
                    
                    kv = 1;

                    if(mobile == false){
                        player.anims.play(`${movement}${me}`, true);
                        pressed = "up";
                        pressedV = "up";
                    }
                    else if(dh > dw){
                        player.anims.play(`${movement}${me}`, true);
                        pressed = "up";
                        pressedV = "up"; 
                    }
                    Client.sendClick(player.x, player.y, `${movement}${me}`);
                    
                    
                }

                else if (cursors.down.isDown  || movePy > 0)
                {
                    saque =false;
                    hp1.setVelocityY(velocity);

                    if(movePy > 0){
                        hp1.setVelocityY(dh*3);
                        
                    }

                    if(dash >=1){
                        if(mobile == true){
                            if(dh > dw){
                                hp1.setVelocityY(dash);
                            }
                        }
                        else{
                            hp1.setVelocityY(dash);
                        }
                    }
                    else{
                        if(mobile == true){
                            if(dh > dw){
                                movement = 'down';
                            }
                        }
                        else{
                            movement = 'down';
                        }
                    }
                    
                    kv = 1;
                    
                    if(mobile == false){
                        player.anims.play(`${movement}${me}`, true);
                        pressed = "";
                        pressedV = "down";
                    }
                    else if(dh > dw){
                        player.anims.play(`${movement}${me}`, true);
                        pressed = "";
                        pressedV = "down";
                    }
                    Client.sendClick(player.x, player.y, `${movement}${me}`);
                }

                else
                {
                    hp1.setVelocityY(0);
                    kv = 0;
                    pressedV = "";
                }
                
                if(kv == 0 && kh == 0){
                    dash = 0;
                    if((cursors.hado.isDown || gun == true) && rechargedH == true)
                    {
                        if (pressed == ''){
                            movement = 'hadodown';
                        }
                        else{
                            movement = `hado${pressed}`;
                        }
                        
                        if(saque == false){

                            player.anims.play(`${movement}${me}`, true);
                            Client.sendClick(player.x, player.y, `${movement}${me}`);
                            saque = true;
                        }
                    }
                    else if((cursors.hado.isUp  || capsulate == true) && saque == true && movement.includes('hado'))
                    {
                        movement = `turn${pressed}hado`;
                        rechargedH = false;
                        powered = true;
                        timedEvent = this.time.delayedCall(500, function () { movement = `turn${pressed}`; powered = false;}, [], this);
                        timedEvent = this.time.delayedCall(600, function () { rechargedH = true; capsulate = false}, [], this);

                        var xreal = 0, xmove = 0, yreal = 0, ymove = 0;

                        if(pressed == 'left' || pressed == 'right'){
                            signal = '+';
                            xmove = 16;
                        }
                        else{
                            signal = '-';
                            ymove = 27;
                        }

                        if(pressed == 'up' || pressed == 'left'){
                            direction = '-';
                            xreal = player.x - xmove;
                            yreal = player.y - ymove;
                        }
                        else{
                            direction = '+';
                            xreal = player.x + xmove;
                            yreal = player.y + ymove;
                        }

                        Client.sendBullet(xreal, yreal, signal, direction, indexMe);

                        saque = false;
                        player.anims.play(`${movement}${me}`, true);
                        Client.sendClick(player.x, player.y, `${movement}${me}`);

                    }
                    else if(movement != '' && powered == false){
                        try{
                            player.anims.play(`turn${pressed}${me}`, true);
                        }
                        catch (e) {
                            movement = movement;
                        }
                        Client.sendClick(player.x, player.y, `turn${pressed}${me}`);
                        movement = '';
                    }
                }
            }
}

function onEvent ()
{
    recharged = true;
}

function dasher ()
{
    if(recharged == true){
        dash = 400;
        recharged = false;
        movement = `dash${movement}`;
        timedEvent = Cthis.time.delayedCall(300, function () { dash = 0 }, [], this);
        timedEvent = Cthis.time.delayedCall(1000, onEvent, [], this);
    }
}

function aim ()
{
    gun = true;
}

function disparate ()
{
    gun = false;
    capsulate = true;
}

Game.addNewRoll = function(data){
    $('#messages').append(data);
};

Game.movePlayer = function(id,x,y,moveto){
    try {
        var playerM = Game.playerMap[id];
        var playerH = Game.playerHb[id];
        var playerHp = Game.playerHp[id];
        playerM.x = x;
        playerM.y = y;
        playerH.x = x;
        playerH.y = y + 25;
        playerHp.x = x;
        playerHp.y = y + 5;
        playerM.setDepth(parseInt(playerH.y));
        if(id != me){
            playerM.anims.play(moveto, true);
        }
    }
    catch (e) {
        movement = movement;
    }
    
};

Game.removePlayer = function(id){
    var index = playerids.indexOf(id);
    if (index !== -1) {
        playerids.splice(index, 1);
    }
    Game.playerMap[id].destroy();
    Game.playerHb[id].destroy();
    Game.playerHp[id].destroy();
    delete Game.playerMap[id];
    delete Game.playerHb[id];
    delete Game.playerHp[id];
    indexMe = playerids.indexOf(me);
};

Game.removeBullet = function(id){
    try {
        Game.bulletsP[id][0].destroy();
        delete Game.bulletsP[id];
    }
    catch (e) {
        movement = movement;
    }
};

Game.resetPlayers = function(id,x,y,client,sprite){
    found = 0;
    for(var i = 0; i < playerids.length; i++){
        if(id == playerids[i]){
            found = 1;
            break;
        }
    }
    if(found == 0){
        Game.addNewPlayer(id,x,y,client,sprite);
    }
};