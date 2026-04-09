import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Ban, CheckCheck, Info } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, getDay, getDaysInMonth, isSameDay, parseISO } from 'date-fns';
import { bookingStore, blockedDateStore, STORE_EVENT } from '@/lib/store';
import type { Booking, BlockedDate } from '@/lib/types';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const PACKAGE_LABELS: Record<string, string> = {
  'day-escape': 'Day Escape',
  overnight: 'Overnight',
  extended: 'Extended Stay',
};

const STATUS_COLORS: Record<Booking['status'], string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-500',
};

// ── Day Detail Panel ──────────────────────────────────────────────────────────

function DayPanel({
  date,
  bookings,
  isBlocked,
  blockedReason,
  onClose,
  onToggleBlock,
  onUpdateReason,
}: {
  date: Date;
  bookings: Booking[];
  isBlocked: boolean;
  blockedReason?: string;
  onClose: () => void;
  onToggleBlock: () => void;
  onUpdateReason: (reason: string) => void;
}) {
  const [reason, setReason] = useState(blockedReason ?? '');

  return (
    <div className="bg-white border border-[#E8E0D4] rounded overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D4]">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278]">
            {format(date, 'EEEE')}
          </p>
          <h3 className="font-serif text-[#1A1610] text-lg font-normal">
            {format(date, 'MMMM d, yyyy')}
          </h3>
        </div>
        <button onClick={onClose} className="text-[#8A8278] hover:text-[#1A1610] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Block/unblock control */}
        <div className={cn(
          'p-4 rounded border',
          isBlocked ? 'bg-[#1A1610]/5 border-[#1A1610]/20' : 'bg-[#FAF8F4] border-[#E8E0D4]'
        )}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-[#1A1610]">
              {isBlocked ? 'This date is blocked' : 'Availability'}
            </p>
            <button
              onClick={onToggleBlock}
              className={cn(
                'flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 transition-colors',
                isBlocked
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-[#1A1610] text-white hover:bg-[#C9A87C]'
              )}
            >
              {isBlocked ? <CheckCheck className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
              {isBlocked ? 'Unblock' : 'Block Date'}
            </button>
          </div>
          {isBlocked && (
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#8A8278] mb-1.5">
                Reason (optional)
              </label>
              <input
                type="text"
                value={reason}
                onChange={e => setReason(e.target.value)}
                onBlur={() => onUpdateReason(reason)}
                placeholder="e.g. Private event, Maintenance…"
                className="w-full bg-transparent border-b border-[#D4C9BC] text-[#1A1610] text-sm py-1.5 focus:outline-none focus:border-[#C9A87C] transition-colors placeholder-[#C4B9AD]"
              />
            </div>
          )}
        </div>

        {/* Bookings */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-3">
            Bookings ({bookings.length})
          </p>
          {bookings.length === 0 ? (
            <p className="text-sm text-[#8A8278] italic">No bookings on this date.</p>
          ) : (
            <div className="space-y-2">
              {bookings.map(b => (
                <div key={b.id} className="border border-[#E8E0D4] p-3 rounded">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-[#1A1610]">{b.name}</p>
                      <p className="text-xs text-[#8A8278]">{b.email}</p>
                    </div>
                    <span className={cn(
                      'text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full shrink-0',
                      STATUS_COLORS[b.status]
                    )}>
                      {b.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8A8278]">
                    <span>{PACKAGE_LABELS[b.package]}</span>
                    <span>{b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                    <span className="text-[#C9A87C] font-medium">₱{b.totalPrice.toLocaleString()}</span>
                  </div>
                  {b.message && (
                    <p className="mt-2 text-xs text-[#8A8278] italic">"{b.message}"</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Calendar Grid ─────────────────────────────────────────────────────────────

export function CalendarManagement() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>(() => bookingStore.getAll());
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(() => blockedDateStore.getAll());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const refresh = () => {
      setBookings(bookingStore.getAll());
      setBlockedDates(blockedDateStore.getAll());
    };
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Build calendar cells
  const monthStart = startOfMonth(currentMonth);
  const startWeekday = getDay(monthStart); // 0 = Sun
  const daysInMonth = getDaysInMonth(currentMonth);

  const cells: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const getDateStr = (d: Date) => format(d, 'yyyy-MM-dd');

  const getDayBookings = (d: Date) =>
    bookings.filter(b => b.arrivalDate === getDateStr(d));

  const isBlocked = (d: Date) =>
    blockedDates.some(bd => bd.date === getDateStr(d));

  const isToday = (d: Date) => isSameDay(d, new Date());

  const isSelected = (d: Date) => selectedDate !== null && isSameDay(d, selectedDate);

  const isPast = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  // Stats for the month
  const monthStr = format(currentMonth, 'yyyy-MM');
  const monthBookings = bookings.filter(b => b.arrivalDate.startsWith(monthStr));
  const monthBlocked = blockedDates.filter(d => d.date.startsWith(monthStr));

  // Selected day data
  const selectedDayBookings = selectedDate ? getDayBookings(selectedDate) : [];
  const selectedDateStr = selectedDate ? getDateStr(selectedDate) : '';
  const selectedIsBlocked = selectedDate ? isBlocked(selectedDate) : false;
  const selectedBlockedEntry = blockedDates.find(d => d.date === selectedDateStr);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-[#1A1610] text-2xl font-normal mb-1">Calendar</h2>
        <p className="text-[#8A8278] text-sm">Manage bookings and availability in real-time</p>
      </div>

      {/* Month stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Bookings this month', value: monthBookings.length },
          { label: 'Confirmed', value: monthBookings.filter(b => b.status === 'confirmed').length },
          { label: 'Blocked dates', value: monthBlocked.length },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E8E0D4] rounded px-4 py-3">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">{s.label}</p>
            <p className="font-serif text-2xl text-[#1A1610]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* Calendar */}
        <div className="bg-white border border-[#E8E0D4] rounded overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E0D4]">
            <button
              onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
              className="p-1.5 text-[#8A8278] hover:text-[#1A1610] hover:bg-[#FAF8F4] rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-serif text-[#1A1610] text-lg font-normal">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button
              onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
              className="p-1.5 text-[#8A8278] hover:text-[#1A1610] hover:bg-[#FAF8F4] rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-[#E8E0D4]">
            {WEEKDAYS.map(d => (
              <div key={d} className="py-2 text-center text-[10px] tracking-[0.15em] uppercase text-[#8A8278]">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              if (!day) {
                return <div key={idx} className="h-16 border-r border-b border-[#F0EBE4] last:border-r-0" />;
              }

              const dayBookings = getDayBookings(day);
              const blocked = isBlocked(day);
              const today = isToday(day);
              const past = isPast(day);
              const selected = isSelected(day);
              const confirmed = dayBookings.filter(b => b.status === 'confirmed').length;
              const pending = dayBookings.filter(b => b.status === 'pending').length;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(prev => (prev && isSameDay(prev, day) ? null : day))}
                  className={cn(
                    'h-16 p-1.5 border-r border-b border-[#F0EBE4] last:border-r-0 text-left transition-colors relative group',
                    blocked
                      ? 'bg-[#1A1610] hover:bg-[#2A2218]'
                      : selected
                        ? 'bg-[#C9A87C]/10 ring-1 ring-inset ring-[#C9A87C]'
                        : past
                          ? 'opacity-40 cursor-default'
                          : 'hover:bg-[#FAF8F4] cursor-pointer',
                  )}
                >
                  <span className={cn(
                    'text-xs font-medium block',
                    blocked ? 'text-white/70' : today ? 'text-[#C9A87C]' : 'text-[#1A1610]',
                    today && !blocked && 'underline underline-offset-2',
                  )}>
                    {day.getDate()}
                  </span>

                  {/* Booking dots */}
                  {!blocked && dayBookings.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mt-0.5">
                      {confirmed > 0 && (
                        <span className="text-[9px] px-1 py-0.5 bg-emerald-100 text-emerald-700 rounded leading-none">
                          {confirmed}✓
                        </span>
                      )}
                      {pending > 0 && (
                        <span className="text-[9px] px-1 py-0.5 bg-amber-100 text-amber-700 rounded leading-none">
                          {pending}⏳
                        </span>
                      )}
                    </div>
                  )}

                  {blocked && (
                    <span className="text-[9px] text-white/40 block mt-0.5">Blocked</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="px-6 py-3 border-t border-[#E8E0D4] flex items-center gap-5 text-xs text-[#8A8278]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-100 rounded" />
              Confirmed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-amber-100 rounded" />
              Pending
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#1A1610] rounded" />
              Blocked
            </span>
          </div>
        </div>

        {/* Day detail panel */}
        <div>
          {selectedDate ? (
            <DayPanel
              date={selectedDate}
              bookings={selectedDayBookings}
              isBlocked={selectedIsBlocked}
              blockedReason={selectedBlockedEntry?.reason}
              onClose={() => setSelectedDate(null)}
              onToggleBlock={() => {
                blockedDateStore.toggle(selectedDateStr);
              }}
              onUpdateReason={reason => {
                blockedDateStore.setReason(selectedDateStr, reason);
              }}
            />
          ) : (
            <div className="bg-white border border-[#E8E0D4] rounded p-6 text-center">
              <Info className="w-8 h-8 text-[#E8E0D4] mx-auto mb-3" />
              <p className="text-sm text-[#8A8278]">
                Click any day to view bookings or manage availability.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
