import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBXPgJbou4ay0ZwzuMNMs1HP1N61q0OqwQ',
  authDomain: 'dulieu-bf080.firebaseapp.com',
  databaseURL: 'https://dulieu-bf080.firebaseio.com',
  projectId: 'dulieu-bf080',
  storageBucket: 'dulieu-bf080.appspot.com',
  messagingSenderId: '225881403280',
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config); //khoi tao
    }
  }

  login = async (user, success_callback, failed_callback) => {
    const output = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  }; // ket noi react native voi firebase

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  createAccount = async user => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function() {
          alert(
            'Tài khoản đã được tạo thành công. Đăng nhập ngay !'
          );
        },
        function(error) {
          alert('Tạo tài khoản thất bại !');
        }
      );
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('Messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
}

const Fire = new Firebase();
export default Fire;
