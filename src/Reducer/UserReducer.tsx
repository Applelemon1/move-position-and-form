import { createSlice,current } from "@reduxjs/toolkit";


const data : any = [];
// const initialState={
//     // @ts-ignore

//     users: JSON.parse(localStorage?.getItem('users')) 
// }

const userSlice = createSlice({
    name: 'users',
    initialState:data,
    reducers:{
        addUser : (state,action) =>{
            console.log('addUser action',action)
            state.push(action.payload)
            // let userData = JSON.stringify(current(state.users));
            // localStorage.setItem('users',userData)
        },
        deleteUSer:(state,action)=> {
            console.log('deleteUSer action',action)
            const{id} = action.payload
            const uu = state.find((user : any) => user.id == id)
            if (uu) return state.filter( (f: any) => f.id !== id)
        },
        updateUser : (state,action)=> {
            console.log('updateUser action',action)
            const {id , name,sex,phone,national} = action.payload
            const uu = state.find((user: any) => user.id == id)
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