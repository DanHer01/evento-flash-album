
import React, { useState } from 'react';
import EventJoin from '@/components/EventJoin';
import EventFeed from '@/components/EventFeed';

const Index = () => {
  const [currentEvent, setCurrentEvent] = useState<{
    code: string;
    userName: string;
  } | null>(null);

  const handleJoinEvent = (eventCode: string, userName: string) => {
    setCurrentEvent({ code: eventCode, userName });
  };

  const handleLeaveEvent = () => {
    setCurrentEvent(null);
  };

  if (currentEvent) {
    return (
      <EventFeed
        eventCode={currentEvent.code}
        userName={currentEvent.userName}
        onLeaveEvent={handleLeaveEvent}
      />
    );
  }

  return (
    <EventJoin onJoinEvent={handleJoinEvent} />
  );
};

export default Index;
