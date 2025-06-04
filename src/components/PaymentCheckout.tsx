
import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PaymentCheckoutProps {
  plan: {
    id: 'get-together' | 'event' | 'wedding';
    name: string;
    price: string;
    description: string;
  };
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentCheckout = ({ plan, onBack, onPaymentSuccess }: PaymentCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulamos el proceso de pago
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 via-gray-800 to-black p-4">
      <div className="max-w-md mx-auto">
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
          <h1 className="text-3xl font-bold mt-12 bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Finalizar Compra
          </h1>
          <p className="text-lg text-gray-300">Plan {plan.name} - {plan.price}</p>
        </div>

        {/* Payment Form */}
        <Card className="p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-yellow-400/20 text-white">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Información de Pago
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre en la tarjeta
                </label>
                <Input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Juan Pérez"
                  className="bg-black/20 border-yellow-400/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Número de tarjeta
                </label>
                <Input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="bg-black/20 border-yellow-400/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    MM/AA
                  </label>
                  <Input
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="12/28"
                    maxLength={5}
                    className="bg-black/20 border-yellow-400/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <Input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="bg-black/20 border-yellow-400/30 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading || !cardNumber || !expiryDate || !cvv || !cardName}
              className="w-full bg-gradient-to-r from-yellow-300 via-yellow-400 via-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:via-yellow-500 hover:via-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-400/30 font-semibold py-3 transition-all duration-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                `Pagar ${plan.price}`
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Tu información está protegida con encriptación SSL
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCheckout;
