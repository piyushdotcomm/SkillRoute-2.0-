import React from 'react';
import { useAuth } from '../App.jsx';

export default function Profile(){
  const { user } = useAuth();
  if (!user) return <p>Not logged in.</p>;
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="card flex items-center gap-4">
        {user.photoURL && <img src={user.photoURL} className="w-20 h-20 rounded-full object-cover" alt="avatar" />}
        <div>
          <h2 className="h2 mb-1 text-lg">{user.name || 'Your Profile'}</h2>
          <p className="text-softText text-sm">{user.email}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4">
          <h3 className="font-semibold mb-2 text-sm tracking-wide">Account</h3>
          <ul className="text-xs space-y-1">
            <li><span className="font-medium">Provider:</span> Google</li>
            <li><span className="font-medium">Status:</span> Active</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2 text-sm tracking-wide">Next Step</h3>
          <p className="text-xs text-softText">Take the quiz to generate personalized recommendations or chat with the AI for quick guidance.</p>
        </div>
      </div>
    </div>
  );
}
