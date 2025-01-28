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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCIguc22IQG29PfevQmqs6SIoOZD2GDwLo",
  authDomain: "olx-clone-92d23.firebaseapp.com",
  projectId: "olx-clone-92d23",
  storageBucket: "olx-clone-92d23.firebasestorage.app",
  messagingSenderId: "576972464059",
  appId: "1:576972464059:web:2e6b4a51c75d6536fcae9e",
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
