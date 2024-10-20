import React from 'react';
import { Users, MessageCircle, Video } from 'lucide-react';

const SocialFeatures: React.FC = () => {
  const onlineUsers = [
    { id: 1, name: 'Alice', status: 'Studying' },
    { id: 2, name: 'Bob', status: 'Available' },
    { id: 3, name: 'Charlie', status: 'Busy' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Study Buddies</h2>
      <ul className="space-y-4 mb-6">
        {onlineUsers.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-semibold">{user.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.status}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">
        <Users className="w-5 h-5 inline-block mr-2" />
        Find Study Partners
      </button>
    </div>
  );
};

export default SocialFeatures;