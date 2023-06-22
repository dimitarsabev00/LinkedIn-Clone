import { createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "../../configs/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
const initialState = {
  user: null,
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
            await addDoc(collection(db, "articles"), {
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
      } else if (payload?.video !== "") {
        await addDoc(collection(db, "articles"), {
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
      } else {
        await addDoc(collection(db, "articles"), {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
export default generalSlice.reducer;
