import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()
firestore.settings({
  timestampsInSnapshots: true
})
const auth = firebaseApp.auth()

export {
  firestore as
  default, auth
}
