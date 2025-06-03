
import React, { useState } from 'react';
import RoleSelection from '@/components/RoleSelection';
import PricingPlans from '@/components/PricingPlans';
import EventJoin from '@/components/EventJoin';
import EventFeed from '@/components/EventFeed';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'role' | 'pricing' | 'join' | 'feed'>('role');
  const [userRole, setUserRole] = useState<'organizer' | 'guest' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'get-together' | 'event' | 'wedding' | null>(null);
  const [currentEvent, setCurrentEvent] = useState<{
    code: string;
    userName: string;
  } | null>(null);

  const handleRoleSelect = (role: 'organizer' | 'guest') => {
    setUserRole(role);
    if (role === 'organizer') {
      setCurrentStep('pricing');
    } else {
      setCurrentStep('join');
    }
  };

  const handlePlanSelect = (plan: 'get-together' | 'event' | 'wedding') => {
    setSelectedPlan(plan);
    // Por ahora, después de seleccionar plan, vamos al join
    // Aquí podrías implementar la lógica de pago
    setCurrentStep('join');
  };

  const handleJoinEvent = (eventCode: string, userName: string) => {
    setCurrentEvent({ code: eventCode, userName });
    setCurrentStep('feed');
  };

  const handleLeaveEvent = () => {
    setCurrentEvent(null);
    setCurrentStep('role');
    setUserRole(null);
    setSelectedPlan(null);
  };

  const handleBackToPricing = () => {
    setCurrentStep('pricing');
  };

  if (currentStep === 'role') {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  if (currentStep === 'pricing') {
    return <PricingPlans onPlanSelect={handlePlanSelect} onBack={() => setCurrentStep('role')} />;
  }

  if (currentStep === 'join') {
    return <EventJoin onJoinEvent={handleJoinEvent} />;
  }

  if (currentStep === 'feed' && currentEvent) {
    return (
      <EventFeed
        eventCode={currentEvent.code}
        userName={currentEvent.userName}
        onLeaveEvent={handleLeaveEvent}
      />
    );
  }

  return <RoleSelection onRoleSelect={handleRoleSelect} />;
};

export default Index;
