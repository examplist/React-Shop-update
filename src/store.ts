import { configureStore } from '@reduxjs/toolkit';
import productSlice from './store/product';
import cartSlice from './store/cart';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    productStore: productSlice.reducer,
    cartStore: cartSlice.reducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
