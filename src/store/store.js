import { configureStore } from "@reduxjs/toolkit"
import currentUserSlice from "./currentUserSlice"
import selectedPodcastSlice from "./selectedPodcastSlice"
import videoIdSlice from "./videoIdSlice"


export const store = configureStore({
    reducer: {
        onePodcast: selectedPodcastSlice,
        currentUser: currentUserSlice,
        video: videoIdSlice
    }
})