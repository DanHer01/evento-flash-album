import React, { useState } from 'react';
import { Camera, Users, MessageCircle, Download, Share, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import CameraCapture from './CameraCapture';
import MissionCard from './MissionCard';

interface Photo {
  id: string;
  src: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  mission?: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface EventFeedProps {
  eventCode: string;
  userName: string;
  onLeaveEvent: () => void;
}

const EventFeed = ({ eventCode, userName, onLeaveEvent }: EventFeedProps) => {
  const [showCamera, setShowCamera] = useState(true); // Mostrar cámara al inicio
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      src: '/placeholder.svg',
      author: 'Ana Martínez',
      timestamp: new Date(Date.now() - 30000),
      likes: 12,
      comments: [
        { id: '1', author: 'Carlos López', text: '¡Qué hermosa foto!', timestamp: new Date() }
      ]
    }
  ]);

  const [missions, setMissions] = useState<Mission[]>([
    { id: '1', title: 'Selfie con los novios', description: 'Tómate una foto con la pareja feliz', completed: false, points: 10 },
    { id: '2', title: 'Momento del brindis', description: 'Captura el momento del brindis', completed: false, points: 15 },
    { id: '3', title: 'Decoración especial', description: 'Foto de tu decoración favorita', completed: false, points: 5 }
  ]);

  const [activeTab, setActiveTab] = useState<'comments' | 'missions'>('comments');
  const [newComment, setNewComment] = useState('');
  const [activeComments, setActiveComments] = useState<string | null>(null);

  const handlePhotoTaken = (photoData: string) => {
    const newPhoto: Photo = {
      id: Date.now().toString(),
      src: photoData,
      author: userName,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };
    setPhotos(prev => [newPhoto, ...prev]);
    setShowCamera(false); // Ocultar cámara después de tomar foto
  };

  const handleLike = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ));
  };

  const handleComment = (photoId: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: userName,
        text: newComment.trim(),
        timestamp: new Date()
      };

      setPhotos(prev => prev.map(photo =>
        photo.id === photoId
          ? { ...photo, comments: [...photo.comments, comment] }
          : photo
      ));
      setNewComment('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Ahora';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  if (showCamera) {
    return (
      <CameraCapture
        onPhotoTaken={handlePhotoTaken}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Evento {eventCode}</h1>
              <p className="text-sm text-gray-600">Hola, {userName}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLeaveEvent}
              className="text-gray-600"
            >
              Salir
            </Button>
          </div>
        </div>

        {/* Updated Tabs */}
        <div className="flex border-t">
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex-1 py-3 text-center font-medium flex items-center justify-center space-x-2 ${
              activeTab === 'comments'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comentarios</span>
          </button>
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex-1 py-3 text-center font-medium flex items-center justify-center space-x-2 ${
              activeTab === 'missions'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Retos</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === 'comments' ? (
          <div className="space-y-4 p-4">
            {photos.map(photo => (
              <Card key={photo.id} className="overflow-hidden bg-white/80 backdrop-blur-sm">
                {/* Photo Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {photo.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{photo.author}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(photo.timestamp)}</p>
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <img
                  src={photo.src}
                  alt="Foto del evento"
                  className="w-full aspect-square object-cover"
                />

                {/* Actions */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(photo.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <Heart className="w-5 h-5 mr-1" />
                        {photo.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveComments(
                          activeComments === photo.id ? null : photo.id
                        )}
                        className="text-gray-600"
                      >
                        <MessageCircle className="w-5 h-5 mr-1" />
                        {photo.comments.length}
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Share className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Download className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Comments */}
                  {activeComments === photo.id && (
                    <div className="space-y-3 border-t pt-3">
                      {photo.comments.map(comment => (
                        <div key={comment.id} className="flex space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">
                              {comment.author.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-semibold">{comment.author}</span>{' '}
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Añade un comentario..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleComment(photo.id);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleComment(photo.id)}
                          disabled={!newComment.trim()}
                        >
                          Enviar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {missions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onComplete={(missionId) => {
                  setMissions(prev => prev.map(m =>
                    m.id === missionId ? { ...m, completed: true } : m
                  ));
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Camera Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setShowCamera(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Camera className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default EventFeed;
