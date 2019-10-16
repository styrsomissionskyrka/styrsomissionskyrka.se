import React from 'react';
import { Link } from 'gatsby';

const IndexPage = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <Link to="/page-2">Go to page 2</Link>
    </div>
  );
};

export default IndexPage;
