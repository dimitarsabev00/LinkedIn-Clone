import { createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../configs/firebase";

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
export default generalSlice.reducer;
