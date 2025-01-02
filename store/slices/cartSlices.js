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
    },
    removeShoesFromCart: (state,action) => {
      const shoesToRemove = state.shoes.find(shoes => shoes.id === action.payload.id);
      state.shoes = state.shoes.filter(shoes => shoes.id !== shoesToRemove.id);
      state.totalAmount -= shoesToRemove.price * shoesToRemove.quantity;
    },
    increaseQuantity: (state, action) => {
      const index = state.shoes.indexOf(state.shoes.find(shoes => shoes.id === action.payload.id));
      state.shoes[index].quantity += 1;
      state.totalAmount += state.shoes[index].price;
    },
    decreaseQuantity: (state, action) => {
      const index = state.shoes.indexOf(state.shoes.find(shoes => shoes.id === action.payload.id));

      if (state.shoes[index].quantity > 1) {
        state.shoes[index].quantity -= 1;
        state.totalAmount -= state.shoes[index].price;
      }
    },
  }
});

export const { addShoesToCart, removeShoesFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;