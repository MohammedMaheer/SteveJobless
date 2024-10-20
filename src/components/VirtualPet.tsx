import React, { useState, useEffect } from 'react';
import { Heart, Coffee, MessageCircle, Gamepad, Image, Edit2 } from 'lucide-react';

const VirtualPet: React.FC = () => {
  const [happiness, setHappiness] = useState(50);
  const [hunger, setHunger] = useState(50);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1545529468-42764ef8c85f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80");
  const [petName, setPetName] = useState("Buddy");
  const [isEditingName, setIsEditingName] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientY / window.innerHeight - 0.5) * 20;
      const y = -(e.clientX / window.innerWidth - 0.5) * 20;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const feed = () => {
    setHunger(Math.min(100, hunger + 10));
    setHappiness(Math.min(100, happiness + 5));
  };

  const play = () => {
    setHappiness(Math.min(100, happiness + 15));
    setHunger(Math.max(0, hunger - 5));
  };

  const presetAvatars = [
    "https://images.unsplash.com/photo-1545529468-42764ef8c85f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  ];

  const AvatarModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Choose an Avatar</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {presetAvatars.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Avatar ${index + 1}`}
              className="w-24 h-24 object-cover rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-transform transform hover:scale-105"
              onClick={() => {
                setAvatarUrl(url);
                setShowAvatarModal(false);
              }}
            />
          ))}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter custom image URL"
            className="w-full p-2 border rounded"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setAvatarUrl(e.currentTarget.value);
                setShowAvatarModal(false);
              }
            }}
          />
        </div>
        <button
          onClick={() => setShowAvatarModal(false)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto perspective-1000"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="mb-6 text-center relative">
        <img
          src={avatarUrl}
          alt="Virtual Pet"
          className="w-48 h-48 rounded-full mx-auto mb-4 object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setShowAvatarModal(true)}
          className="absolute bottom-0 right-1/2 transform translate-x-16 translate-y-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
        >
          <Image className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-center">
          {isEditingName ? (
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') setIsEditingName(false);
              }}
              className="text-2xl font-bold text-indigo-600 text-center border-b-2 border-indigo-600 focus:outline-none"
              autoFocus
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-indigo-600 mr-2">{petName}</h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-around mb-6">
        <div className="text-center transform hover:scale-110 transition-transform">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="font-semibold">Happiness: {happiness}%</p>
        </div>
        <div className="text-center transform hover:scale-110 transition-transform">
          <Coffee className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="font-semibold">Hunger: {hunger}%</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={feed}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Feed
        </button>
        <button
          onClick={play}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Play
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 ease-in-out">
          <MessageCircle className="w-5 h-5 inline-block mr-2" />
          Chat
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 ease-in-out">
          <Gamepad className="w-5 h-5 inline-block mr-2" />
          Mini-games
        </button>
      </div>
      {showAvatarModal && <AvatarModal />}
    </div>
  );
};

export default VirtualPet;