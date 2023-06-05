import { createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
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

export default generalSlice.reducer;
