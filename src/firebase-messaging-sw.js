// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: 'AIzaSyAG8grulyTimhG5e0NfpY1HeOGn_sqaDaU',
    projectId: 'crossmedia-app-f06f5',
    messagingSenderId: '787748060016',
    appId: '1:787748060016:ios:7ba0f14042aab3fa616db5'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler( payload => {
    const title = 'hello world';
    const options = {
        body: payload
    }
    return self.registration.showNotification(title, options)
})

