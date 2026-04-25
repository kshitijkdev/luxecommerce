import type { PaymentStatus as PS } from '../types';
import { fmt } from '../data';
import { btn, colors } from '../styles';
import Icon from './Icon';

interface PaymentStatusProps { status: PS; total: number; onHome: () => void; onOrders: () => void; }

export default function PaymentStatus({ status, total, onHome, onOrders }: PaymentStatusProps) {
  const success = status === 'success';
  const orderId = `LX-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`;
  const deliveryDate = new Date(Date.now() + 6 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F4F0', fontFamily: "'Manrope','Segoe UI',sans-serif", padding: '40px' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        {/* Status card */}
        <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.07)' }}>
          {/* Header */}
          <div style={{ background: success ? `linear-gradient(145deg, ${colors.sidebar}, #0F3028)` : 'linear-gradient(145deg, #1A0A0A, #3B0E0E)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: success ? colors.emerald : colors.red, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: success ? '0 12px 40px rgba(6,78,59,0.4)' : '0 12px 40px rgba(220,38,38,0.4)' }}>
              <Icon name={success ? 'check' : 'x'} size={40} color="#fff" />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 10px', letterSpacing: -0.5 }}>{success ? 'Payment Successful!' : 'Payment Failed'}</h1>
            <p style={{ margin: 0, opacity: 0.65, fontSize: 15, lineHeight: 1.6, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
              {success ? "Your order has been confirmed. We'll send you tracking details shortly." : "No amount was deducted. Please try again with a different payment method."}
            </p>
          </div>

          <div style={{ padding: '36px 40px' }}>
            {success && (
              <>
                {/* Order details */}
                <div style={{ marginBottom: 28 }}>
                  {[['Order ID', orderId], ['Amount Paid', fmt(total)], ['Estimated Delivery', deliveryDate], ['Payment Method', 'Credit Card ••••4567']].map(([l, v], i, arr) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? '0.5px solid rgba(0,0,0,0.07)' : 'none' }}>
                      <span style={{ fontSize: 14, color: colors.textMuted }}>{l}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: l === 'Amount Paid' ? colors.emerald : colors.text }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div style={{ background: '#F0FDF4', borderRadius: 14, padding: '20px 24px', marginBottom: 28 }}>
                  <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 700, color: colors.emerald, textTransform: 'uppercase', letterSpacing: 0.5 }}>Order Progress</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 11, left: '12.5%', right: '12.5%', height: 2, background: '#D1FAE5', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: '10%', background: colors.emerald, borderRadius: 2 }} />
                    </div>
                    {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
                      <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? colors.emerald : '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {i === 0 ? <Icon name="check" size={12} color="#fff" /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A7F3D0' }} />}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? colors.emerald : colors.textHint, whiteSpace: 'nowrap' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              {success ? (
                <>
                  <button onClick={onOrders} style={{ ...btn('primary', 'lg'), flex: 1, justifyContent: 'center' }}>Track My Order</button>
                  <button onClick={onHome} style={{ ...btn('secondary', 'lg'), flex: 1, justifyContent: 'center' }}>Continue Shopping</button>
                </>
              ) : (
                <>
                  <button onClick={() => window.history.back?.()} style={{ ...btn('primary', 'lg'), flex: 1, justifyContent: 'center' }}>Try Again</button>
                  <button onClick={onHome} style={{ ...btn('secondary', 'lg'), flex: 1, justifyContent: 'center' }}>Go to Home</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
