
import React from 'react';
import { Users, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RoleSelectionProps {
  onRoleSelect: (role: 'organizer' | 'guest') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/20">
            <Crown className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">EventSnap</h1>
          <p className="text-lg text-gray-300">¿Cuál es tu rol en el evento?</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          <Card 
            className="p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-gradient-to-r from-yellow-400/20 via-yellow-500/30 to-yellow-400/20 text-white cursor-pointer hover:bg-gradient-to-br hover:from-yellow-400/10 hover:via-yellow-500/15 hover:to-yellow-400/10 hover:border-yellow-400/40 transition-all duration-500 shadow-xl shadow-black/30"
            onClick={() => onRoleSelect('organizer')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Soy organizador</h3>
                <p className="text-gray-300 text-sm">Quiero crear y gestionar un evento</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-gradient-to-r from-yellow-400/20 via-yellow-500/30 to-yellow-400/20 text-white cursor-pointer hover:bg-gradient-to-br hover:from-yellow-400/10 hover:via-yellow-500/15 hover:to-yellow-400/10 hover:border-yellow-400/40 transition-all duration-500 shadow-xl shadow-black/30"
            onClick={() => onRoleSelect('guest')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-500 via-gray-600 via-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-lg shadow-gray-600/30">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white">Soy invitado</h3>
                <p className="text-gray-300 text-sm">Tengo un código para unirme a un evento</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
