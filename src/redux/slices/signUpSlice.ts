import { createSlice } from "@reduxjs/toolkit";

interface SignUpState {
  isSignUp: boolean;
}
const initialState: SignUpState = {
  isSignUp: true,
};
export const SignUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload;
    },
  },
});

export default SignUpSlice.reducer;
export const { setIsSignUp } = SignUpSlice.actions;
