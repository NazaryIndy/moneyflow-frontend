import type { FC } from 'react';
import { Link } from 'react-router';

type NotFoundProps = {}

const NotFound: FC<NotFoundProps> = (props) => {
  const {} = props;

  return <div >

      <h1>404</h1>

      <p>Page not found</p>

      <Link to="/">Go Home</Link>

    </div>;
};

export { NotFound, type NotFoundProps };