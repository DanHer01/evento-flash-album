
import React, { useRef, useState } from 'react';
import { Camera, Video, RotateCcw, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraCaptureProps {
  onPhotoTaken: (photo: string) => void;
  onClose: () => void;
}

const CameraCapture = ({ onPhotoTaken, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    setTimeout(startCamera, 100);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg', 0.8);
        onPhotoTaken(photoData);
        stopCamera();
        onClose();
      }
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>
        <h2 className="text-lg font-semibold">Capturar foto</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={switchCamera}
          className="text-white hover:bg-white/20"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Camera Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Button
            onClick={takePhoto}
            disabled={!isActive}
            className="w-20 h-20 rounded-full bg-white text-black hover:bg-white/90 border-4 border-white/50"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
