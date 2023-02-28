import { createSlice } from "@reduxjs/toolkit";


const INTITAL_STATE = {
    currentUser: null
};

const userSlice = createSlice(
    {
        name: 'user',
        initialState: INTITAL_STATE,
        reducers: {
            setCurrentUser(state, action) {
                state.currentUser = action.payload;
            }
        }
    }
)

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;