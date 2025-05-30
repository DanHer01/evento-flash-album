
import React from 'react';
import { Star, CheckCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface MissionCardProps {
  mission: Mission;
  onComplete: (missionId: string) => void;
}

const MissionCard = ({ mission, onComplete }: MissionCardProps) => {
  return (
    <Card className={`p-4 ${mission.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          mission.completed 
            ? 'bg-green-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
        }`}>
          {mission.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Camera className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold ${mission.completed ? 'text-green-800' : 'text-gray-900'}`}>
              {mission.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-600">
                {mission.points}
              </span>
            </div>
          </div>

          <p className={`text-sm mb-3 ${mission.completed ? 'text-green-600' : 'text-gray-600'}`}>
            {mission.description}
          </p>

          {mission.completed ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">¡Misión completada!</span>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => onComplete(mission.id)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              <Camera className="w-4 h-4 mr-2" />
              Tomar foto
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MissionCard;
