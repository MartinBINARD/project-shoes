import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoes: [],
  totalAmount: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addShoesToCart: (state, action) => {
      state.shoes = [...state.shoes, action.payload];
      state.totalAmount += action.payload.price;
    }
  }
});

export const { addShoesToCart } = cartSlice.actions;
export default cartSlice.reducer;