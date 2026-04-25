import type { NavTab } from '../types';
import { colors, SIDEBAR_W } from '../styles';
import Icon from './Icon';

interface SidebarProps {
  activeTab: NavTab;
  onNav: (tab: NavTab) => void;
  cartCount: number;
  userName: string;
}

const NAV = [
  { id: 'home' as NavTab, icon: 'home', label: 'Catalog' },
  { id: 'cart' as NavTab, icon: 'cart', label: 'Cart' },
  { id: 'orders' as NavTab, icon: 'package', label: 'My Orders' },
  { id: 'profile' as NavTab, icon: 'user', label: 'Profile' },
];

export default function Sidebar({ activeTab, onNav, cartCount, userName }: SidebarProps) {
  return (
    <div style={{ width: SIDEBAR_W, minHeight: '100vh', background: colors.sidebar, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
      {/* Brand */}
      <div style={{ padding: '32px 28px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, background: colors.emerald, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 18 }}>✦</span>
          </div>
          <div>
            <p style={{ margin: 0, color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: -0.3 }}>LuxeCommerce</p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Premium Collection</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 16px' }}>
        <p style={{ margin: '0 0 8px 12px', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase' }}>Navigation</p>
        {NAV.map(n => {
          const active = activeTab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 2, background: active ? colors.emerald : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: active ? 600 : 400, transition: 'all 0.15s', position: 'relative' }}
            >
              <Icon name={n.icon} size={18} color={active ? '#fff' : 'rgba(255,255,255,0.55)'} />
              {n.label}
              {n.id === 'cart' && cartCount > 0 && (
                <span style={{ marginLeft: 'auto', background: '#fff', color: colors.emerald, borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 800 }}>{cartCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '20px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: colors.emerald, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {userName.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Premium Member</p>
          </div>
        </div>
      </div>
    </div>
  );
}
