import { useState } from 'react';
import type { User } from '../types';
import { styles, btn, colors } from '../styles';
import Icon from './Icon';

interface SignInProps { onLogin: (user: User) => void; }

export default function SignIn({ onLogin }: SignInProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handle = () => {
    if (!email || !pass) { setErr('Please fill in all fields'); return; }
    setErr(''); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: 'Aarav Shah', email }); }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Manrope','Segoe UI',sans-serif" }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: `linear-gradient(145deg, ${colors.sidebar}, #0F3028)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(6,78,59,0.3)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(10,122,92,0.2)' }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 80 }}>
            <div style={{ width: 42, height: 42, background: colors.emerald, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 20 }}>✦</span>
            </div>
            <span style={{ color: '#fff', fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>LuxeCommerce</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 800, margin: '0 0 20px', letterSpacing: -1.5, lineHeight: 1.1 }}>Curated<br />Premium<br />Collection</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, margin: 0, lineHeight: 1.7 }}>Discover handpicked luxury products<br />crafted for the discerning buyer.</p>
        </div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[['6+', 'Categories'], ['500+', 'Products'], ['4.8★', 'Rating']].map(([v, l]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px' }}>
              <p style={{ margin: '0 0 4px', color: '#fff', fontSize: 22, fontWeight: 800 }}>{v}</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 56px', background: '#FAFAF8' }}>
        <div style={{ width: '100%' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', letterSpacing: -0.8 }}>Welcome back</h2>
          <p style={{ margin: '0 0 36px', color: colors.textMuted, fontSize: 15 }}>Sign in to your curated collection</p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {[{ icon: 'google', label: 'Google' }, { icon: 'apple', label: 'Apple' }].map(s => (
              <button key={s.label} onClick={() => onLogin({ name: 'Aarav Shah', email: 'aarav@example.com' })}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', color: colors.text }}>
                <Icon name={s.icon} size={18} /> {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.09)' }} />
            <span style={{ fontSize: 12, color: colors.textHint }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.09)' }} />
          </div>

          {err && <div style={{ background: '#FEF2F2', color: colors.red, padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, border: '1px solid #FECACA' }}>{err}</div>}

          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Email address</label>
            <input style={styles.input} placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} type="email" onKeyDown={e => e.key === 'Enter' && handle()} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} type="password" onKeyDown={e => e.key === 'Enter' && handle()} />
          </div>

          <div style={{ textAlign: 'right', marginBottom: 28 }}>
            <span style={{ fontSize: 13, color: colors.emerald, fontWeight: 600, cursor: 'pointer' }}>Forgot password?</span>
          </div>

          <button style={{ ...btn('primary', 'lg'), width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }} onClick={handle} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: colors.textMuted }}>
            Don't have an account? <span style={{ color: colors.emerald, fontWeight: 700, cursor: 'pointer' }}>Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}
