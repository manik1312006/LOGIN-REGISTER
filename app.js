// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmW9g-9rgd-yYTv33F3ltDcuka5ZffZD0",
    authDomain: "users-372b7.firebaseapp.com",
    databaseURL: "https://users-372b7-default-rtdb.firebaseio.com",
    projectId: "users-372b7",
    storageBucket: "users-372b7.appspot.com",
    messagingSenderId: "526606387265",
    appId: "1:526606387265:web:c3c157174349d6cdabdec0" // App ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to DOM elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginBox = document.querySelector('.form-box');
const registerBox = document.getElementById('register-box');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Toggle between login and register forms
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
});

// Login functionality
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            console.error('Login error:', error.message);
            alert(error.message);
        });
});

// Register functionality
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User registered:', userCredential.user);
            // Save user data to Realtime Database
            return firebase.database().ref('users/' + userCredential.user.uid).set({
                email: email,
            });
        })
        .then(() => {
            console.log('User data saved to database');
            alert('Registration successful! Please log in.');
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
        })
        .catch((error) => {
            console.error('Registration error:', error.message);
            alert(error.message);
        });
});

// Auth state change listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});