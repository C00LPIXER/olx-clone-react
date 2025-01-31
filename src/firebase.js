import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  getDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email,
    });

    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

const addProduct = async (
  title,
  description,
  category,
  price,
  email,
  imageUrl,
  location
) => {
  try {
    await addDoc(collection(db, "products"), {
      title: title,
      description: description,
      category: category,
      price: price,
      userMail: email,
      image: imageUrl,
      location: location,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const getAllProducts = async () => {
  const allProductsSnapshot = await getDocs(collection(db, "products"));
  return allProductsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
    };
  });
};

const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
      };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    
  }
};

export {
  auth,
  db,
  login,
  signup,
  logout,
  addProduct,
  getAllProducts,
  getProductById,
};
