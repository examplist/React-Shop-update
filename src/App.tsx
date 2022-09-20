import { useAppDispatch } from './store';
import { fetchProducts } from './store/product';
import { createContext, useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

interface Theme {
  theme: string;
  setTheme: (theme: string) => void;
}
export const themeContext = createContext<Theme>({
  theme: '',
  setTheme: (theme) => {},
});

export const headerHeight = 64;
export const footerHeight = 288;

export default function App() {
  // prduct data를 store로 보내기
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // 라이트모드, 다크모드 관리
  const [theme, setTheme] = useState<string>('light');

  // main의 height가 작아서 footer가 올라 오는 것 방지
  const mainHeight = {
    minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
  };

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>
        <BrowserRouter>
          <Header />
          <main style={mainHeight}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/fashion"
                element={<Category category="fashion" />}
              />
              <Route
                path="/digital"
                element={<Category category="digital" />}
              />
              <Route
                path="/accessory"
                element={<Category category="accessory" />}
              />
              <Route path="/product/:pid" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </themeContext.Provider>
  );
}
