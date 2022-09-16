import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cart';
import CartItems from './CartItems';
import { CartState } from '../store/cart';
import { ProductState, ProductData } from '../store/product';

export default function CartList() {
  const products = useSelector((state: ProductState) => state.productStore.all);
  const cartItems = useSelector((state: CartState) => state.cartStore.items);
  const dispatch = useDispatch();

  let items: ProductData[] = [];
  let totalPrice = 0;

  Object.keys(cartItems).map((id) => {
    const product = products.find(
      (prod: ProductData) => prod.id === Number(id),
    );
    if (product) {
      items.push(product);
      totalPrice += product.price * cartItems[Number(id)].count;
    }
  });

  const buyAll = () => {
    dispatch(cartActions.buy());
  };

  return (
    <>
      <div className="lg:flex justify-between mb-20">
        <div>
          {items.map(({ image, id, price, title }) => (
            <CartItems
              image={image}
              id={id}
              key={id}
              price={price}
              title={title}
            />
          ))}
        </div>
        <div className="self-start shrink-0 flex items-center mt-10 mb-20">
          <span className="text-xl md:text-2xl">
            총 : ${totalPrice.toFixed(2)}
          </span>
          <label
            htmlFor="confirm-modal"
            className="modal-button btn btn-primary ml-5"
          >
            구매하기
          </label>
        </div>
      </div>
      <div>
        <input type="checkbox" id="confirm-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">정말로 구매하시겠습니까?</h3>
            <p className="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
            <div className="modal-action">
              <label
                htmlFor="confirm-modal"
                className="btn btn-primary"
                onClick={buyAll}
              >
                네
              </label>
              <label htmlFor="confirm-modal" className="btn btn-outline">
                아니오
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
