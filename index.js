
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAyOBK1TFLUN6MCg3MABnVjJ-FBms3yV1c",
        authDomain: "webdev-e9a65.firebaseapp.com",
        projectId: "webdev-e9a65",
        storageBucket: "webdev-e9a65.appspot.com",
        messagingSenderId: "41672593945",
        appId: "1:41672593945:web:6ee3953eaf5b5682715088"
    };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Login function
  function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User login successful
        var user = userCredential.user;
        console.log("User logged in:", user.email);
        // You can redirect or perform any other actions here
      })
      .catch((error) => {
        // Handle login errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // Display error message to the user
        window.alert(errorMessage);
      });
  }

  // Handle form submission
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Call the login function
    login(username, password);
  });