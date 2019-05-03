
const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: '######################################',
    clientEmail: '######################################',
    privateKey: '-----BEGIN PRIVATE KEY-----\######################################'
  }),
  databaseURL: 'https://######################################.firebaseio.com'
});

exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate((snapshort, context) => {

  const message = snapshort._data
  const userId = context.params.userId

  const payload = {
    notification: {
      title: message.title,
      body: message.body,
      icon: "https://placeimg.com/250/250/people"
    }
  };

  admin.database()
    .ref(`/fcmTokens/${userId}`)
    .once('value')
    .then((token) => {
      return token.val();
    })
    .then(userFcmToken => {
      return admin.messaging().sendToDevice(userFcmToken, payload)
    })
    .catch(err => {
      console.log(err);
    });

});
