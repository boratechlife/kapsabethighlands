import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, query, orderBy, updateDoc, Firestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, FirebaseStorage } from 'firebase/storage';

let app;
let analytics;
let auth: Auth;
let firestore: Firestore;
let storage: FirebaseStorage;

async function initializeFirebase() {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.FB_API_KEY,
    authDomain: config.public.FB_AUTH_DOMAIN,
    projectId: config.public.FB_PROJECT_ID,
    storageBucket: config.public.FB_STORAGE_BUCKET,
    messagingSenderId: config.public.FB_MESSAGING_SENDER_ID,
    appId: config.public.FB_APP_ID,
    measurementId: config.public.FB_MEASUREMENT_ID,
  };

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app);
}

async function uploadImage(file, fileName, folder = 'images') {
  if (!storage) await initializeFirebase();

  try {
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    console.log(`Image ${fileName} uploaded successfully.`);

    const downloadURL = await getDownloadURL(storageRef);
    console.log(`Uploaded image is available at ${downloadURL}`);

    return downloadURL;
  } catch (error) {
    console.error(`Error uploading image ${fileName}:`, error);
    return null;
  }
}

async function getImagesFromDirectory(directory: string | undefined) {
  if (!storage) await initializeFirebase();

  const storageRef = ref(storage, directory);
  const files = await listAll(storageRef);

  const imageURLs = await Promise.all(files.items.map(async (file) => {
    return await getDownloadURL(file);
  }));

  return imageURLs;
}

async function getCollectionData(collectionName: string, order = '') {
  if (!firestore) await initializeFirebase();

  const collectionRef = collection(firestore, collectionName);
  const q = order ? query(collectionRef, orderBy(order)) : query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}

async function updateMenu(colTable: string, menuId: string, editedMenu: any) {
  if (!firestore) await initializeFirebase();

  const washingtonRef = doc(firestore, colTable, menuId);
  await updateDoc(washingtonRef, editedMenu);
  console.log('Menu updated successfully');
}

export default defineNuxtPlugin(async (nuxtApp) => {
  await initializeFirebase();

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.provide('firestore', firestore);

  nuxtApp.vueApp.provide('uploadImage', { uploadImage });
  nuxtApp.provide('uploadImage', { uploadImage });

  nuxtApp.provide('fetchCollection', getCollectionData);
  nuxtApp.provide('getImagesFromDirectory', getImagesFromDirectory);

  nuxtApp.vueApp.provide('updateMenu', updateMenu);
  nuxtApp.provide('updateMenu', updateMenu);
});