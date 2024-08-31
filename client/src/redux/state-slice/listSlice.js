import {createSlice} from '@reduxjs/toolkit'

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        Total: 0,
        ListItem: []
    },

    reducers: {
        SetTotal: (state, action) => {
            state.Total = action.payload
        },
        SetListItem: (state, action) => {
            state.ListItem = action.payload
        }
    }
})

export const {SetTotal,SetListItem} = listSlice.actions;
export default listSlice.reducer;
