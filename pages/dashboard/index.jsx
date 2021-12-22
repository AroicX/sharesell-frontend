import React from 'react';
import useAuth from 'hooks/useAuth';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h3>Dashboard Screen</h3>
    </div>
  );
};

export default useAuth(Dashboard);
