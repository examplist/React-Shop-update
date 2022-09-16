import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { cartActions } from '../store/cart';
import { categoryInKorean, State } from '../store/product';

function Stars({ rate, standard }: { rate: number; standard: number }) {
  const totalHalfStars = standard * 2;
  const starElements = [];

  function Star({
    side,
    checked,
  }: {
    side: 'mask-half-1' | 'mask-half-2';
    checked: boolean;
  }) {
    return (
      <input
        type="radio"
        name="rating-10"
        className={`bg-yellow-400 cursor-default mask mask-star-2 ${side}`}
        disabled
        checked={checked}
      />
    );
  }

  for (let i = 0; i < totalHalfStars; i++) {
    const side = i % 2 === 0 ? 'mask-half-1' : 'mask-half-2';
    const checked = Math.floor(rate * 2) - 1 === i ? true : false;

    starElements.push(<Star key={i} side={side} checked={checked} />);
  }

  return (
    <div className="rating rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      {starElements}
    </div>
  );
}

function Loading() {
  return <div className="h-56 animate-pulse bg-slate-400"></div>;
}

function Fetched() {
  const id = Number(useParams().pid);
  const { category, title, description, image, rating, price } = useSelector(
    (state: State) => state.productStore.all[id - 1],
  );

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(cartActions.addCart({ id }));
  };

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>{categoryInKorean[category]}</li>
          <li>{title}</li>
        </ul>
      </div>

      <div className="md:flex md:items-center mt-6">
        <figure className="flex-shrink-0 rounded-2xl bg-white">
          {/* <img src={image} alt={title} className="object-contain w-full h-72" /> */}
          <img src={image} alt={title} className="h-72 mx-auto" />
        </figure>
        <div className="card-body px-1 md:px-12">
          <h2 className="card-title">
            {title}
            <span className="badge badge-accent ml-2">NEW</span>
          </h2>
          <p>{description}</p>
          <div className="flex items-center mt-3">
            <Stars rate={rating.rate} standard={5} />
            <div className="ml-2">
              {rating.rate} / {rating.count} 참여
            </div>
          </div>
          <p className="mt-2 mb-4 text-3xl">${price}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={addToCart}>
              장바구니에 담기
            </button>
            <Link className="btn btn-outline ml-1" to={'/cart'}>
              장바구니로 이동
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Product() {
  const fetchStatus = useSelector(
    (state: State) => state.productStore.fetchStatus,
  );

  function returnByStatus() {
    switch (fetchStatus) {
      case 'loading':
        return <Loading />;
      case 'failed':
        return (
          <div className="text-center mt-8">
            죄송합니다. 현재 상품 정보를 불러올 수 없습니다.
          </div>
        );
      case 'fetched':
        return <Fetched />;
      default:
        return <div></div>;
    }
  }

  return <div className="px-6 py-2">{returnByStatus()}</div>;
}
