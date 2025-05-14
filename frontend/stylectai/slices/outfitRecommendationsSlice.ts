import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    outfitRecommendations: [
  {
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    title: "Business Casual"
  },
  {
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    title: "Elegant Evening"
  },
  {
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    title: "Office Chic"
  },
],
};

const outfitRecommendationsSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addOutfitRecommendations: (state, action) => {
            state.outfitRecommendations = action.payload;
        },
        removeOutfitRecommendations: (state) => {
            state.outfitRecommendations = []
        }
    }
})

export const {addOutfitRecommendations, removeOutfitRecommendations} = outfitRecommendationsSlice.actions
export default outfitRecommendationsSlice.reducer;