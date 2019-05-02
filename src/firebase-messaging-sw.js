importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '77247144900'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const title = 'Hello World from SW!';
    const options = {
        body: payload.data.status
    };
    return self.registration.showNotification(title, options);
});

messaging.onMessage((payload) => {
  const title = payload.title;
  return self.registration.showNotification(title, payload.data.status);
});

