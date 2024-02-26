
import React from 'react';
import { CreateBtn } from './buttons';
import '../index.css';
import '../App.css';

const TableHeader = ({ handler, columns }) => {

  return (
    <>
      <thead>
        <tr>
          <th scope="col" className="buttons-cell">
            <CreateBtn onClick={handler} />
          </th>
          {columns.map(c => <th scope="col" className="py-3 px-6">{c}</th>)}
        </tr>
      </thead>
    </>
  );

};

export default TableHeader;
