import { useState } from 'react';
import type { PaymentStatus } from '../types';
import { fmt } from '../data';
import { styles, btn, colors } from '../styles';
import Icon from './Icon';

interface PaymentProps { total: number; onBack: () => void; onResult: (r: PaymentStatus) => void; }
type PayMethod = 'card' | 'upi' | 'netbank';
const BANKS = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Yes Bank'];

export default function Payment({ total, onBack, onResult }: PaymentProps) {
  const [method, setMethod] = useState<PayMethod>('card');
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const formatCard = (v: string) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, ''); return d.length >= 2 ? d.slice(0, 2) + '/' + d.slice(2, 4) : d; };
  const pay = () => { setLoading(true); setTimeout(() => { setLoading(false); onResult(Math.random() > 0.2 ? 'success' : 'failed'); }, 2400); };

  return (
    <div>
      <div style={styles.topBar}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.textMuted, fontFamily: 'inherit', fontSize: 14 }}>
          <Icon name="arrow_left" size={18} /> Back
        </button>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, flex: 1, marginLeft: 16 }}>Secure Payment</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: colors.green, fontSize: 13, fontWeight: 600 }}>
          <Icon name="lock" size={14} color={colors.green} /> 256-bit SSL Encrypted
        </div>
      </div>

      <div style={{ ...styles.pageContent, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, maxWidth: 1100, alignItems: 'start' }}>
        {/* Left: Payment form */}
        <div>
          {/* Method selector */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {([{ id: 'card' as PayMethod, label: '💳 Credit / Debit Card' }, { id: 'upi' as PayMethod, label: '⚡ UPI' }, { id: 'netbank' as PayMethod, label: '🏦 Net Banking' }]).map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} style={{ flex: 1, padding: '14px', borderRadius: 12, border: method === m.id ? `2px solid ${colors.emerald}` : '1.5px solid rgba(0,0,0,0.1)', background: method === m.id ? colors.emeraldLight : '#fff', color: method === m.id ? colors.emerald : colors.textMuted, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {m.label}
              </button>
            ))}
          </div>

          {method === 'card' && (
            <div style={styles.card}>
              {/* Visual card */}
              <div style={{ background: 'linear-gradient(135deg, #1C1C2E, #2E2E52)', borderRadius: 16, padding: '28px 28px 24px', marginBottom: 28, color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                  <Icon name="credit" size={36} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, letterSpacing: 2 }}>CREDIT / DEBIT</span>
                </div>
                <p style={{ margin: '0 0 24px', fontSize: 20, letterSpacing: 4, fontFamily: 'monospace', opacity: card.number ? 1 : 0.4 }}>{card.number || '•••• •••• •••• ••••'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><p style={{ margin: 0, opacity: 0.4, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Card Holder</p><p style={{ margin: 0, fontSize: 14, fontWeight: 600, opacity: card.name ? 1 : 0.4 }}>{card.name || 'YOUR NAME'}</p></div>
                  <div><p style={{ margin: 0, opacity: 0.4, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Expires</p><p style={{ margin: 0, fontSize: 14, fontWeight: 600, opacity: card.expiry ? 1 : 0.4 }}>{card.expiry || 'MM/YY'}</p></div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Card Number</label>
                  <input style={styles.input} placeholder="1234 5678 9012 3456" value={card.number} onChange={e => setCard({ ...card, number: formatCard(e.target.value) })} maxLength={19} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Name on Card</label>
                  <input style={styles.input} placeholder="AARAV SHAH" value={card.name} onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })} />
                </div>
                <div>
                  <label style={styles.label}>Expiry Date</label>
                  <input style={styles.input} placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} maxLength={5} />
                </div>
                <div>
                  <label style={styles.label}>CVV</label>
                  <input style={styles.input} placeholder="•••" type="password" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value.slice(0, 4) })} maxLength={4} />
                </div>
              </div>
            </div>
          )}

          {method === 'upi' && (
            <div style={styles.card}>
              <p style={{ margin: '0 0 20px', color: colors.textMuted, fontSize: 14, lineHeight: 1.6 }}>Enter your UPI ID to pay instantly from any linked bank account.</p>
              <label style={styles.label}>UPI ID</label>
              <input style={styles.input} placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
              <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['@okaxis', '@ybl', '@paytm', '@okhdfcbank'].map(s => (
                  <button key={s} onClick={() => setUpiId('aarav' + s)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: colors.textMuted }}>aarav{s}</button>
                ))}
              </div>
            </div>
          )}

          {method === 'netbank' && (
            <div style={styles.card}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {BANKS.map(bank => (
                  <div key={bank} onClick={() => setSelectedBank(bank)} style={{ padding: '14px 16px', borderRadius: 12, border: selectedBank === bank ? `2px solid ${colors.emerald}` : '1.5px solid rgba(0,0,0,0.1)', background: selectedBank === bank ? colors.emeraldLight : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${selectedBank === bank ? colors.emerald : '#D1D5DB'}`, background: selectedBank === bank ? colors.emerald : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {selectedBank === bank && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: selectedBank === bank ? 600 : 400 }}>{bank}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div style={{ position: 'sticky', top: 84 }}>
          <div style={{ background: `linear-gradient(145deg, ${colors.sidebar}, #0F3028)`, borderRadius: 20, padding: '28px', color: '#fff', marginBottom: 16 }}>
            <p style={{ margin: '0 0 4px', opacity: 0.6, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Amount to Pay</p>
            <p style={{ margin: '0 0 20px', fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{fmt(total)}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['VISA', 'MC', 'AMEX', 'RuPay'].map(b => <span key={b} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 5, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{b}</span>)}
            </div>
          </div>
          <button onClick={pay} disabled={loading} style={{ ...btn('primary', 'lg'), width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
            <Icon name="lock" size={15} color="#fff" />
            {loading ? 'Processing…' : `Pay ${fmt(total)} Securely`}
          </button>
          <p style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: colors.textHint }}>Your card details are never stored on our servers</p>
        </div>
      </div>
    </div>
  );
}
