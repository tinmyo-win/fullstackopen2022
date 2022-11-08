import { createSlice } from "@reduxjs/toolkit";

const initialState = []
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        appendBlog(state, action) {
            return state.concat(action.payload)
        },
        addBlogs (state, action) {
            return action.payload
        }
    }
})

export const { appendBlog, addBlogs } = blogSlice.actions

export default blogSlice.reducer