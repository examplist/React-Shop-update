import { createSlice } from '@reduxjs/toolkit';

export interface CartItems {
  id: number;
  count: number;
}

export interface CartState {
  cartStore: {
    items: Record<number, CartItems>;
    totalCount: number;
  };
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {} as Record<number, CartItems>,
    totalCount: 0 as number,
  },
  reducers: {
    addCart: (state, action) => {
      if (state.items[action.payload.id]) {
        state.items[action.payload.id].count++;
      } else {
        state.items[action.payload.id] = {
          id: action.payload.id,
          count: 1,
        };
      }
      state.totalCount++;
    },
    removeCart: (state, action) => {
      state.items[action.payload.id].count--;
      state.totalCount--;
      if (state.items[action.payload.id].count === 0)
        delete state.items[action.payload.id];
    },
    buy: (state) => {
      state.items = {};
      state.totalCount = 0;
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
