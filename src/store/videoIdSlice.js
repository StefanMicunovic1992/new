import { createSlice } from '@reduxjs/toolkit'

const initialState = { videoId:undefined}


export const videoIdSlice = createSlice({
    name: 'videoId',
    initialState,
    reducers: {
        setVideoId: (state, action) => {
            state.videoId = action.payload
        }
    }
})

export const { setVideoId } = videoIdSlice.actions;

export default videoIdSlice.reducer;