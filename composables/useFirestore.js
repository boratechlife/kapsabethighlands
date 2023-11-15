// useFirestoreDoc.js
import { ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore';


const useFirestore = (collection, documentId) => {
  const data = ref(null);
  const error = ref(null);
  const db = useNuxtApp().$firestore
  const loadDoc = async () => {
    try {
      const docRef = doc(db, collection, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        data.value = docSnap.data();
      } else {
        data.value = null;
        error.value = 'No such document!';
      }
    } catch (e) {
      error.value = e.message;
    }
  };

  return { data, error, loadDoc };
};

export default useFirestore;
