import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-9xl p-4">404</h1>
      <p className="text-3xl p-4">
        죄송합니다. 현재 요청하신 페이지는 없는 페이지입니다.
      </p>
      <Link to="/" className="btn btn-primary">
        메인으로
      </Link>
    </div>
  );
}
