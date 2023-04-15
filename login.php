<?php

// Start the session
session_start();

// Check if the user has submitted the login form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Retrieve the submitted username and password
  $username = $_POST['username'];
  $password = $_POST['password'];

  // TODO: Validate the username and password against your database or other data source
  if ($username === 'user123' && $password === 'password123') {
    // If the username and password are valid, set a session variable to indicate that the user is logged in
    $_SESSION['logged_in'] = true;

    // Redirect the user to the home page
    header('Location: /home.html');
    exit;
  } else {
    // If the username and password are invalid, display an error message
    $error = 'Invalid username or password';
  }
}

?>

<!-- Display the login form -->
<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  <br>
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>
  <br>
  <input type="submit" value="Log In">
</form>

<?php if (isset($error)) { ?>
  <p><?php echo $error; ?></p>
<?php } ?>
