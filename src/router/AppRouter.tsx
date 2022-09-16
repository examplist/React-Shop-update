import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Category from '../pages/Category';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashion" element={<Category category="fashion" />} />
        <Route path="/digital" element={<Category category="digital" />} />
        <Route path="/accessory" element={<Category category="accessory" />} />
        <Route path="/product/:pid" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
