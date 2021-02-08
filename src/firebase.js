import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDh-yOyA8ITJjIa_Kv79h1Blr78Jh2Dvls',
  authDomain: 'whats-app-clone-1ed6c.firebaseapp.com',
  projectId: 'whats-app-clone-1ed6c',
  storageBucket: 'whats-app-clone-1ed6c.appspot.com',
  messagingSenderId: '532614257926',
  appId: '1:532614257926:web:74c5d5ded8679239e2d287',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)


const db = firebaseApp.firestore()

const auth = firebase.auth()

const googleProvider = new firebase.auth.GoogleAuthProvider()

export {db, auth, googleProvider}