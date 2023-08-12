import {createSlice} from "@reduxjs/toolkit"

export const searchSlice = createSlice({
    name:"search",
    initialState:{
        destination:"undefined",
        dates:[],
        options:{
            adult: "undefined",
            children:"undefined",
            room:"undefined"
        }

    },
    reducers:{
        update: (state,action) =>{
            state.destination = action.payload.destination;
            state.dates = action.payload.dates;
            state.options = action.payload.options;

        }
    }
})

export const {update} = searchSlice.actions;

export default searchSlice.reducer;