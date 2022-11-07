import { Link } from 'react-router-dom';
import { ProductData } from '../store/product';

interface Props {
  page: string;
  fetchStatus: string;
  productData: ProductData[];
}

function SkeletonProduct() {
  return (
    <div className="card shadow-xl m-2">
      <figure className="h-72 bg-white">
        <img className="w-1/2 h-1/2 animate-pulse bg-slate-400 border-none" />
      </figure>
      <div className="card-body h-52">
        <h2 className="mb-4">
          <div className="h-6 mb-2 animate-pulse bg-slate-400"></div>
          <div className="h-6 w-3/4 animate-pulse bg-slate-400"></div>
        </h2>
        <div>
          <div className="h-4 w-1/4 animate-pulse bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}

function Product({ data }: { data: ProductData }) {
  return (
    <Link to={`/product/${data.id}`}>
      <div className="card shadow-xl m-2">
        <figure className="h-72 bg-white">
          <img
            src={data.image}
            alt={data.title}
            className="max-h-[70%] sm:w-1/2 hover:scale-110 ease-linear duration-200"
          />
        </figure>
        <div className="card-body h-52">
          <h2 className="card-title text-base">{data.title}</h2>
          <p>${data.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsResult({
  page,
  fetchStatus,
  productData,
}: Props) {
  switch (fetchStatus) {
    case 'loading':
      const ProductLimitCount = 4;
      return (
        <>
          {Array(ProductLimitCount)
            .fill(0)
            .map((item, index) => (
              <SkeletonProduct key={index} />
            ))}
        </>
      );
    case 'failed':
      return <div>죄송합니다. 현재 상품 정보를 불러올 수 없습니다.</div>;
    case 'fetched':
      return (
        <>
          {productData.map((productDatum, index) => {
            if (page === 'home' && index < 4) {
              return <Product key={productDatum.id} data={productDatum} />;
            } else if (page === 'category') {
              return <Product key={productDatum.id} data={productDatum} />;
            }
          })}
        </>
      );
    default:
      return <div></div>;
  }
}
