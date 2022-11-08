import { createSlice } from "@reduxjs/toolkit";
 
const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdote(state, action) {
            const filterWord = action.payload
            return filterWord
        }
    }

})

export const { filterAnecdote } = filterSlice.actions

export default filterSlice.reducer