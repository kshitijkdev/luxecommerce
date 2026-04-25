import type { CartItem } from '../types';
import { fmt } from '../data';
import { styles, btn, colors } from '../styles';
import Icon from './Icon';

interface CheckoutProps { items: CartItem[]; onBack: () => void; onPayment: (total: number) => void; }

const address = { name: 'Aarav Shah', line: '12, Juhu Tara Road, Juhu', city: 'Mumbai, MH 400049', phone: '+91 98765 43210' };

export default function Checkout({ items, onBack, onPayment }: CheckoutProps) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal;

  return (
    <div>
      <div style={styles.topBar}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.textMuted, fontFamily: 'inherit', fontSize: 14 }}>
          <Icon name="arrow_left" size={18} /> Back
        </button>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, flex: 1, marginLeft: 16 }}>Checkout</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: colors.green, fontSize: 13, fontWeight: 600 }}>
          <Icon name="lock" size={14} color={colors.green} /> Secure Checkout
        </div>
      </div>

      <div style={{ ...styles.pageContent, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, maxWidth: 1100, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Items */}
          <div style={styles.card}>
            <h3 style={{ margin: '0 0 18px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: colors.textMuted }}>Order Items ({items.length})</h3>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 16, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ width: 72, height: 72, borderRadius: 12, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 }}>{item.image}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 11, color: colors.textHint }}>{item.brand}</p>
                  <p style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{item.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: colors.textMuted, background: '#F3F4F6', padding: '3px 10px', borderRadius: 6 }}>Qty: {item.qty}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: colors.emerald }}>{fmt(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Address */}
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: colors.textMuted }}>Delivery Address</h3>
              <button style={{ ...btn('ghost'), padding: '6px 14px', fontSize: 12 }}>Change</button>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ width: 40, height: 40, background: colors.emeraldLight, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="map_pin" size={18} color={colors.emerald} />
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 15 }}>{address.name}</p>
                <p style={{ margin: '0 0 2px', fontSize: 13, color: colors.textMuted }}>{address.line}</p>
                <p style={{ margin: '0 0 2px', fontSize: 13, color: colors.textMuted }}>{address.city}</p>
                <p style={{ margin: 0, fontSize: 13, color: colors.textMuted }}>{address.phone}</p>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div style={styles.card}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: colors.textMuted }}>Delivery Option</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ label: 'Standard Delivery', sub: '5–7 business days', price: 0, selected: true }, { label: 'Express Delivery', sub: '2–3 business days', price: 199, selected: false }].map(d => (
                <div key={d.label} style={{ padding: '16px', borderRadius: 12, border: d.selected ? `2px solid ${colors.emerald}` : '1.5px solid rgba(0,0,0,0.1)', background: d.selected ? colors.emeraldLight : '#fff', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <Icon name="truck" size={20} color={d.selected ? colors.emerald : colors.textHint} />
                    <span style={{ fontSize: 14, fontWeight: 800, color: d.price === 0 ? colors.green : colors.text }}>{d.price === 0 ? 'FREE' : fmt(d.price)}</span>
                  </div>
                  <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600 }}>{d.label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: colors.textMuted }}>{d.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div style={{ position: 'sticky', top: 84 }}>
          <div style={styles.card}>
            <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 800 }}>Order Summary</h3>
            {[['Subtotal', fmt(subtotal)], ['Shipping', 'FREE'], ['Taxes', 'Included'], ['Discount', '—']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: 14, color: colors.textMuted }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: v === 'FREE' ? colors.green : undefined }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0' }}>
              <span style={{ fontSize: 17, fontWeight: 800 }}>Total</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: colors.emerald }}>{fmt(total)}</span>
            </div>
            <button onClick={() => onPayment(total)} style={{ ...btn('primary', 'lg'), width: '100%', justifyContent: 'center', marginTop: 20 }}>
              Proceed to Payment →
            </button>
            <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: 12, color: colors.textHint }}>
              🔒 Payments are 256-bit SSL encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
