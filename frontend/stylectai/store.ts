import { configureStore } from '@reduxjs/toolkit'
import singleRecommendationsReducer from "./slices/singleRecommendationsSlice"
import outfitRecommendationsReducer from "./slices/outfitRecommendationsSlice"
import uploadedImageReducer from "./slices/uploadedImageSlice"
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    singleRecommendations: singleRecommendationsReducer,
    outfitRecommendations: outfitRecommendationsReducer,
    uploadedImage: uploadedImageReducer
  },
})

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch