
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 via-gray-800 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center text-white space-y-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 text-white hover:bg-gradient-to-r hover:from-yellow-400/20 hover:via-yellow-500/25 hover:to-yellow-400/20 hover:text-yellow-400 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>
          <h1 className="text-4xl font-bold mt-12 bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Elige tu plan</h1>
          <p className="text-lg text-gray-300">Selecciona el plan perfecto para tu evento</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border text-white relative transition-all duration-500 shadow-xl shadow-black/30 ${
                plan.popular 
                  ? 'ring-2 ring-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-gradient-to-br from-yellow-400/5 via-yellow-500/10 to-yellow-400/5 border-yellow-400/40' 
                  : 'border-yellow-400/20 hover:bg-gradient-to-br hover:from-white/10 hover:via-white/15 hover:to-white/10 hover:border-yellow-400/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg shadow-yellow-400/30">
                    Más Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2 text-white">{plan.price}</div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onPlanSelect(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:via-yellow-500 hover:via-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-400/30' 
                    : 'bg-gradient-to-r from-white via-gray-100 to-white text-black hover:from-gray-100 hover:via-white hover:to-gray-100 shadow-lg shadow-white/20'
                } font-semibold py-3 transition-all duration-500`}
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
