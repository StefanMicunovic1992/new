import { createSlice } from '@reduxjs/toolkit'

const initialState = { selectedPodcast: [] }


export const selectedPodcastSlice = createSlice({
    name: 'selectedPodcast',
    initialState,
    reducers: {
        setIdOfSelectedPodcast: (state, action) => {
            state.selectedPodcast = action.payload
        }
    }
})

export const { setIdOfSelectedPodcast } = selectedPodcastSlice.actions;

export default selectedPodcastSlice.reducer;