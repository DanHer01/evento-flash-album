
import React, { useState } from 'react';
import RoleSelection from '@/components/RoleSelection';
import PricingPlans from '@/components/PricingPlans';
import PaymentCheckout from '@/components/PaymentCheckout';
import EventJoin from '@/components/EventJoin';
import EventFeed from '@/components/EventFeed';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'role' | 'pricing' | 'payment' | 'join' | 'feed'>('role');
  const [userRole, setUserRole] = useState<'organizer' | 'guest' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: 'get-together' | 'event' | 'wedding';
    name: string;
    price: string;
    description: string;
  } | null>(null);
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

  const handlePlanSelect = (planId: 'get-together' | 'event' | 'wedding') => {
    const plans = {
      'get-together': { id: planId, name: 'Get Together', price: '$5', description: 'Perfecto para reuniones pequeñas' },
      'event': { id: planId, name: 'Event', price: '$99.99', description: 'Ideal para eventos medianos' },
      'wedding': { id: planId, name: 'Wedding', price: '$250', description: 'Para el día más especial' }
    };
    setSelectedPlan(plans[planId]);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
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

  if (currentStep === 'role') {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  if (currentStep === 'pricing') {
    return <PricingPlans onPlanSelect={handlePlanSelect} onBack={() => setCurrentStep('role')} />;
  }

  if (currentStep === 'payment' && selectedPlan) {
    return (
      <PaymentCheckout
        plan={selectedPlan}
        onBack={() => setCurrentStep('pricing')}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
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
