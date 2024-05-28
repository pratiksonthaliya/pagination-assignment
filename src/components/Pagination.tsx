// src/components/Pagination.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  ID: string;
  JobTitle: string;
  EmailAddress: string;
  FirstNameLastName: string;
  Email: string;
  Phone: string;
  Company: string;
}

const Pagination: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentStartId, setCurrentStartId] = useState(1);
  const [page, setPage] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  const fetchUsers = async (startId: number) => {
    try {
      const response = await axios.get(`https://give-me-users-forever.vercel.app/api/users/${startId}/next`);
      const fetchedUsers = response.data.users;
      setUsers(fetchedUsers);
      setHasMoreUsers(fetchedUsers.length === 10); // Assuming the API returns up to 10 users
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setHasMoreUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentStartId);
  }, [currentStartId]);

  const handleNext = () => {
    if (hasMoreUsers) {
      const nextStartId = parseInt(users[users.length - 1]?.ID, 10) + 1;
      setCurrentStartId(nextStartId);
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      const previousStartId = parseInt(users[0]?.ID, 10) - 10;
      setCurrentStartId(previousStartId > 0 ? previousStartId : 1);
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col items-center text-white dark:text-gray-300">
      <ul className="list-none p-0 mb-4 w-full max-w-2xl">
        {users.map(user => (
          <li
            key={user.ID}
            className="mb-4 p-6 border border-gray-700 rounded-xl shadow-lg bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 transition-colors duration-300"
          >
            <h2 className="text-xl font-bold mb-2">{user.FirstNameLastName}</h2>
            <p className="mb-1"><span className="font-semibold">Job Title:</span> {user.JobTitle}</p>
            <p className="mb-1"><span className="font-semibold">Email:</span> {user.Email}</p>
            <p className="mb-1"><span className="font-semibold">Phone:</span> {user.Phone}</p>
            <p className="mb-1"><span className="font-semibold">Company:</span> {user.Company}</p>
          </li>
        ))}
      </ul>
      <div className="pagination-buttons flex space-x-4 mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors duration-300"
        >
          Previous
        </button>
        <span className="pagination-info text-lg">Page {page}</span>
        <button
          onClick={handleNext}
          disabled={!hasMoreUsers}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
