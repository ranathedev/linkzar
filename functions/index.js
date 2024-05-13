/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

admin.initializeApp()
const db = admin.firestore()

exports.onUserCreate = functions.auth.user().onCreate(async user => {
  const usersCollection = db.collection('users')
  const userDocumentRef = usersCollection.doc(user.uid)

  console.log('Storing user data in firestore...')

  const data = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    creationTime: user.metadata.creationTime,
  }

  return userDocumentRef.set(data)
})

exports.onUserDelete = functions.auth.user().onDelete(async user => {
  const usersCollection = db.collection('users')
  const userDocumentRef = usersCollection.doc(user.uid)

  const data = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    accountDeactivated: true,
    deactivationTime: admin.firestore.FieldValue.serverTimestamp(),
  }

  return userDocumentRef.set(data)
})
