function signIn() {
  console.log('signin triggered!');

  email = document.getElementById('email').value;
  password = document.getElementById('password').value;

  console.log('Email: ' + email);
  console.log('Password: ' + password);

  createUser(email, password);
}

function logIn(email, password) {
  console.log('login triggered!');

  email = document.getElementById('email').value;
  password = document.getElementById('password').value;

  console.log('Email: ' + email);
  console.log('Password: ' + password);
  
  signInwithEmailPass(email, password);
}

function signInwithEmailPass(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    console.log('login error occured!');
    // ...
  });
}

function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    console.log('Signin error occured!');
    // ...
  });
}

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('SignOut successful!');
  }).catch(function(error) {
    // An error happened.
    console.log('SignOut Failed!');
    console.log(error);
  });
}
