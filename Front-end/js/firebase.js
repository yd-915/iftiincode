const config = {
  apiKey: "AIzaSyCE08vDZRnneJBWkTJGlIRK4osfiAHU4FM",
    authDomain: "market-eed24.firebaseapp.com",
    projectId: "market-eed24",
    storageBucket: "market-eed24.appspot.com",
    messagingSenderId: "149290205276",
    appId: "1:149290205276:web:9fd1db67dfa01722b4a699",
    measurementId: "G-YT9VD9EE03"
};
firebase.initializeApp(config);
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById("quickstart-sign-in").disabled = false;
        // [END_EXCLUDE]
      });
    // [END authwithemail]
  }
  document.getElementById("quickstart-sign-in").disabled = true;
}
//Google sing in
function googleSignIn() {
  var googleProvider = new firebase.auth.GoogleAuthProvider();
 // provider.addScope('https://www.googleapis.com/auth/plus.login');
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var googleToken = result.credential.accessToken;
      // The signed-in user info.
      var googleUser = result.user;
      console.log(googleUser);
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
//Facebook sign in
function facebookSignIn(){
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  
  firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var facebookToken = result.credential.accessToken;
  // The signed-in user info.
  var facebookUser = result.user;
    console.log(facebookUser)
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  
});
}

function yahooSignIn(){
  var yahooProvider = new firebase.auth.YahooAuthProvider();
  
  firebase.auth().signInWithPopup(yahooProvider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var yahooToken = result.credential.accessToken;
  // The signed-in user info.
  var yahooUser = result.user;
    console.log(yahooUser)
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  
});
}
/**
     * Handles the sign up button press.
     */
function handleSignUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END createwithemail]
}
/**
     * Sends an email verification to the user.
     */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert("Email Verification Sent!");
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}
function sendPasswordReset() {
  var email = document.getElementById("email").value;
  // [START sendpasswordemail]
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert("Password Reset Email Sent!");
      // [END_EXCLUDE]
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == "auth/invalid-email") {
        alert(errorMessage);
      } else if (errorCode == "auth/user-not-found") {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END sendpasswordemail];
}
/**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    document.getElementById("quickstart-verify-email").disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed in";
      document.getElementById("quickstart-sign-in").textContent = "Sign out";
      document.getElementById(
        "quickstart-account-details"
      ).textContent = JSON.stringify(user, null, "  ");
      if (!emailVerified) {
        document.getElementById("quickstart-verify-email").disabled = false;
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed out";
      document.getElementById("quickstart-sign-in").textContent = "Sign in";
      document.getElementById("quickstart-account-details").textContent =
        "null";
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById("quickstart-sign-in").disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document
    .getElementById("quickstart-sign-in")
    .addEventListener("click", toggleSignIn, false);
  document
    .getElementById("quickstart-sign-up")
    .addEventListener("click", handleSignUp, false);
  document
    .getElementById("quickstart-verify-email")
    .addEventListener("click", sendEmailVerification, false);
  document
    .getElementById("quickstart-password-reset")
    .addEventListener("click", sendPasswordReset, false);
  document
    .getElementById("google-sign-in")
    .addEventListener("click", googleSignIn, false);
  document
    .getElementById("facebook-sign-in")
    .addEventListener("click", facebookSignIn, false);
}

window.onload = function() {
  initApp();
};
