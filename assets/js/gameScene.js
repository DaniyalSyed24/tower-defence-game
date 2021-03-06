let gameScene = Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function gameScene() {
            Phaser.Scene.call(this, { key: "gameScene" });
        },

    preload: function () {
        this.load.atlas('sprites', 'assets/media/spritesheet.png', 'assets/media/spritesheet.json');
        this.load.atlas('turretSprites', 'assets/media/turrets.png', 'assets/media/turretsheet.json');
        this.load.atlas('bulletSprites', 'assets/media/bulletsheet.png', 'assets/media/bulletsprites.json')
        this.load.image('EnemyOrc', 'assets/media/small orc.png');
        this.load.image('bullet', 'assets/media/bullet.png');
        this.load.image('gameBack', 'assets/media/level1-background.png');
        this.load.image('ui-Background', 'assets/media/mainBackground');
    },

    create: function () {
        this.add.image(400, 320, 'ui-Background');
        this.add.image(320, 256, 'gameBack');       

        let graphics = this.add.graphics();
        this.drawLines(graphics);
        path = this.add.path(96, -32);
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 544);

        graphics.lineStyle(2, 0xffffff, 1);
        /*path.draw(graphics);*/

        enemies = this.physics.add.group({ classType: this.Enemy, runChildUpdate: true });

        turrets = this.add.group({ classType: this.Turret, runChildUpdate: true });

        bullets = this.physics.add.group({ classType: this.Bullet, runChildUpdate: true });

        this.nextEnemy = 0;

        this.physics.add.overlap(enemies, bullets, this.damageEnemy);

        this.input.on('pointerdown', this.placeTurret, this);

        //badge buffs
        this.bonus_currency = (50 * badges[0]) + (50 * badges[7]) + (100 * badges[1]);
        this.bonus_lives = (50 * badges[4]) + (50 * badges[6]);
        CURRENCY += this.bonus_currency;
        LIVES += this.bonus_lives;
        this.events.emit("updateCurrency");
        this.events.emit("updateLives");

        if (badges[2] == 1) {
            BULLET_DAMAGE *= 1.5;
        }

        this.currency_multiplier = 1;
        if (badges[3] == 1) {
            this.currency_multiplier = 2;
        }

        //this.waveStarted = false;
        //this.turretSelected = false;

        enemiesLeft = Object.keys(waves[CURRENT_WAVE - 1].waveEnemies).length;
    },

    waveStarted: false,
    turretSelected: false,

    update: function (time, delta) {
        if (time > this.nextEnemy && LIVES > 0 && enemiesLeft > 0 && this.waveStarted) {
            let enemy = enemies.get();
            if (enemy) {
                //to break this down:
                    //gets the current wave data, gets the current enemy and accesses its values (hp, speed, reward)
                //console.log(waves[CURRENT_WAVE - 1].waveEnemies[this.enemiesSpawned]["hp"]);
                enemy.setHP(waves[CURRENT_WAVE - 1].waveEnemies[this.enemiesSpawned]["hp"]);
                enemy.setSpeed(waves[CURRENT_WAVE - 1].waveEnemies[this.enemiesSpawned]["speed"]);
                enemy.setReward(waves[CURRENT_WAVE - 1].waveEnemies[this.enemiesSpawned]["reward"]);
                //enemy.setHP(waves[this.enemiesSpawned].waveEnemies);
                this.enemiesSpawned += 1;
                //enemy.setHP(100);
                //enemy.setSpeed(1 / 10000);
                //enemy.setReward(10);
                enemiesLeft -= 1;
                enemiesAlive += 1;
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();



                //console.log(enemiesLeft);

                //this.nextEnemy = time + 2000;
                //this.nextEnemy = time + 1000;
                //this.nextEnemy = time + 250;

                this.nextEnemy = time + waves[CURRENT_WAVE - 1].enemySpawnSpeed;
            }
        }

        if (enemiesLeft <= 0 && enemiesAlive <= 0) {
            if (CURRENT_WAVE >= waves.length) {
                //win screen
                this.events.emit("gameWon");
            }
            else {
                CURRENT_WAVE += 1;
                if (badges[5] == 1) {
                    LIVES += 10;
                    this.events.emit("updateLives");
                }
                this.waveStarted = false;
                console.log(this.waveStarted);
                this.events.emit("updateWave");
                enemiesLeft = Object.keys(waves[CURRENT_WAVE - 1].waveEnemies).length;
            }
        }
        if (LIVES <= 0) {
            let enemyUnits = enemies.getChildren();
            for (let i = 0; i < enemyUnits.length; i++) {
                if (enemyUnits[i].active) {
                    enemyUnits[i].setActive(false);
                    enemyUnits[i].setVisible(false);
                }
            }
            this.events.emit("gameOver");
        }
    },

    startWave: function () {
        this.enemiesSpawned = 0;
        //enemiesLeft = waves[CURRENT_WAVE-1].waveEnemies;
        /*enemiesLeft = Object.keys(waves[CURRENT_WAVE - 1].waveEnemies).length;*/
        console.log(enemiesLeft);
        this.waveStarted = true;
        this.events.emit("waveStarted");
    },

    reset: function () {
        let turretUnits = turrets.getChildren();
        for (let t = 0; t < turretUnits.length; t++) {
            console.log(t);
            map[turretUnits[t].i][turretUnits[t].j] = 0;
            turretUnits[t].fireRate = 1000;
            turretUnits[t].range = 200;
            turretUnits[t].cost = 100;
            turretUnits[t].fireRateCost = 50;
            turretUnits[t].rangeCost = 50;
            turretUnits[t].setTexture('turretSprites', 'turrett1v1');

            turretUnits[t].setActive(false);
            turretUnits[t].setVisible(false);
        }
        CURRENCY = 200 + this.bonus_currency;
        LIVES = 100 + this.bonus_lives;
        CURRENT_WAVE = 1;
        waveStrength = 10;
        enemiesLeft = Object.keys(waves[CURRENT_WAVE - 1].waveEnemies).length;

        this.waveStarted = false;

        this.events.emit("updateCurrency");
        this.events.emit("updateLives");
        this.events.emit("updateWave");
    },


    /* ---------- OBJECTS ----------*/

    Enemy, Turret, Bullet,

    damageEnemy: function (enemy, bullet) {
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.setActive(false);
            bullet.setVisible(false);

            // decrease the enemy hp with BULLET_DAMAGE
            enemy.receiveDamage(BULLET_DAMAGE);
        }
    },

    drawLines: function (graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        graphics.setAlpha(0.4);
        for (let i = 0; i < 8; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(640, i * 64);
        }
        for (let j = 0; j < 10; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, 512);
        }
        graphics.strokePath();
    },

    canPlaceTurret: function (i, j) {
        return map[i][j] === 0;
    },

    //turretSelected: false,

    placeTurret: function (pointer) {
        let i = Math.floor(pointer.y / 64);
        let j = Math.floor(pointer.x / 64);
        //if (this.canPlaceTurret(i, j)) {
        if (map[i][j] === 0 && this.turretSelected) {
            let turret = turrets.get();
            if (turret) {
                if (CURRENCY >= turret.cost) {
                    turret.setActive(true);
                    turret.setVisible(true);
                    turret.place(i, j);
                    turret.setInteractive({
                        useHandCursor: true
                    });
                    selectedTurret = false;
                    //turret.on("pointerover", () => { console.log("hovered over turret"); turretHover = true; });
                    //turret.on("pointerout", () => { console.log("left turret"); turretHover = false; })
                    turret.on("pointerdown", () => { this.events.emit("clickedTurret", turret) });
                    CURRENCY -= turret.cost
                    this.events.emit("updateCurrency");
                    this.events.emit("placedTurret");
                }
                else { //this technically works but is really bad, has to be a better way to do this (towers stack on top left without this block)
                    turret.setActive(false);
                    turret.setVisible(false);
                }
            }
        }
    }
});
