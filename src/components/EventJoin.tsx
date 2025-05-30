
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
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Camera className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold">EventSnap</h1>
          <p className="text-lg opacity-90">Captura y comparte momentos únicos</p>
        </div>

        {/* Join Card */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Únete al evento</h2>
              <p className="opacity-80">Ingresa el código del evento y tu nombre</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Código del evento</label>
                <Input
                  type="text"
                  placeholder="BODA2024"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tu nombre</label>
                <Input
                  type="text"
                  placeholder="María García"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <Button
                onClick={handleJoin}
                disabled={!eventCode.trim() || !userName.trim()}
                className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3"
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
            <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium">Fotos en vivo</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium">Álbum compartido</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium">Retos divertidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventJoin;
