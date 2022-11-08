import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notiSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addAnecdoteNotification(state, action) {
            return action.payload
        },

        voteNotification(state, action) {
            return action.payload
        },

        clearNotification(state, action) {
            return initialState
        }
    }
})

export const createAnecdoteNotification = (notification, timeToShow) => {
    return async dispatch => {
        dispatch(addAnecdoteNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, Number(timeToShow)*1000)
    }
}

export const addVoteNotification = (notification, timeToShow) => {
    return async dispatch => {
        dispatch(voteNotification(notification))
        var timer
        const startTimer = () => {
            timer = setTimeout(() => {
                dispatch(clearNotification())
            }, Number(timeToShow)*1000)

            let timerId = timer - 2 //preivious timeId is less than present timeId
            clearTimeout(timerId)
            console.log(timerId)
            
        } 
        startTimer()
    }

}

export const { addAnecdoteNotification, voteNotification, clearNotification } = notiSlice.actions

export default notiSlice.reducer