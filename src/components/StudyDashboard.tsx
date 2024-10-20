import React, { useState, useEffect } from 'react';
import { Timer, Music, Leaf } from 'lucide-react';

const StudyDashboard: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [plantHealth, setPlantHealth] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (time % 60 === 0) {
          setPlantHealth((prevHealth) => Math.min(100, prevHealth + 1));
        }
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <Timer className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-indigo-600">{formatTime(time)}</h2>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded-full font-semibold ${
            isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded-full bg-gray-300 text-gray-700 font-semibold"
        >
          Reset
        </button>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Focus Level</span>
          <span className="text-sm font-medium text-indigo-600">{plantHealth}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${plantHealth}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <Leaf className={`w-8 h-8 ${plantHealth > 50 ? 'text-green-500' : 'text-yellow-500'}`} />
        <Music className="w-8 h-8 text-indigo-600" />
      </div>
    </div>
  );
};

export default StudyDashboard;