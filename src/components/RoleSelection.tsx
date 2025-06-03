
import React from 'react';
import { Users, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RoleSelectionProps {
  onRoleSelect: (role: 'organizer' | 'guest') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Crown className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold">EventSnap</h1>
          <p className="text-lg opacity-90">¿Cuál es tu rol en el evento?</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          <Card 
            className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-200"
            onClick={() => onRoleSelect('organizer')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Soy organizador</h3>
                <p className="opacity-80 text-sm">Quiero crear y gestionar un evento</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-200"
            onClick={() => onRoleSelect('guest')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Soy invitado</h3>
                <p className="opacity-80 text-sm">Tengo un código para unirme a un evento</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
