import React from 'react';
import ShelfForm from '../ShelfForm/ShelfForm';
import ShelfList from '../ShelfList/ShelfList';

function ShelfPage() {
  return (
    <div className="container">

      <ShelfForm />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ShelfList />
    </div>
  );
}

export default ShelfPage;
