import { useState } from 'react';
import { ORDERS, fmt } from '../data';
import type { Order } from '../types';
import { styles, btn, tag, colors } from '../styles';
import Icon from './Icon';

const STATUS_COLORS: Record<Order['status'], string> = { Delivered: '#16A34A', 'In Transit': '#D97706', Processing: '#2563EB' };

export default function Orders() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | Order['status']>('All');

  const filtered = ORDERS.filter(o => filter === 'All' || o.status === filter);

  return (
    <div>
      <div style={styles.topBar}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, flex: 1, letterSpacing: -0.5 }}>My Orders</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['All', 'Delivered', 'In Transit', 'Processing'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', background: filter === f ? colors.emerald : '#fff', color: filter === f ? '#fff' : colors.textMuted, border: filter === f ? 'none' : '1px solid rgba(0,0,0,0.1)' }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={styles.pageContent}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Orders', value: ORDERS.length, color: colors.emerald, icon: 'package' },
            { label: 'Delivered', value: ORDERS.filter(o => o.status === 'Delivered').length, color: colors.green, icon: 'check' },
            { label: 'In Transit', value: ORDERS.filter(o => o.status === 'In Transit').length, color: colors.amber, icon: 'truck' },
            { label: 'Total Spent', value: 'RS. 55.4K', color: '#7C3AED', icon: 'credit' },
          ].map(s => (
            <div key={s.label} style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: colors.textMuted }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div style={styles.card}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 120px 140px 160px', gap: 0, padding: '0 0 12px', borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: 8 }}>
            {['Order ID', 'Items', 'Status', 'Total', 'Actions'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: colors.textHint, textTransform: 'uppercase', letterSpacing: 0.6 }}>{h}</span>
            ))}
          </div>

          {filtered.map((order, idx) => {
            const expanded = expandedId === order.id;
            const sc = STATUS_COLORS[order.status];
            return (
              <div key={order.id}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 120px 140px 160px', gap: 0, padding: '16px 0', borderBottom: idx < filtered.length - 1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700 }}>{order.id}</p>
                    <p style={{ margin: 0, fontSize: 12, color: colors.textHint }}>{order.date}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {order.items.slice(0, 2).map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.image}</div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{item.name}</p>
                      </div>
                    ))}
                    {order.items.length > 2 && <span style={{ fontSize: 12, color: colors.textMuted }}>+{order.items.length - 2} more</span>}
                  </div>
                  <span style={{ ...tag(sc) }}>{order.status}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: colors.emerald }}>{fmt(order.total)}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setExpandedId(expanded ? null : order.id)} style={{ ...btn('ghost'), padding: '6px 12px', fontSize: 12 }}>Details</button>
                    {order.status === 'Delivered' && <button style={{ ...btn('ghost'), padding: '6px 12px', fontSize: 12 }}>Review</button>}
                  </div>
                </div>

                {expanded && (
                  <div style={{ background: '#F9F8F5', borderRadius: 12, padding: '20px', marginBottom: 8, border: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div>
                        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Tracking</p>
                        <div style={{ background: '#FEF9EC', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', border: '1px solid #FDE68A' }}>
                          <Icon name="truck" size={18} color={colors.amber} />
                          <span style={{ fontSize: 13, color: '#92400E' }}>ID: <strong>{order.tracking}</strong></span>
                        </div>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Quick Actions</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={{ ...btn('ghost'), fontSize: 12 }}><Icon name="refresh" size={14} />Reorder</button>
                          {order.status === 'Delivered' && <button style={{ ...btn('ghost'), fontSize: 12 }}>Write Review</button>}
                          <button style={{ ...btn('ghost'), fontSize: 12 }}>Invoice</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
