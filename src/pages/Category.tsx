import ProductList from '../components/ProductList';
import { categoryInKorean, CategoryFromHere } from '../store/product';

export default function Category({ category }: { category: CategoryFromHere }) {
  return (
    <section className="pl-6 pt-2">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>{categoryInKorean[category]}</li>
        </ul>
      </div>
      <ProductList page="category" category={category} />
    </section>
  );
}
