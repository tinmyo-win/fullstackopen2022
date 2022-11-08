import anecdoteReducer from './anecdoteReducer'
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store