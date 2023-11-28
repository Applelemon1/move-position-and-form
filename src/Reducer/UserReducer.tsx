import { createSlice } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') || '{}')
  :[];

const userSlice = createSlice({
    name: 'users',
    initialState:persistedState,
    reducers:{
        addUser : (state,action) =>{
            console.log('addUser action',action)
            state.push(action.payload)

        },
        deleteUSer:(state,action)=> {
            console.log('deleteUSer action',action)
            const{key} = action.payload
            const uu = state.find((user : any) => user.key == key)
            if (uu) return state.filter( (f: any) => f.key !== key)
        },
        updateUser : (state,action)=> {
            console.log('updateUser action',action)
            const {key , name,sex,phone,national} = action.payload
            const uu = state.find((user: any) => user.key == key)
            if(uu){
                uu.name = name;
                uu.sex = sex;
                uu.phone = phone;
                uu.national = national;
            }
        }
    }
})


export const { addUser,deleteUSer,updateUser } = userSlice.actions
export default userSlice.reducer