import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    singleRecommendations: [
  {
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: "75€",
    name: "Burgundy Handbag",
    link: "",
    brand: "Burgundy",
    description: "",
    gender: "women",
    chunk: 1,
    id: 1
  },
  {
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: "125€",
    name: "Golden Watch",
    link: "",
    brand: "TISSOT",
    description: "",
    gender: "women",
    chunk: 1,
    id: 1
  },
  {
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: "40€",
    name: "Gray Trousers",
    link: "",
    brand: "",
    description: "",
    gender: "women",
    chunk: 1,
    id: 1
  },
  {
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: "55€",
    name: "Red High Heels",
    link: "",
    brand: "",
    description: "",
    gender: "women",
    chunk: 1,
    id: 1
  },
  {
    image: "https://images.unsplash.com/photo-1551048632-8df86522cee4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: "30€",
    name: "White Blouse",
    link: "",
    brand: "",
    description: "",
    gender: "women",
    chunk: 1,
    id: 1
  },
  {
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: "15€",
    name: "Red Lipstick",
    link: "",
    brand: "",
    description: "",
    gender: "women",
    chunk: 1,
    id: 1
  },
],
};

const singleRecommendationsSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addSingleRecommendations: (state, action) => {
            state.singleRecommendations = action.payload;
        },
        removeSingleRecommendations: (state) => {
            state.singleRecommendations = []
        }
    }
})

export const {addSingleRecommendations, removeSingleRecommendations} = singleRecommendationsSlice.actions
export default singleRecommendationsSlice.reducer;