import Carousel from '../components/Carousel';
import ProductsContainer from '../components/ProductsContainer';

export default function Home() {
  return (
    <section>
      <Carousel />
      <ProductsContainer page="home" category="fashion" />
      <ProductsContainer page="home" category="accessory" />
      <ProductsContainer page="home" category="digital" />
    </section>
  );
}
