import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    successNotification: null,
    errorNotification: null
}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addSuccessNotification(state, action) {
            state.successNotification = action.payload
            return state
        },
        removeSuccessNotification(state, action) {
            state.successNotification = null
            return state
        },
        addErrorNotificaton(state, action) {
            state.errorNotification = action.payload
            return state
        },
        removeErrorNotification(state, action) {
            state.errorNotification = null
            return state
        }
    }
})

export const { 
    addSuccessNotification,
    removeSuccessNotification,
    addErrorNotificaton,
    removeErrorNotification } = notificationSlice.actions

export default notificationSlice.reducer