import {createSlice} from "@reduxjs/toolkit"

export const hotelSlice = createSlice({
    name:"hotel",
    initialState:{
        hotelName:"",
        type:"",
        city:"",
        address:"",
        distance:"",
        photos:[""],
        title:"",
        desc:"",
        rating:0,
        rooms:[],
        cheapestPrice:0,
        featured:false
    },
    reducers:{

        updateHotel: (state,action) =>{
            state.hotelName = action.payload?.hotelName;
            state.type = action.payload?.type;
            state.city = action.payload?.city;
            state.address = action.payload?.address;
            state.distance = action.payload?.distance;
            state.title = action.payload?.title;
            state.desc = action.payload?.desc;
            state.rating = action.payload?.rating;
            state.rooms = action.payload?.rooms;
            state.cheapestPrice = action.payload?.cheapestPrice;
            state.featured = action.payload?.featured;

        },
        updateHotelImg:(state,action) =>{
            state.photos = action.payload?.photos;

        }

    }
})

export const {updateHotel,updateHotelImg} = hotelSlice.actions;

export default hotelSlice.reducer;