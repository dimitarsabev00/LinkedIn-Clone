/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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
  doc,
  getDoc,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import uuid from "react-uuid";
import { toast } from "react-toastify";
const initialState = {
  user: null,
  currentProfile: [],
  allUsers: [],
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
export const loginUserWithGoogle =
  ({ onSuccess }) =>
  async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      window.localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      localStorage.setItem("currentUserEmail", user?.email);

      const docSnap = await getDoc(doc(db, "users", user?.email));
      if (docSnap.exists() === false) {
        await addDoc(collection(db, "users"), {
          id: uuid(),
          name: user?.displayName,
          email: user?.email,
          avatar: user?.photoURL,
        });
      }
      window.location.href = "/feed";
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Check your Credentials");
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
      window.localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      localStorage.setItem("currentUserEmail", user?.email);
      dispatch(checkUser());
      window.location.href = "/feed";
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
        name: payload?.name,
        email: payload?.email,
        avatar:
          "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
      });
      window.localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      localStorage.setItem("currentUserEmail", user?.email);
      dispatch(checkUser());
      window.location.href = "/feed";
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      toast.error("Cannot Created your Account!");
    }
  };
export const checkUser = () => async (dispatch) => {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  onSnapshot(collection(db, "users"), (snapshot) => {
    const result = snapshot.docs
      .map((doc) => {
        return { ...doc.data(), userID: doc?.id };
      })
      .filter((item) => {
        return item.email === currentUserEmail;
      });
    dispatch(setGeneralFields({ user: result }));
  });
};

export const logout =
  ({ onSuccess }) =>
  async (dispatch) => {
    await signOut(auth);
    window.localStorage.clear();
    dispatch(setGeneralFields({ user: null }));
    window.location.href = "/";
    if (onSuccess) {
      onSuccess();
    }
  };
export const editProfile =
  ({ payload, userID, onSuccess }) =>
  async () => {
    try {
      let userRef = collection(db, "users");

      let userToEdit = doc(userRef, userID);

      updateDoc(userToEdit, payload);
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Profile has been updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Cannot Edit Profile");
    }
  };
export const getCurrentProfileForSingleUser =
  ({ email }) =>
  async (dispatch) => {
    let usersRef = collection(db, "users");
    const singleUserQuery = query(usersRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
      const result = response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      });
      dispatch(setGeneralFields({ currentProfile: result }));
    });
  };

export const uploadProfileImage =
  ({
    currentImage,
    currentUserId,
    setModalOpen,
    setProgress,
    setCurrentImage,
  }) =>
  async (dispatch) => {
    const profilePicsRef = ref(storage, `profileImages/${currentImage.name}`);
    const uploadTask = uploadBytesResumable(profilePicsRef, currentImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(err);
      },
      async () => {
        const response = await getDownloadURL(uploadTask.snapshot.ref);
        await dispatch(
          editProfile({ payload: { avatar: response }, userID: currentUserId })
        );
        await setModalOpen(false);
        await setCurrentImage({});
        await setProgress(0);
      }
    );
  };

export const getAllUsers = () => async (dispatch) => {
  await onSnapshot(collection(db, "users"), (snapshot) => {
    const result = snapshot.docs.map((docs) => {
      return { ...docs.data(), id: docs.id };
    });
    dispatch(setGeneralFields({ allUsers: result }));
  });
};

export const addConnection =
  ({ userId, targetId }) =>
  async () => {
    try {
      let connectionToAdd = doc(
        collection(db, "connections"),
        `${userId}_${targetId}`
      );

      setDoc(connectionToAdd, { userId, targetId });

      toast.success("Connection Added!");
    } catch (err) {
      console.log(err);
    }
  };
export const getConnections =
  ({ userId, targetId, setIsConnected }) =>
  async () => {
    try {
      let connectionsQuery = query(
        collection(db, "connections"),
        where("targetId", "==", targetId)
      );

      onSnapshot(connectionsQuery, (snapshot) => {
        let connections = snapshot.docs.map((doc) => doc.data());

        const isConnected = connections.some(
          (connection) => connection.userId === userId
        );

        setIsConnected(isConnected);
      });
    } catch (err) {
      console.log(err);
    }
  };

export default generalSlice.reducer;
