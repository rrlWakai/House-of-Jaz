import { useState, useEffect } from 'react';
import { LayoutDashboard, CalendarDays, BookOpen, Tag, DollarSign, LogOut, Globe, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { bookingStore, rateStore, promoStore, STORE_EVENT } from '@/lib/store';
import type { Booking } from '@/lib/types';
import { CalendarManagement } from './CalendarManagement';
import { RateManager } from './RateManager';
import { PromoManager } from './PromoManager';
import { BookingsTable } from './BookingsTable';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'bookings' | 'calendar' | 'rates' | 'promos';

const ADMIN_PASSWORD = 'admin2024';

// ── Login Screen ──────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B08] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-12">
          <p className="text-[#C9A87C] text-[10px] tracking-[0.3em] uppercase mb-3">
            Admin Portal
          </p>
          <h1 className="font-serif text-white text-3xl font-normal">House of Jaz</h1>
          <div className="w-8 h-px bg-[#C9A87C]/60 mx-auto mt-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full bg-transparent border-b border-[#3A3530] text-white text-sm placeholder-[#5A5550] py-3 focus:outline-none focus:border-[#C9A87C] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C9A87C] text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#A88B5A] transition-colors duration-300 mt-2"
          >
            Access Dashboard
          </button>
        </form>

        <p className="text-center text-[#3A3530] text-xs mt-8">
          <a href="#" className="hover:text-[#8A8278] transition-colors">
            ← Return to website
          </a>
        </p>
      </div>
    </div>
  );
}

// ── Overview / Stats Tab ──────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <div className={cn(
      'p-6 rounded border',
      accent ? 'bg-[#1A1610] border-[#C9A87C]/30' : 'bg-white border-[#E8E0D4]'
    )}>
      <div className="flex items-start justify-between mb-4">
        <p className={cn(
          'text-[10px] tracking-[0.2em] uppercase',
          accent ? 'text-[#C9A87C]/70' : 'text-[#8A8278]'
        )}>
          {label}
        </p>
        <Icon className={cn('w-4 h-4', accent ? 'text-[#C9A87C]' : 'text-[#C9A87C]/60')} />
      </div>
      <p className={cn(
        'font-serif text-3xl font-normal',
        accent ? 'text-white' : 'text-[#1A1610]'
      )}>
        {value}
      </p>
      {sub && (
        <p className={cn('text-xs mt-1', accent ? 'text-[#C9A87C]/50' : 'text-[#8A8278]')}>
          {sub}
        </p>
      )}
    </div>
  );
}

function OverviewTab() {
  const [bookings, setBookings] = useState<Booking[]>(() => bookingStore.getAll());

  useEffect(() => {
    const refresh = () => setBookings(bookingStore.getAll());
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const pending = bookings.filter(b => b.status === 'pending');
  const confirmed = bookings.filter(b => b.status === 'confirmed');
  const cancelled = bookings.filter(b => b.status === 'cancelled');
  const revenue = confirmed.reduce((sum, b) => sum + b.totalPrice, 0);
  const activePromos = promoStore.getAll().filter(p => p.isActive).length;
  const recent = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const statusColors: Record<Booking['status'], string> = {
    pending: 'text-amber-600 bg-amber-50',
    confirmed: 'text-emerald-600 bg-emerald-50',
    cancelled: 'text-red-500 bg-red-50',
  };

  const packageLabels: Record<string, string> = {
    'day-escape': 'Day Escape',
    overnight: 'Overnight',
    extended: 'Extended Stay',
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-[#1A1610] text-2xl font-normal mb-1">Overview</h2>
        <p className="text-[#8A8278] text-sm">Real-time booking dashboard</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          value={bookings.length}
          icon={BookOpen}
          accent
        />
        <StatCard
          label="Pending"
          value={pending.length}
          sub="Awaiting confirmation"
          icon={Clock}
        />
        <StatCard
          label="Confirmed"
          value={confirmed.length}
          sub={`${cancelled.length} cancelled`}
          icon={CheckCircle}
        />
        <StatCard
          label="Revenue"
          value={`₱${revenue.toLocaleString()}`}
          sub="From confirmed bookings"
          icon={TrendingUp}
        />
      </div>

      {/* Active promos */}
      <div className="bg-white border border-[#E8E0D4] p-6 rounded">
        <div className="flex items-center gap-2 mb-1">
          <Tag className="w-4 h-4 text-[#C9A87C]" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278]">Active Promotions</p>
        </div>
        <p className="font-serif text-3xl text-[#1A1610]">{activePromos}</p>
      </div>

      {/* Recent bookings */}
      <div className="bg-white border border-[#E8E0D4] rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E0D4]">
          <h3 className="text-sm font-medium text-[#1A1610] tracking-wide">Recent Bookings</h3>
        </div>
        {recent.length === 0 ? (
          <div className="px-6 py-12 text-center text-[#8A8278] text-sm">
            No bookings yet. They'll appear here when guests submit the form.
          </div>
        ) : (
          <div className="divide-y divide-[#F0EBE4]">
            {recent.map(b => (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-[#1A1610] font-medium truncate">{b.name}</p>
                  <p className="text-xs text-[#8A8278]">
                    {packageLabels[b.package]} · {b.arrivalDate} · {b.guests} guest{b.guests > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <p className="text-sm text-[#1A1610] font-medium">
                    ₱{b.totalPrice.toLocaleString()}
                  </p>
                  <span className={cn(
                    'text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full',
                    statusColors[b.status]
                  )}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS: { tab: Tab; label: string; icon: React.ElementType }[] = [
  { tab: 'overview', label: 'Overview', icon: LayoutDashboard },
  { tab: 'bookings', label: 'Bookings', icon: BookOpen },
  { tab: 'calendar', label: 'Calendar', icon: CalendarDays },
  { tab: 'rates', label: 'Rates', icon: DollarSign },
  { tab: 'promos', label: 'Promotions', icon: Tag },
];

// ── Main Dashboard ────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('hoj_admin') === 'true'
  );
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [pendingCount, setPendingCount] = useState(
    () => bookingStore.getAll().filter(b => b.status === 'pending').length
  );

  useEffect(() => {
    const refresh = () => {
      setPendingCount(bookingStore.getAll().filter(b => b.status === 'pending').length);
    };
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={() => {
          sessionStorage.setItem('hoj_admin', 'true');
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#F5F2EE] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A1610] flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/8">
          <p className="text-[#C9A87C] text-[9px] tracking-[0.32em] uppercase mb-1.5">
            Admin Portal
          </p>
          <h1 className="font-serif text-white text-lg font-normal">House of Jaz</h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ tab, label, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors text-left',
                activeTab === tab
                  ? 'bg-[#C9A87C] text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/6'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
              {tab === 'bookings' && pendingCount > 0 && (
                <span className={cn(
                  'ml-auto text-[10px] rounded-full px-1.5 py-0.5 font-medium',
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-[#C9A87C] text-white'
                )}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/8 space-y-0.5">
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.location.hash = ''; }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-white/40 hover:text-white/70 hover:bg-white/6 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>View Website</span>
          </a>
          <button
            onClick={() => {
              sessionStorage.removeItem('hoj_admin');
              setIsAuthenticated(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-white/40 hover:text-white/70 hover:bg-white/6 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'bookings' && <BookingsTable />}
          {activeTab === 'calendar' && <CalendarManagement />}
          {activeTab === 'rates' && <RateManager />}
          {activeTab === 'promos' && <PromoManager />}
        </div>
      </main>
    </div>
  );
}
