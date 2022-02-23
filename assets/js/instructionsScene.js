let instructionsScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function instructionsScene() {
            Phaser.Scene.call(this, { key: "instructionsScene", /*active: true*/});
        },

    preload: function() {
        this.load.image('bg', 'assets/media/sky1.png')
    },
    
    create: function () {
        this.add.image(400, 300, 'bg');

        this.add.text(20, 40, 'Instructions', { fontFamily: 'bebas', fontSize: 70, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

        let help = [
            'Place turrets to kill the enemies!'
        ];

        this.add.text(20, 180, help, { fontFamily: 'bebas', fontSize: 30, color: '#ffffff', lineSpacing: 6 }).setShadow(2, 2, "#333333", 2, false, true);
        this.add.text(20, 450, 'Click to go back', { fontFamily: 'bebas', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

        //this.input.keyboard.once('keydown_SPACE', this.start, this);
        //this.input.once('pointerdown', this.start, this);
        this.input.on('pointerdown', () => { this.scene.start('mainMenuScene')})
    }

    // start() {
    //     this.scene.start('gameScene');
    //     this.scene.start('UIScene');
    // },
});