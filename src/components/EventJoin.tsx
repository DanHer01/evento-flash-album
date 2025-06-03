
import React, { useState } from 'react';
import { Camera, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface EventJoinProps {
  onJoinEvent: (eventCode: string, userName: string) => void;
}

const EventJoin = ({ onJoinEvent }: EventJoinProps) => {
  const [eventCode, setEventCode] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoin = () => {
    if (eventCode.trim() && userName.trim()) {
      onJoinEvent(eventCode.trim(), userName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
            <Camera className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">EventSnap</h1>
          <p className="text-lg text-gray-300">Captura y comparte momentos únicos</p>
        </div>

        {/* Join Card */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-yellow-400/20 text-white shadow-xl">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2 text-yellow-400">Únete al evento</h2>
              <p className="text-gray-300">Ingresa el código del evento y tu nombre</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Código del evento</label>
                <Input
                  type="text"
                  placeholder="BODA2024"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                  className="bg-black/50 border-yellow-400/30 text-white placeholder:text-gray-500 focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tu nombre</label>
                <Input
                  type="text"
                  placeholder="María García"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-black/50 border-yellow-400/30 text-white placeholder:text-gray-500 focus:border-yellow-400"
                />
              </div>

              <Button
                onClick={handleJoin}
                disabled={!eventCode.trim() || !userName.trim()}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 font-semibold py-3 shadow-lg transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Unirse al evento
              </Button>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-white">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-6 h-6 text-black" />
            </div>
            <p className="text-sm font-medium text-gray-300">Fotos en vivo</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-black" />
            </div>
            <p className="text-sm font-medium text-gray-300">Álbum compartido</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-black" />
            </div>
            <p className="text-sm font-medium text-gray-300">Retos divertidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventJoin;
