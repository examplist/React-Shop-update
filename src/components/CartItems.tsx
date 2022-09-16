import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions, CartState } from '../store/cart';
import { ProductData } from '../store/product';

type Props = Pick<ProductData, 'id' | 'image' | 'price' | 'title'>;

export default function CartItems({ image, id, price, title }: Props) {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(
    (state: CartState) => state.cartStore.items[id].count,
  );

  const reduceFromCart = () => {
    dispatch(cartActions.removeCart({ id }));
  };

  const addToCart = () => {
    dispatch(cartActions.addCart({ id }));
  };

  return (
    <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
      <Link to={'/product/' + id}>
        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
          <img
            src={image}
            alt="상품 이미지"
            className="object-contain w-full h-48"
          />
        </figure>
      </Link>
      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">{title}</h2>
        <p className="mt-2 mb-4 text-3xl">
          ${(price * cartItemCount).toFixed(2)}
        </p>
        <div className="card-actions">
          <div className="btn-group">
            <button className="btn btn-primary" onClick={reduceFromCart}>
              -
            </button>
            <button className="btn btn-ghost no-animation">
              {cartItemCount}
            </button>
            <button className="btn btn-primary" onClick={addToCart}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
