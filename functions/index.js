
const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'faecefafor',
    clientEmail: 'firebase-adminsdk-r3chs@faecefafor.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDqDY4qYHfXOSIN\nEDUAPFaMB5kFVtyH9Y0DCeWGIXEm5zg47qDewkTN4BFPxRztpkhZKwpFEenOPoaE\n4Ms8V5nAQMQOqLq6Vbo6IqxfOlyGN+VslPwdEadiqpTjW+wB1XPsvhoFfUaStqcu\nSFz2NuqgXRiQzedglWLY6uZaReWoCvz5ESJKvET58K//39X8KmFrMe6kF6posfBz\nThiKNPBHwRwPEm/HzEwvwW95DzA2+5q04cRWEjX1HVdy/STtw3JJaaTiiGKVSRrl\nw0W5u16JbKv/NOWqILXXcUkpigepJUzxBmIgcxypG99B7nPIbUnSpOYGZDJ0S1du\nXUffebDhAgMBAAECgf4nAhtaSg8EeoEyVtZ+iOU5HAsPg2qTPlmXfWQY9s86V08H\ng2iht78VO5hRszMfE0JQ74Yb/OBQKhuWtIsq2MQcnAQRGA4HAEK0GGiiIRf1RrD2\nEolHpFRBctddt/RIWfWi1LbW3go6aYweKpv+bSitkYExS8qZo6GAhaXeuxzg5KJT\nSK30Av5XB9ZS3bpiPx8DzKwMAOOKgEq/wDw/WcEBtHw4QhYz47DVuOReh3yWy+Bv\nGB/bY5F+PcNzVqPl1oNiqpogSqoHZoNT5OlKeGd2cuuR7NGlZO9P4LHfIJNWynj5\n/IJxBuNgzPwCXj/9s+xO/3oxR7fZW79VPMrJiQKBgQD5zkWNYb8bLHGMFIcUifaD\nXIpAEck2tb/QUFW/uYQ3WdJ+fAzfTVXQMvp6VlMUcx2L+SZ89+2XAAsgdXVL/bFV\nUdN1AZO1jxsshkerGWetI+ipGIXgsxxvMjq/6HtpHUfzbgEyG0pPNRq3f5CU2qGr\nc1bf7aJkwue8O0DOYmaStQKBgQDv20mNfNd7sVoTyyBx8lrWfSGPfkDWbpsgorZw\n0yy2yS2qBo+5tpsfpEyYljT5DitDWeftqRARqjas1utNhTOloIJDH5fvGcquAQor\nhAmFzGW2yZyvibzKaFZ+wh/vv6p66ERFc/DTBd765kBQxhQiTcdO9DZW6u4HDTO5\nVxxk/QKBgFaY8jWL4BMMeiRkbVtqZEGvj+GcCNPld6RAZSl8p2AEzFq6qD+08H2n\nXnuQd2aMbX67lWMXE48YHcNX1JzOSm5YWmSiclErVfE+b5PZz74Ox7Xu4WI+1Smb\nERC8CCQtWWcDCHkVStJgh217VGS10fu8lS41k+k4Q9tV8yZYqFRNAoGBAKvKWLzw\nzHk4RjblBoD2Px9ekhnvKEss/wh54cefSGhGYOFlP62Y3zPjfkTPWHOFNXFQxG+Q\n5gRw8CYM7I0iOSKIeqPOzggfZe4IqpsOP6/H/JXVgtarBT/HSSQSr8MMePL8xmEk\nMDlD/DehkDEKHcOQB49CFGVecEs2pnQ5swmVAoGBALQtpb+YrGjZiBfn02R3pYU7\n0NR1awT+FEgfdkp7o4Hu2bdLp3H3lB0LBPvygH9UPQo8jlsp43l44uPaZ8KJTlXk\nYoOXWda7KoztHzUeqrSOZXsaUdfo92SRqEauqf76Hnd+dHy4BqZtwk3QNpzbcD5/\nFujG2X5BB2K57kVZlCA9\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://faecefafor.firebaseio.com'
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
