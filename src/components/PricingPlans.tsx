
import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PricingPlansProps {
  onPlanSelect: (plan: 'get-together' | 'event' | 'wedding') => void;
  onBack: () => void;
}

const PricingPlans = ({ onPlanSelect, onBack }: PricingPlansProps) => {
  const plans = [
    {
      id: 'get-together' as const,
      name: 'Get Together',
      price: '$5',
      description: 'Perfecto para reuniones pequeñas',
      features: [
        'Hasta 20 invitados',
        'Álbum compartido',
        '5 misiones básicas',
        'Soporte por email'
      ],
      popular: false
    },
    {
      id: 'event' as const,
      name: 'Event',
      price: '$99.99',
      description: 'Ideal para eventos medianos',
      features: [
        'Hasta 100 invitados',
        'Álbum compartido ilimitado',
        'Misiones personalizadas',
        'Grupos de invitados',
        'Estadísticas del evento',
        'Soporte prioritario'
      ],
      popular: true
    },
    {
      id: 'wedding' as const,
      name: 'Wedding',
      price: '$250',
      description: 'Para el día más especial',
      features: [
        'Invitados ilimitados',
        'Álbum premium',
        'Misiones ilimitadas',
        'Grupos personalizados',
        'Editor de fotos avanzado',
        'Backup automático',
        'Soporte 24/7',
        'Álbum físico incluido'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center text-white space-y-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>
          <h1 className="text-4xl font-bold mt-12">Elige tu plan</h1>
          <p className="text-lg opacity-90">Selecciona el plan perfecto para tu evento</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white relative ${
                plan.popular ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-purple-800 px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <p className="opacity-80">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onPlanSelect(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-yellow-400 text-purple-800 hover:bg-yellow-300' 
                    : 'bg-white text-purple-600 hover:bg-white/90'
                } font-semibold py-3`}
              >
                Seleccionar Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
