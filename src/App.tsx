// src/App.tsx
import React from 'react';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">User Pagination</h1>
      <Pagination />
    </div>
  );
};

export default App;
