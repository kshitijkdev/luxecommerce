import type { NavTab, CartItem } from '../types';
import { styles, navBtn, colors } from '../styles';
import Icon from './Icon';

interface BottomNavProps {
  activeTab: NavTab;
  onNav: (tab: NavTab) => void;
  cart: CartItem[];
}

const NAV_ITEMS: { id: NavTab; icon: string; label: string }[] = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'cart', icon: 'cart', label: 'Cart' },
  { id: 'orders', icon: 'package', label: 'Orders' },
  { id: 'profile', icon: 'user', label: 'Profile' },
];

export default function BottomNav({ activeTab, onNav, cart }: BottomNavProps) {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={styles.bottomNav}>
      {NAV_ITEMS.map(n => {
        const active = activeTab === n.id;
        const badge = n.id === 'cart' && cartCount > 0 ? cartCount : null;

        return (
          <button key={n.id} onClick={() => onNav(n.id)} style={navBtn(active)}>
            <div style={{ position: 'relative' }}>
              {active && (
                <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: colors.emerald }} />
              )}
              <Icon name={n.icon} size={23} color={active ? colors.emerald : '#8E8E93'} />
              {badge && (
                <span style={{ position: 'absolute', top: -5, right: -7, background: colors.emerald, color: '#fff', borderRadius: '50%', width: 15, height: 15, fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {badge}
                </span>
              )}
            </div>
            {n.label}
          </button>
        );
      })}
    </div>
  );
}
