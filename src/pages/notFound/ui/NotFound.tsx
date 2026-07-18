import type { FC } from 'react';
import { Link } from 'react-router';

const NotFound: FC = () => {
  return (
    <div>
      <h1>404</h1>

      <p>Page not found</p>

      <Link to="/">Go Home</Link>
    </div>
  );
};

export { NotFound };
