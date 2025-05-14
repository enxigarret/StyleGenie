import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    uploadedImage: "",
};

const uploadedImageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addUploadedImage: (state, action) => {
            state.uploadedImage = action.payload;
        },
        removeUploadedImage: (state) => {
            state.uploadedImage = ""
        }
    }
})

export const {addUploadedImage, removeUploadedImage} = uploadedImageSlice.actions
export default uploadedImageSlice.reducer;