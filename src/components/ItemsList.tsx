import { useState } from 'react';
import type { Product, CartItem, NavTab } from '../types';
import { PRODUCTS, fmt } from '../data';
import { styles, btn, tag, colors } from '../styles';
import Icon from './Icon';

interface ItemsListProps {
  onItem: (item: Product) => void;
  onNav: (tab: NavTab) => void;
  cart: CartItem[];
}

const CATEGORIES = ['All', 'Watches', 'Accessories', 'Eyewear', 'Fragrance', 'Tech', 'Bags'];

export default function ItemsList({ onItem, cart }: ItemsListProps) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');

  const filtered = PRODUCTS
    .filter(p => (cat === 'All' || p.category === cat) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === 'price_asc' ? a.price - b.price : sort === 'price_desc' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : 0);

  const totalCartItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Product Catalog</h1>
          <p style={{ margin: 0, fontSize: 12, color: colors.textMuted }}>{filtered.length} products{cat !== 'All' ? ` in ${cat}` : ''}</p>
        </div>
        {/* Search */}
        <div style={{ position: 'relative', width: 300 }}>
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><Icon name="search" size={16} color={colors.textHint} /></div>
          <input style={{ ...styles.input, paddingLeft: 40, background: '#fff', borderRadius: 10, height: 40 }} placeholder="Search products, brands…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {/* Sort */}
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 12px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10, fontFamily: 'inherit', fontSize: 13, background: '#fff', cursor: 'pointer', color: colors.text }}>
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div style={styles.pageContent}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Products', value: PRODUCTS.length, icon: 'tag', color: colors.emerald },
            { label: 'Categories', value: 7, icon: 'filter', color: '#7C3AED' },
            { label: 'Cart Items', value: totalCartItems, icon: 'cart', color: '#D97706' },
            { label: 'Avg Rating', value: '4.7★', icon: 'star', color: '#E11D48' },
          ].map(s => (
            <div key={s.label} style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: s.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: colors.textMuted }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: cat === c ? colors.emerald : '#fff', color: cat === c ? '#fff' : colors.textMuted, border: cat === c ? 'none' : '1px solid rgba(0,0,0,0.1)', transition: 'all 0.15s' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => onItem(p)} style={{ ...styles.card, padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)'; }}>
              <div style={{ height: 180, background: `linear-gradient(145deg, ${p.color}14, ${p.color}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
                {p.image}
                {p.badge && <span style={{ position: 'absolute', top: 12, left: 12, ...tag(p.color), fontSize: 10 }}>{p.badge}</span>}
                <div style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, background: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="heart" size={16} color={colors.textHint} />
                </div>
              </div>
              <div style={{ padding: '16px 18px 20px' }}>
                <p style={{ margin: '0 0 3px', fontSize: 11, color: colors.textHint, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{p.brand}</p>
                <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{p.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                  <Icon name="star" size={12} color="#F59E0B" />
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{p.rating}</span>
                  <span style={{ fontSize: 12, color: colors.textHint }}>({p.reviews})</span>
                  <span style={{ marginLeft: 'auto', ...tag(p.color), fontSize: 10 }}>{p.category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: colors.emerald }}>{fmt(p.price)}</span>
                  <span style={{ fontSize: 12, color: colors.textHint, textDecoration: 'line-through' }}>{fmt(p.originalPrice)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: colors.textMuted }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 600 }}>No products found</p>
            <p>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
