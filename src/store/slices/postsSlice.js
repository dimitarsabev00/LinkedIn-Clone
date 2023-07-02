/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { auth, db, storage } from "../../configs/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  where,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";
const initialState = {
  posts: [],
};
export const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    setPostsFields: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setPostsFields } = postsSlice.actions;

// here write actions

export const createPost =
  ({ payload, onSuccess }) =>
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
                email: payload?.user?.[0]?.email,
                fullName: payload?.user?.[0]?.name,
                createdAt: moment().format("DD/MM/YYYY"),
                avatar: payload?.user?.[0]?.avatar,
                id: payload?.user?.[0]?.userID,
              },
              video: payload?.video,
              sharedImage: downloadURL,
              comments: 0,
              description: payload?.description,
            });
          }
        );
        toast.success("Post has been added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else if (payload?.video !== "") {
        await addDoc(collection(db, "posts"), {
          author: {
            email: payload?.user?.[0]?.email,
            fullName: payload?.user?.[0]?.name,
            createdAt: moment().format("DD/MM/YYYY"),
            avatar: payload?.user?.[0]?.avatar,
            id: payload?.user?.[0]?.userID,
          },
          video: payload?.video,
          sharedImage: "",
          comments: 0,
          description: payload?.description,
        });
        toast.success("Post has been added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        await addDoc(collection(db, "posts"), {
          author: {
            email: payload?.user?.[0]?.email,
            fullName: payload?.user?.[0]?.name,
            createdAt: moment().format("DD/MM/YYYY"),
            avatar: payload?.user?.[0]?.avatar,
            id: payload?.user?.[0]?.userID,
          },
          video: payload?.video,
          sharedImage: "",
          comments: 0,
          description: payload?.description,
        });
        toast.success("Post has been added successfully!");
        if (onSuccess) {
          onSuccess();
        }
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
      dispatch(setPostsFields({ posts: payload }));
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostsForSingleUser =
  ({ id }) =>
  async (dispatch) => {
    let postsRef = collection(db, "posts");
    const singlePostQuery = query(postsRef, where("id", "==", id));
    onSnapshot(singlePostQuery, (response) => {
      const result = response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      });
      dispatch(setPostsFields({ posts: result }));
    });
  };

export const likePost =
  ({ userId, postId, liked }) =>
  async () => {
    try {
      const docToLike = doc(collection(db, "likes"), `${userId}_${postId}`);
      if (liked) {
        deleteDoc(docToLike);
      } else {
        setDoc(docToLike, { userId, postId });
      }
    } catch (err) {
      console.log(err);
    }
  };
export const getLikesByUser =
  ({ userId, postId, setLiked, setLikesCount }) =>
  async () => {
    try {
      let likeQuery = query(
        collection(db, "likes"),
        where("postId", "==", postId)
      );

      onSnapshot(likeQuery, (snapshot) => {
        let likes = snapshot.docs.map((doc) => doc.data());
        let likesCount = likes?.length;

        const isLiked = likes.some((like) => like.userId === userId);

        setLikesCount(likesCount);
        setLiked(isLiked);
      });
    } catch (err) {
      console.log(err);
    }
  };
export const deletePost =
  ({ postId }) =>
  async () => {
    try {
      await deleteDoc(doc(collection(db, "posts"), postId));
      toast.success("Post has been Deleted!");
    } catch (err) {
      console.log(err);
    }
  };
export const updatePost =
  ({ postId, description, onSuccess }) =>
  async () => {
    try {
      updateDoc(doc(collection(db, "posts"), postId), { description });
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Post has been updated!");
    } catch (err) {
      console.log(err);
    }
  };
export const addedCommentForSinglePost =
  ({ postId, comment, displayNameUser }) =>
  async () => {
    try {
      addDoc(collection(db, "comments"), {
        postId,
        comment,
        createdAt: moment().format("DD/MM/YYYY"),
        displayNameUser,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const getCommentsForSinglePost =
  ({ postId, setComments }) =>
  async () => {
    try {
      let singlePostQuery = query(
        collection(db, "comments"),
        where("postId", "==", postId)
      );

      onSnapshot(singlePostQuery, (snapshot) => {
        const comments = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setComments(comments);
      });
    } catch (err) {
      console.log(err);
    }
  };

export default postsSlice.reducer;
