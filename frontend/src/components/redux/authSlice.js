import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name:"auth",
    initialState:{
       user: localStorage.getItem("user") || null,
       loading:false,
       error:false,
       message:""

    },
    reducers:{
        loginStart:(state) =>{
            state.loading = true;
        },
        loginSuccess:(state,action) =>{
            state.user = action.payload;
            state.loading = false;


        },
        loginError:(state)=>{
            state.error = true;
            state.message = state.error===true?"User not found...Please Login again " : "User found successfully"

        },
        logOut:(state)=>{
            state.user = null
            // state.loading = false,
            // state.error = false

        },
    }
})

export const {loginStart,loginSuccess,loginError,logOut} = authSlice.actions;

export default authSlice.reducer;