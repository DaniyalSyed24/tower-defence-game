<?php
require_once "process/config.php";

$username = $password = $confirm_password = $badgeCode = "";
$username_err = $password_err = $confirm_password_err = "";

session_start();
//session_destroy();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    
} else {
    echo htmlspecialchars($_SESSION["username"]) . " logged in.";
    echo htmlspecialchars ("Badge 1: " . ($_SESSION["badge1"]));
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

            <div id="input-box-login" style="display: none">
                <form action="<?php echo htmlspecialchars("process/login.php"); ?>" method="post">
                    <div class="form-group">
                        <input type="text" name="username" placeholder="Username" class="form-control<?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                        <span class="invalid-feedback"><?php echo $username_err; ?></span>
                    </div>    
                    <div class="form-group">
                        <input type="password" name="password" placeholder="Password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>">
                        <span class="invalid-feedback"><?php echo $password_err; ?></span>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Login" >
                    </div>
                </form>
            </div>

            <div id="input-box-register" style="display: none">
                <form action="<?php echo htmlspecialchars("process/register.php"); ?>" method="post">
                <div class="form-group">
                    <input type="text" name="username" placeholder="Username"class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                    <span class="invalid-feedback"><?php echo $username_err; ?></span>
                </div>    
                <div class="form-group">
                    <input type="password" name="password" placeholder="Password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $password; ?>">
                    <span class="invalid-feedback"><?php echo $password_err; ?></span>
                </div>
                <div class="form-group">
                    <input type="password" name="confirm_password" placeholder="Confirm Password" class="form-control <?php echo (!empty($confirm_password_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $confirm_password; ?>">
                    <span class="invalid-feedback"><?php echo $confirm_password_err; ?></span>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="Register">
                </div>
                </form>
            </div>

            <div id='logout-button'>
                <form action="<?php echo htmlspecialchars("process/logout.php"); ?>" method="post">
                    <input type="submit" class="rounded" value="Logout">
                </form>
            </div>

            <div id='badges-form' style="display: none">
                <form action="<?php echo htmlspecialchars("process/addBadge.php"); ?>" method="post">
                <input type="text" name="badgeCode" placeholder="Badge Code" value="<?php echo $badgeCode; ?>"><br/>
                <input type="submit" value="Submit">
                </form>
            </div>
        </main>

        <footer></footer>

        <script src="https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js"></script>
        <script src="assets/js/loginScene.js"></script>
        <script src="assets/js/registerScene.js"></script>
        <script src="assets/js/mainMenuScene.js"></script>
        <script src="assets/js/instructionsScene.js"></script>
        <script src="assets/js/gameObjects.js"></script>
        <script src="assets/js/gameScene.js"></script>
        <script src="assets/js/UIScene.js"></script>
        <script src="assets/js/badgeScene.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/script.js"></script>
    </body>
</html>