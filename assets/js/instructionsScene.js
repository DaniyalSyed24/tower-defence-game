let instructionsScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function instructionsScene() {
            Phaser.Scene.call(this, { key: "instructionScene"});
        },

    preload: function() {
        this.load.image('instructions-background', 'assets/media/menuBackground.jpg');
    },
    
    create: function () {
        backgroundImage = this.add.image(420, 256, 'instructions-background');
        backgroundImage.displayWidth = this.sys.canvas.width;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        let title = this.add.text(screenCenterX, 120, "Instructions", {fontSize: "60px", fill: 'white'}).setOrigin(0.5);
        title.setShadow(2, 2, "#333333", 2, false, true);

        let instructionsContent = [
            '- Place turrets to kill the enemies!\n',
            '- Click on the turrets to upgrade or sell\n',
            '- Unlock badges under "My Badges" in the main menu'
        ];

        let instructions = this.add.text(80, 250, instructionsContent, {fontSize: 20});
        instructions.setColor(textColor);

        let returnButton = new Button(screenCenterX, 500, 'Return to Main Menu', this, () => {
            this.scene.start('mainMenuScene')
            let logoutButton = document.getElementById('logout-button')
            if (logoutButton && logoutButton.style.display === 'none') {
                logoutButton.style.display = 'block'
            }
        }, 50, 10);

        returnButton;
    },

});