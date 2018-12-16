import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

import {scale} from '../misc/ImageProcessing'
import {firebaseConfig} from '../../config/Config'
// import {updateAnalytics} from '../../utils/ApiRequests'

class Firebase {
  constructor() {

    app.initializeApp(firebaseConfig);
    console.log('Init Firebase')

    this.auth = app.auth();
    this.db = app.firestore();
    this.tagDb = app.database();
    this.storage = app.storage();

    const settings = {timestampsInSnapshots: true};
    this.db.settings(settings);
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  getImageStorage = (url) => {
    return this.storage.ref(url)
  }

  handleImageUpload = (filename, url, file) => {
    return this.storage
      .ref(url)
      .child(filename)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot)
        return snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => {
            return downloadUrl;
          });
      });
  }

  addImageUrlToDB = (data, url) => {

    return this.db.collection(url).add(data).then((response) => {
      console.log(response)
      return data;
    });
  }

  updateImageUrlToDB = (data, url, id) => {

    return this.db.collection(url).doc(id).set(data).then((response) => {
      return data;
    });
  }

  deleteImageFromStorage = (image, path) => {

    let imageToDelete = this.storage.refFromURL(image.src);
    let tnToDelete = this.storage.refFromURL(image.srcTN);

    return imageToDelete.delete().then(() => {

      return tnToDelete.delete().then(() => {

        this.deleteImageFromDB(image, path).then(() => {
          return true;

        }).catch((error) => {
          console.error("Error removing document: ", error);
          return false;
        });

      }).catch((error) => {
        console.error("Error removing document: ", error);
        return false;
      });

    }).catch(() => {
      return false;
    })
  }

  deleteImageFromDB = (image, path) => {

    return this.db.collection(path)
      .where('src', '==', image.src)
      .get()
      .then(querySnapshot => {

        let imageId;

        querySnapshot.forEach(function (doc) {
          imageId = doc.id;
        });

        this.db.collection(path).doc(imageId).update({
          date: app.firestore.FieldValue.delete(),
          src: app.firestore.FieldValue.delete(),
          description: app.firestore.FieldValue.delete(),
          title: app.firestore.FieldValue.delete(),
          publish: app.firestore.FieldValue.delete(),
          srcTN: app.firestore.FieldValue.delete(),
        }).then(() => {

          this.db.collection(path).doc(imageId).delete().then(() => {
            console.log("Document successfully deleted!");
            return true;
          }).catch((error) => {
            console.error("Error removing document: ", error);
            return false;
          });
        }).catch((error) => {
          console.error("Error removing document: ", error);
          return false;
        });
      }).catch((error) => {
        console.error("Error removing document: ", error);
        return false;
      });
  }

  getImageUrls = (path) => {

    return this.db.collection(path)
      .orderBy("date", 'desc')
      .get()
      .then(querySnapshot => {
        const Matches = [];

        querySnapshot.forEach(function (doc) {
          Matches.push({
            date: doc.data().date,
            src: doc.data().src,
            title: doc.data().title,
            description: doc.data().description,
            id: doc.id,
            publish: doc.data().publish,
            srcTN: doc.data().srcTN,
          });
        });

        return Matches
      })
  }

  addLinkToDB = (data, url) => {

    return this.db.collection(url).add(data).then((response) => {
      console.log(response)
      return data;
    });
  }

  getLinks = (path) => {

    return this.db.collection(path)
      .orderBy("date", 'desc')
      .get()
      .then(querySnapshot => {
        const Matches = [];

        querySnapshot.forEach(function (doc) {
          Matches.push({
            date: doc.data().date,
            url: doc.data().url,
            title: doc.data().title,
            description: doc.data().description,
            extra: doc.data().extra,
            id: doc.id,
          });
        });

        return Matches
      })
  }

  deleteLink = (path, id) => {

    console.log(id)
    console.log(path)
    return this.db.collection(path).doc(id).update({
      date: app.firestore.FieldValue.delete(),
      url: app.firestore.FieldValue.delete(),
      title: app.firestore.FieldValue.delete(),
      description: app.firestore.FieldValue.delete(),
      extra: app.firestore.FieldValue.delete(),
    }).then(() => {

      this.db.collection(path).doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        return;
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    })
  }
}

export default Firebase;