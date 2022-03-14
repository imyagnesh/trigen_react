import React, { memo } from 'react';

const Child1 = ({ user }) => (
  <div>
    <h1>Child 1 Componnet</h1>
    <h2>Name: {user.name}</h2>
    <h3>Age: {user.age}</h3>
  </div>
);

export default memo(Child1);
