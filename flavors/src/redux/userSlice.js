import { createSlice } from '@reduxjs/toolkit';

const demo_user = { // demo payload
  user_id: 1,
  user_title: "Mr.",
  user_name: "M. Lakshan",
  user_email: "samplemail@gmail.com",
  user_mobile: 771234567,
  user_status: "active"
}

const initialState = {
  // user: null,
  user: demo_user,
  favorites: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      /*
      state.user = action.payload; // set the logged in user obj
      */
      state.user = demo_user; // demo payload
    },
    logoutUser: (state) => {
      state.user = null; // discard the existing user obj
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
