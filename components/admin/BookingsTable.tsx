import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Trash2, ChevronDown, BookOpen } from 'lucide-react';
import { bookingStore, STORE_EVENT } from '@/lib/store';
import type { Booking } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

type StatusFilter = 'all' | Booking['status'];

const PACKAGE_LABELS: Record<string, string> = {
  'day-escape': 'Day Escape',
  overnight: 'Overnight',
  extended: 'Extended Stay',
};

const STATUS_STYLES: Record<Booking['status'], string> = {
  pending: 'text-amber-700 bg-amber-50 border-amber-200',
  confirmed: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  cancelled: 'text-red-500 bg-red-50 border-red-200',
};

// ── Booking Detail Drawer ─────────────────────────────────────────────────────

function BookingDetail({
  booking,
  onClose,
  onConfirm,
  onCancel,
  onDelete,
}: {
  booking: Booking;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <button
        className="flex-1 bg-black/30 cursor-default"
        onClick={onClose}
        aria-label="Close"
      />
      {/* Drawer */}
      <div className="w-full max-w-sm bg-white h-full overflow-y-auto flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E0D4] flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278] mb-1">
              Booking #{booking.id.slice(0, 8).toUpperCase()}
            </p>
            <h3 className="font-serif text-[#1A1610] text-xl font-normal">{booking.name}</h3>
          </div>
          <span className={cn(
            'text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 border rounded-full shrink-0 mt-1',
            STATUS_STYLES[booking.status]
          )}>
            {booking.status}
          </span>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-3">Guest Info</p>
            <div className="space-y-2 text-sm">
              <p className="text-[#1A1610]">{booking.email}</p>
              {booking.phone && <p className="text-[#8A8278]">{booking.phone}</p>}
            </div>
          </div>

          {/* Booking details */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-3">Booking Details</p>
            <div className="space-y-3">
              {[
                { label: 'Arrival Date', value: booking.arrivalDate },
                { label: 'Package', value: PACKAGE_LABELS[booking.package] ?? booking.package },
                { label: 'Guests', value: `${booking.guests} guest${booking.guests > 1 ? 's' : ''}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-[#8A8278]">{label}</span>
                  <span className="text-[#1A1610] font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#FAF8F4] rounded p-4 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-2">Pricing</p>
            {booking.promoCode && booking.discountAmount != null && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A8278]">Base price</span>
                  <span className="text-[#1A1610]">
                    ₱{(booking.totalPrice + booking.discountAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600">Promo: {booking.promoCode}</span>
                  <span className="text-emerald-600">−₱{booking.discountAmount.toLocaleString()}</span>
                </div>
                <div className="h-px bg-[#E8E0D4]" />
              </>
            )}
            <div className="flex justify-between">
              <span className="text-sm font-medium text-[#1A1610]">Total</span>
              <span className="font-serif text-[#C9A87C] text-lg">
                ₱{booking.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Message */}
          {booking.message && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-2">
                Special Requests
              </p>
              <p className="text-sm text-[#1A1610] italic">"{booking.message}"</p>
            </div>
          )}

          {/* Created at */}
          <p className="text-xs text-[#8A8278]">
            Submitted {format(parseISO(booking.createdAt), 'MMM d, yyyy · h:mm a')}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-5 border-t border-[#E8E0D4] space-y-2">
          {booking.status === 'pending' && (
            <button
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white text-[11px] tracking-[0.14em] uppercase hover:bg-emerald-700 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Confirm Booking
            </button>
          )}
          {booking.status !== 'cancelled' && (
            <button
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#E8E0D4] text-[#8A8278] text-[11px] tracking-[0.14em] uppercase hover:border-red-300 hover:text-red-500 transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              Cancel Booking
            </button>
          )}
          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-[#8A8278] text-[11px] tracking-[0.14em] uppercase hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Record
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Bookings Table ─────────────────────────────────────────────────────────────

export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>(() => bookingStore.getAll());
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    const refresh = () => {
      setBookings(bookingStore.getAll());
      // keep selected in sync
      setSelected(prev =>
        prev ? (bookingStore.getAll().find(b => b.id === prev.id) ?? null) : null
      );
    };
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const filtered = bookings
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.arrivalDate.includes(q) ||
        (b.promoCode?.toLowerCase().includes(q) ?? false)
      );
    })
    .sort((a, b) =>
      sortDesc
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const handleConfirm = (b: Booking) => {
    bookingStore.updateStatus(b.id, 'confirmed');
  };

  const handleCancel = (b: Booking) => {
    if (confirm(`Cancel booking for ${b.name}?`)) {
      bookingStore.updateStatus(b.id, 'cancelled');
    }
  };

  const handleDelete = (b: Booking) => {
    if (confirm(`Delete booking for ${b.name}? This cannot be undone.`)) {
      bookingStore.delete(b.id);
      setSelected(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-[#1A1610] text-2xl font-normal mb-1">Bookings</h2>
        <p className="text-[#8A8278] text-sm">Manage all guest reservation requests.</p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status tabs */}
        <div className="flex bg-white border border-[#E8E0D4] rounded overflow-hidden">
          {(['all', 'pending', 'confirmed', 'cancelled'] as StatusFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'px-3.5 py-2 text-xs capitalize transition-colors border-r border-[#E8E0D4] last:border-r-0',
                filter === s
                  ? 'bg-[#1A1610] text-white'
                  : 'text-[#8A8278] hover:text-[#1A1610] hover:bg-[#FAF8F4]'
              )}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8A8278]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, date…"
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E0D4] text-sm text-[#1A1610] placeholder-[#C4B9AD] focus:outline-none focus:border-[#C9A87C] rounded transition-colors"
          />
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortDesc(prev => !prev)}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E8E0D4] rounded text-xs text-[#8A8278] hover:text-[#1A1610] transition-colors"
        >
          <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', !sortDesc && 'rotate-180')} />
          {sortDesc ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E8E0D4] rounded p-16 text-center">
          <BookOpen className="w-10 h-10 text-[#E8E0D4] mx-auto mb-4" />
          <p className="text-[#8A8278] text-sm">
            {bookings.length === 0
              ? 'No bookings yet. They will appear here when guests submit the reservation form.'
              : 'No bookings match your filter.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E0D4] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#E8E0D4] bg-[#FAF8F4]">
                <tr>
                  {['Date', 'Guest', 'Package', 'Guests', 'Total', 'Status', ''].map(h => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A8278] font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE4]">
                {filtered.map(b => (
                  <tr
                    key={b.id}
                    className="hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                    onClick={() => setSelected(b)}
                  >
                    <td className="px-5 py-4 whitespace-nowrap text-[#1A1610]">
                      {b.arrivalDate}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#1A1610]">{b.name}</p>
                      <p className="text-xs text-[#8A8278]">{b.email}</p>
                    </td>
                    <td className="px-5 py-4 text-[#8A8278] whitespace-nowrap">
                      {PACKAGE_LABELS[b.package] ?? b.package}
                    </td>
                    <td className="px-5 py-4 text-[#8A8278] text-center">
                      {b.guests}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-[#C9A87C] font-medium">₱{b.totalPrice.toLocaleString()}</p>
                      {b.promoCode && (
                        <p className="text-[10px] text-emerald-600">{b.promoCode}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        'text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 border rounded-full',
                        STATUS_STYLES[b.status]
                      )}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        {b.status === 'pending' && (
                          <button
                            onClick={() => handleConfirm(b)}
                            title="Confirm"
                            className="text-emerald-500 hover:text-emerald-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(b)}
                            title="Cancel"
                            className="text-[#8A8278] hover:text-red-500 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(b)}
                          title="Delete"
                          className="text-[#8A8278] hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <BookingDetail
          booking={selected}
          onClose={() => setSelected(null)}
          onConfirm={() => handleConfirm(selected)}
          onCancel={() => handleCancel(selected)}
          onDelete={() => handleDelete(selected)}
        />
      )}
    </div>
  );
}
