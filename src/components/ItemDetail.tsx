import { useState } from 'react';
import type { Product, CartItem } from '../types';
import { fmt } from '../data';
import { styles, btn, tag, colors } from '../styles';
import Icon from './Icon';

interface ItemDetailProps {
  item: Product;
  onBack: () => void;
  onCheckout: (items: CartItem[]) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

export default function ItemDetail({ item, onBack, onCheckout, cart, setCart }: ItemDetailProps) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'specs' | 'description'>('specs');
  const [wishlisted, setWishlisted] = useState(false);

  const inCart = cart.find(c => c.id === item.id);
  const discount = Math.round((1 - item.price / item.originalPrice) * 100);

  const addToCart = () => {
    if (inCart) setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c));
    else setCart([...cart, { ...item, qty }]);
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.textMuted, fontFamily: 'inherit', fontSize: 14, padding: '6px 0' }}>
          <Icon name="arrow_left" size={18} /> Back to Catalog
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={() => setWishlisted(!wishlisted)} style={{ ...btn('ghost'), gap: 6 }}>
          <Icon name="heart" size={16} color={wishlisted ? '#E11D48' : colors.emerald} />
          {wishlisted ? 'Wishlisted' : 'Wishlist'}
        </button>
      </div>

      <div style={styles.pageContent}>
        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 1100 }}>
          {/* Left: Image + Gallery */}
          <div>
            <div style={{ background: `linear-gradient(145deg, ${item.color}12, ${item.color}28)`, borderRadius: 20, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 140, position: 'relative', marginBottom: 16 }}>
              {item.image}
              {item.badge && <span style={{ position: 'absolute', top: 20, left: 20, ...tag(item.color) }}>{item.badge}</span>}
            </div>
            {/* Thumbnails placeholder */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ flex: 1, height: 72, background: `${item.color}${i === 1 ? '28' : '10'}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, cursor: 'pointer', border: i === 1 ? `2px solid ${item.color}` : '2px solid transparent' }}>
                  {item.image}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 12, color: colors.textHint, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>{item.brand} · {item.category}</p>
            <h1 style={{ margin: '0 0 16px', fontSize: 30, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.15 }}>{item.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
              {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={16} color={i <= Math.floor(item.rating) ? '#F59E0B' : '#E5E7EB'} />)}
              <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 4 }}>{item.rating}</span>
              <span style={{ fontSize: 14, color: colors.textMuted }}>({item.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ ...styles.card, marginBottom: 24, padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 34, fontWeight: 800, color: colors.emerald }}>{fmt(item.price)}</span>
                <span style={{ fontSize: 16, color: colors.textHint, textDecoration: 'line-through' }}>{fmt(item.originalPrice)}</span>
                <span style={{ ...tag(colors.green) }}>{discount}% OFF</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: colors.textHint }}>Inclusive of all taxes · Free delivery across India</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 20, background: '#F3F4F6', borderRadius: 10, padding: 3, width: 'fit-content' }}>
              {(['specs', 'description'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '9px 22px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: tab === t ? '#fff' : 'transparent', color: tab === t ? colors.emerald : colors.textMuted, boxShadow: tab === t ? '0 1px 5px rgba(0,0,0,0.08)' : 'none' }}>
                  {t === 'specs' ? 'Specifications' : 'Description'}
                </button>
              ))}
            </div>

            {tab === 'specs' ? (
              <div style={{ ...styles.card, marginBottom: 24 }}>
                {Object.entries(item.specs).map(([k, v], idx, arr) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: idx < arr.length - 1 ? '0.5px solid rgba(0,0,0,0.07)' : 'none' }}>
                    <span style={{ fontSize: 13, color: colors.textMuted, textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ ...styles.card, marginBottom: 24 }}>
                <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            )}

            {/* Qty + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', background: '#F3F4F6', borderRadius: 10 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer' }}><Icon name="minus" size={15} /></button>
                <span style={{ fontSize: 16, fontWeight: 700, minWidth: 28, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer' }}><Icon name="plus" size={15} /></button>
              </div>
              {inCart && <span style={{ ...tag(), fontSize: 11 }}>{inCart.qty} in cart</span>}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={addToCart} style={{ ...btn('secondary'), flex: 1, justifyContent: 'center' }}>Add to Cart</button>
              <button onClick={() => { addToCart(); onCheckout([{ ...item, qty }]); }} style={{ ...btn('primary'), flex: 2, justifyContent: 'center' }}>
                Buy Now → {fmt(item.price * qty)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
