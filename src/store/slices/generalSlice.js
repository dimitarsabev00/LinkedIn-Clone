import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "../../configs/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import uuid from "react-uuid";
import { toast } from "react-toastify";
const initialState = {
  user: null,
  posts: [],
};
export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setGeneralFields: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setGeneralFields } = generalSlice.actions;

// here write actions
export const loginUserWithGoogle = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    dispatch(setGeneralFields({ user }));
    window.location.href = "/feed";
  } catch (error) {
    console.log(error);
  }
};
export const loginUserWithEmailAndPassword =
  ({ payload, onSuccess }) =>
  async (dispatch) => {
    try {
      let { user } = await signInWithEmailAndPassword(
        auth,
        payload?.email,
        payload?.password
      );
      dispatch(setGeneralFields({ user }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };
export const registerUserWithEmailAndPassword =
  ({ payload, onSuccess }) =>
  async (dispatch) => {
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        payload?.email,
        payload?.password
      );
      await addDoc(collection(db, "users"), {
        userID: uuid(),
        name: payload?.name,
        email: payload?.email,
        avatar:
          "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
      });

      dispatch(setGeneralFields({ user }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      toast.error("Cannot Created your Account!");
    }
  };
export const checkUser = () => async (dispatch) => {
  onAuthStateChanged(auth, async (currUser) => {
    if (currUser) {
      dispatch(setGeneralFields({ user: currUser }));
    }
  });
};
export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(setGeneralFields({ user: null }));

  window.location.href = "/login";
};
export const createPost =
  ({ payload }) =>
  async () => {
    try {
      if (payload?.image !== "") {
        const storageRef = ref(storage, `images/${payload?.image?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, payload?.image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progress: ${progress}%`);
            if (snapshot.state === "running") {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, "posts"), {
              author: {
                email: payload?.user?.email,
                fullName: payload?.user?.displayName,
                createdAt: payload?.timestamp,
                avatar: payload?.user?.photoURL,
              },
              video: payload?.video,
              sharedImage: downloadURL,
              comments: 0,
              description: payload?.description,
            });
          }
        );
        toast.success("Post has been added successfully!");
      } else if (payload?.video !== "") {
        await addDoc(collection(db, "posts"), {
          author: {
            email: payload?.user?.email,
            fullName: payload?.user?.displayName,
            createdAt: payload?.timestamp,
            avatar: payload?.user?.photoURL,
          },
          video: payload?.video,
          sharedImage: "",
          comments: 0,
          description: payload?.description,
        });
        toast.success("Post has been added successfully!");
      } else {
        await addDoc(collection(db, "posts"), {
          author: {
            email: payload?.user?.email,
            fullName: payload?.user?.displayName,
            createdAt: payload?.timestamp,
            avatar: payload?.user?.photoURL,
          },
          video: payload?.video,
          sharedImage: "",
          comments: 0,
          description: payload?.description,
        });
        toast.success("Post has been added successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getPosts = () => async (dispatch) => {
  try {
    const postsCollectionRef = collection(db, "posts");
    const postsQuery = query(
      postsCollectionRef,
      orderBy("author.createdAt", "desc")
    );

    onSnapshot(postsQuery, (snapshot) => {
      const payload = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc?.id };
      });
      dispatch(setGeneralFields({ posts: payload }));
    });
  } catch (error) {
    console.log(error);
  }
};
export default generalSlice.reducer;
