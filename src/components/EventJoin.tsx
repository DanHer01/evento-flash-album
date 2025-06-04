
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/20">
            <Camera className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">EventSnap</h1>
          <p className="text-lg text-gray-300">Captura y comparte momentos únicos</p>
        </div>

        {/* Join Card */}
        <Card className="p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-yellow-400/20 text-white shadow-2xl shadow-black/40">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Únete al evento</h2>
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
                  className="bg-gradient-to-r from-black/50 via-black/60 to-black/50 border-yellow-400/30 text-white placeholder:text-gray-500 focus:border-yellow-400 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tu nombre</label>
                <Input
                  type="text"
                  placeholder="María García"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gradient-to-r from-black/50 via-black/60 to-black/50 border-yellow-400/30 text-white placeholder:text-gray-500 focus:border-yellow-400 transition-all duration-300"
                />
              </div>

              <Button
                onClick={handleJoin}
                disabled={!eventCode.trim() || !userName.trim()}
                className="w-full bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:via-yellow-500 hover:via-yellow-600 hover:to-yellow-700 font-semibold py-3 shadow-lg shadow-yellow-400/30 transition-all duration-500"
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
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30">
              <Camera className="w-6 h-6 text-black" />
            </div>
            <p className="text-sm font-medium text-gray-300">Fotos en vivo</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30">
              <Users className="w-6 h-6 text-black" />
            </div>
            <p className="text-sm font-medium text-gray-300">Álbum compartido</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30">
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
