// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/[the number of version matching with firebase in package.json]/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/[for example: 7.16.1]/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: 'AAAAt2lxe3A:APA91bE2y0kbxGn7ZoqgJO_tPM4o436o_guqmn5C1PI2GyZ0BUgAdoao63xZBI5LeUoI_03nUk4TtGohtBTWCn9wPTLUXFXXUlE9WPnUHclnxiykHsHDmCwax0fbjchkosH8ZlzIQ-XA',
    projectId: 'crossmedia-app-f06f5',
    messagingSenderId: '787748060016',
    appId: '1:787748060016:ios:7ba0f14042aab3fa616db5'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();