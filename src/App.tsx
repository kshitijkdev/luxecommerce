import { useState } from 'react';
import type { Screen, User, CartItem, Product, PaymentStatus, NavTab } from './types';
import { styles } from './styles';
import SignIn from './components/SignIn';
import ItemsList from './components/ItemsList';
import ItemDetail from './components/ItemDetail';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import PaymentStatusScreen from './components/PaymentStatus';
import Orders from './components/Orders';
import Sidebar from './components/Sidebar';

const NO_SIDEBAR: Screen[] = ['signin'];
const NO_SHELL: Screen[] = ['signin', 'payment_status'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [payTotal, setPayTotal] = useState(0);
  const [payStatus, setPayStatus] = useState<PaymentStatus>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeNav, setActiveNav] = useState<NavTab>('home');

  const handleNav = (tab: NavTab) => {
    setActiveNav(tab);
    if (tab === 'home') setScreen('items');
    if (tab === 'orders') setScreen('orders');
  };

  const showSidebar = !NO_SIDEBAR.includes(screen) && !!user;
  const showShell = !NO_SHELL.includes(screen);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const content = (
    <>
      {screen === 'signin' && <SignIn onLogin={(u: User) => { setUser(u); setScreen('items'); }} />}
      {screen === 'items' && <ItemsList onItem={(item: Product) => { setSelectedItem(item); setScreen('item_detail'); }} onNav={handleNav} cart={cart} />}
      {screen === 'item_detail' && selectedItem && <ItemDetail item={selectedItem} onBack={() => setScreen('items')} cart={cart} setCart={setCart} onCheckout={(items: CartItem[]) => { setCheckoutItems(items); setScreen('checkout'); }} />}
      {screen === 'checkout' && <Checkout items={checkoutItems} onBack={() => setScreen('item_detail')} onPayment={(total: number) => { setPayTotal(total); setScreen('payment'); }} />}
      {screen === 'payment' && <Payment total={payTotal} onBack={() => setScreen('checkout')} onResult={(result: PaymentStatus) => { setPayStatus(result); setScreen('payment_status'); }} />}
      {screen === 'payment_status' && <PaymentStatusScreen status={payStatus} total={payTotal} onHome={() => { setActiveNav('home'); setScreen('items'); }} onOrders={() => { setActiveNav('orders'); setScreen('orders'); }} />}
      {screen === 'orders' && <Orders />}
    </>
  );

  if (!showShell) return <div style={{ fontFamily: "'Manrope','Segoe UI',sans-serif" }}>{content}</div>;

  return (
    <div style={styles.appShell}>
      {showSidebar && <Sidebar activeTab={activeNav} onNav={handleNav} cartCount={cartCount} userName={user?.name || 'Guest'} />}
      <div style={showSidebar ? styles.mainContent : { flex: 1 }}>
        {content}
      </div>
    </div>
  );
}
