import React, { useState } from 'react';
import { Leaf, Timer, Music, MessageCircle, Settings, Users } from 'lucide-react';
import VirtualPet from './components/VirtualPet';
import StudyDashboard from './components/StudyDashboard';
import SocialFeatures from './components/SocialFeatures';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pet' | 'study' | 'social'>('pet');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center text-indigo-600">Virtual Pet Study Buddy</h1>
      </header>
      <main className="flex-grow p-4">
        {activeTab === 'pet' && <VirtualPet />}
        {activeTab === 'study' && <StudyDashboard />}
        {activeTab === 'social' && <SocialFeatures />}
      </main>
      <nav className="bg-white shadow-md p-4">
        <ul className="flex justify-around">
          <li>
            <button
              onClick={() => setActiveTab('pet')}
              className={`p-2 rounded-full ${activeTab === 'pet' ? 'bg-indigo-100' : ''}`}
            >
              <Leaf className="w-6 h-6 text-indigo-600" />
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('study')}
              className={`p-2 rounded-full ${activeTab === 'study' ? 'bg-indigo-100' : ''}`}
            >
              <Timer className="w-6 h-6 text-indigo-600" />
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('social')}
              className={`p-2 rounded-full ${activeTab === 'social' ? 'bg-indigo-100' : ''}`}
            >
              <Users className="w-6 h-6 text-indigo-600" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;