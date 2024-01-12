import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from 'firebase/storage';

export default defineNuxtPlugin(async (nuxtApp) => {
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

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  async function uploadImage(
    file: Blob | Uint8Array | ArrayBuffer,
    fileName: string,
    folder = 'images'
  ) {
    try {
      const storageRef = ref(storage, `${folder}/${fileName}`);
      await uploadBytes(storageRef, file);
      console.log(`Image ${fileName} uploaded successfully.`);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log(`Uploaded image is available at ${downloadURL}`);

      return downloadURL; // Return the URL of the uploaded file
    } catch (error) {
      console.error(`Error uploading image ${fileName}:`, error);
      return null; // Return null or handle the error as needed
    }
  }

  async function getImagesFromDirectory(directory: string | undefined) {
    const storageRef = ref(storage, directory);
    const files = await listAll(storageRef);

    const imageURLs = [];

    for (const file of files.items) {
      const imageUrl = await getDownloadURL(file);
      imageURLs.push(imageUrl);
    }

    return imageURLs;
  }

  async function getCollectionData(collectionName: string, order: string) {
    // const querySnapshot = await getDocs(collection(firestore, collectionName).orderBy("name"));
    let querySnapshot = null;
    if (order.length > 0) {
      querySnapshot = await getDocs(
        query(collection(firestore, collectionName), orderBy(order))
      );
    } else {
      querySnapshot = await getDocs(
        query(collection(firestore, collectionName))
      );
    }

    const documents: { id: any; data: any }[] = [];
    querySnapshot.forEach((doc: { id: any; data: () => any }) => {
      documents.push({ id: doc.id, data: doc.data() });
    });

    return documents;
  }

  async function updateMenu(colTable: any, menuId: any, editedMenu: any) {
    const washingtonRef = doc(firestore, colTable, menuId);

    console.log('Wash', washingtonRef);
    const updated = await updateDoc(washingtonRef, editedMenu);

    console.log('Updated', updated);
  }

  // Usage
  const collectionName = 'home'; // Replace with the actual collection name
  const documents = await getCollectionData(collectionName, 'order');

  //GET topbar
  const topbar = await getCollectionData('topbar', '');
  console.log('tobbar', topbar);
  //  await updateMenu('topbar', "RtzabOyYq4R58kcTZfSX",{
  //     name:"Test"
  //   } )

  //GET Directors Message
  const dirmessage = await getCollectionData('director', '');

  //GET Aboutus
  const aboutus = await getCollectionData('aboutus', '');

  //GET Statistics
  const statistics = await getCollectionData('statistics', '');

  // WHY US
  const whyus = await getCollectionData('whyus', 'order');

  // Contact US
  const contactus = await getCollectionData('contactus', '');

  const heroImages = await getImagesFromDirectory('images');
  const directorsImages = await getImagesFromDirectory('directors');
  const aboutImages = await getImagesFromDirectory('aboutus');
  const whyusImages = await getImagesFromDirectory('whyus');
  const galleryImages = await getImagesFromDirectory('gallery');

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.provide('firestore', firestore);

  nuxtApp.vueApp.provide('homePageData', { documents });
  nuxtApp.provide('homePageData', { documents });

  nuxtApp.vueApp.provide('uploadImage', { uploadImage });
  nuxtApp.provide('uploadImage', { uploadImage });

  // HERO IMAGES
  nuxtApp.vueApp.provide('heroImages', { ...heroImages });
  nuxtApp.provide('heroImages', { ...heroImages });

  // Directors Image IMAGES
  nuxtApp.vueApp.provide('directorsImages', { ...directorsImages });
  nuxtApp.provide('directorsImages', { ...directorsImages });

  //ABOUT IMAGES
  nuxtApp.vueApp.provide('aboutImages', { ...aboutImages });
  nuxtApp.provide('aboutImages', { ...aboutImages });

  //WHY US IMAGES
  nuxtApp.vueApp.provide('whyusImages', { ...whyusImages });
  nuxtApp.provide('whyusImages', { ...whyusImages });
  //GALLERY  IMAGES
  nuxtApp.vueApp.provide('galleryImages', { ...galleryImages });
  nuxtApp.provide('galleryImages', { ...galleryImages });

  // TOPBAR TEXT
  nuxtApp.vueApp.provide('topbar', { ...topbar });
  nuxtApp.provide('topbar', { ...topbar });
  // TOPBAR TEXT
  nuxtApp.vueApp.provide('updateMenu', updateMenu);
  nuxtApp.provide('updateMenu', updateMenu);

  //DIRECTOR
  nuxtApp.vueApp.provide('dirmessage', { ...dirmessage });
  nuxtApp.provide('dirmessage', { ...dirmessage });

  //ABOUT US
  nuxtApp.vueApp.provide('aboutus', { ...aboutus });
  nuxtApp.provide('aboutus', { ...aboutus });

  //STATISTICS  US
  nuxtApp.vueApp.provide('statistics', { ...statistics });
  nuxtApp.provide('statistics', { ...statistics });

  //WHY  US
  nuxtApp.vueApp.provide('whyus', { ...whyus });
  nuxtApp.provide('whyus', { ...whyus });
  //CONTACT  US
  nuxtApp.vueApp.provide('contactus', { ...contactus });
  nuxtApp.provide('contactus', { ...contactus });
});
