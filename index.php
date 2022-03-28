<?php

$con = mysqli_connect("localhost","root","","test");

if(!$con){
    echo "Failed to connect";
}else{
    echo "Database connected";
}

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Tower Defence Game</title>
        <meta name="author" content="IBM Group D"/>

        <link rel="stylesheet" href="assets/css/reset.css">
        <link rel="stylesheet" href="assets/css/screen.css">
    </head>

    <body>
        <header></header>

        <main>
            <div id="game"></div>

            <div id="input-box" style="display: none">
                <input type="text" name="username" placeholder="Username"><br/>
                <input type="text" name="password" placeholder="Password"><br/>
                <button type="submit">Submit</button>
            </div>
        </main>

        <footer></footer>

        <script src="https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js"></script>
        <script src="assets/js/loginScene.js"></script>
        <script src="assets/js/mainMenuScene.js"></script>
        <script src="assets/js/gameObjects.js"></script>
        <script src="assets/js/gameScene.js"></script>
        <script src="assets/js/UIScene.js"></script>
        <script src="assets/js/instructionsScene.js"></script>
        <script src="assets/js/script.js"></script>
    </body>
</html>