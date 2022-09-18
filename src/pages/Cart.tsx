import { useSelector } from 'react-redux';
import CartEmpty from '../components/CartEmpty';
import CartList from '../components/CartList';
import { CartState } from '../store/cart';

export default function Cart() {
  const cartItemsCount = useSelector(
    (state: CartState) => state.cartStore.totalCount,
  );

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>장바구니</li>
        </ul>
      </div>
      {cartItemsCount === 0 ? <CartEmpty /> : <CartList />}
    </section>
  );
}
