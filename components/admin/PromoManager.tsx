import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, ToggleLeft, ToggleRight, Tag } from 'lucide-react';
import { promoStore, STORE_EVENT } from '@/lib/store';
import type { Promo } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ── Promo Form Dialog ─────────────────────────────────────────────────────────

type PromoFormData = {
  code: string;
  type: 'percentage' | 'fixed';
  value: string;
  minBookingAmount: string;
  validFrom: string;
  validUntil: string;
  usageLimit: string;
  description: string;
  isActive: boolean;
};

const EMPTY_FORM: PromoFormData = {
  code: '',
  type: 'percentage',
  value: '',
  minBookingAmount: '',
  validFrom: '',
  validUntil: '',
  usageLimit: '',
  description: '',
  isActive: true,
};

function promoToForm(p: Promo): PromoFormData {
  return {
    code: p.code,
    type: p.type,
    value: p.value.toString(),
    minBookingAmount: p.minBookingAmount?.toString() ?? '',
    validFrom: p.validFrom,
    validUntil: p.validUntil,
    usageLimit: p.usageLimit?.toString() ?? '',
    description: p.description ?? '',
    isActive: p.isActive,
  };
}

function PromoFormDialog({
  promo,
  onClose,
  onSave,
}: {
  promo: Promo | null; // null = new
  onClose: () => void;
  onSave: (data: PromoFormData) => void;
}) {
  const [form, setForm] = useState<PromoFormData>(promo ? promoToForm(promo) : EMPTY_FORM);
  const [error, setError] = useState('');

  const set = <K extends keyof PromoFormData>(field: K, value: PromoFormData[K]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.code.trim()) return setError('Promo code is required.');
    const value = Number(form.value);
    if (isNaN(value) || value <= 0) return setError('Enter a valid discount value.');
    if (form.type === 'percentage' && value > 100)
      return setError('Percentage discount cannot exceed 100%.');
    if (!form.validFrom) return setError('Start date is required.');
    if (!form.validUntil) return setError('End date is required.');
    if (form.validFrom > form.validUntil)
      return setError('End date must be after start date.');
    setError('');
    onSave({ ...form, code: form.code.toUpperCase().trim() });
  };

  const inputClass =
    'w-full bg-transparent border-b border-[#E8E0D4] text-[#1A1610] text-sm placeholder-[#C4B9AD] py-2.5 focus:outline-none focus:border-[#C9A87C] transition-colors';
  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-md rounded shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E0D4]">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278]">
              {promo ? 'Edit Promotion' : 'New Promotion'}
            </p>
            <h3 className="font-serif text-[#1A1610] text-xl font-normal">
              {promo ? promo.code : 'Add Promo Code'}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#8A8278] hover:text-[#1A1610] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Code */}
          <div>
            <label className={labelClass}>Promo Code</label>
            <input
              type="text"
              value={form.code}
              onChange={e => set('code', e.target.value.toUpperCase())}
              placeholder="e.g. SUMMER25"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description (optional)</label>
            <input
              type="text"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="e.g. Summer promo — 25% off"
              className={inputClass}
            />
          </div>

          {/* Type + Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Discount Type</label>
              <select
                title="Discount type"
                value={form.type}
                onChange={e => set('type', e.target.value as 'percentage' | 'fixed')}
                className={inputClass}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₱)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>
                {form.type === 'percentage' ? 'Percentage' : 'Amount (₱)'}
              </label>
              <input
                type="number"
                min="0"
                max={form.type === 'percentage' ? 100 : undefined}
                step={form.type === 'percentage' ? 1 : 100}
                value={form.value}
                onChange={e => set('value', e.target.value)}
                placeholder={form.type === 'percentage' ? '25' : '500'}
                className={inputClass}
              />
            </div>
          </div>

          {/* Min booking amount */}
          <div>
            <label className={labelClass}>Minimum Booking Amount (₱) — optional</label>
            <input
              type="number"
              min="0"
              step="100"
              value={form.minBookingAmount}
              onChange={e => set('minBookingAmount', e.target.value)}
              placeholder="Leave blank for no minimum"
              className={inputClass}
            />
          </div>

          {/* Valid from / until */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Valid From</label>
              <input
                type="date"
                value={form.validFrom}
                onChange={e => set('validFrom', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Valid Until</label>
              <input
                type="date"
                value={form.validUntil}
                onChange={e => set('validUntil', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Usage limit */}
          <div>
            <label className={labelClass}>Usage Limit — optional</label>
            <input
              type="number"
              min="1"
              value={form.usageLimit}
              onChange={e => set('usageLimit', e.target.value)}
              placeholder="Leave blank for unlimited"
              className={inputClass}
            />
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-[#1A1610]">Active</p>
              <p className="text-xs text-[#8A8278]">Guests can apply this code at checkout</p>
            </div>
            <button
              type="button"
              onClick={() => set('isActive', !form.isActive)}
              className={cn(
                'transition-colors',
                form.isActive ? 'text-[#C9A87C]' : 'text-[#C4B9AD]'
              )}
            >
              {form.isActive
                ? <ToggleRight className="w-8 h-8" />
                : <ToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E0D4] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#8A8278] hover:text-[#1A1610] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 bg-[#1A1610] text-white text-[11px] tracking-[0.14em] uppercase hover:bg-[#C9A87C] transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            {promo ? 'Save Changes' : 'Create Promo'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Promo Manager ─────────────────────────────────────────────────────────────

export function PromoManager() {
  const [promos, setPromos] = useState<Promo[]>(() => promoStore.getAll());
  const [dialogPromo, setDialogPromo] = useState<Promo | null | undefined>(undefined);
  // undefined = closed, null = new, Promo = editing

  useEffect(() => {
    const refresh = () => setPromos(promoStore.getAll());
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleSave = (data: PromoFormData) => {
    if (dialogPromo) {
      // editing existing
      promoStore.update(dialogPromo.id, {
        code: data.code,
        type: data.type,
        value: Number(data.value),
        minBookingAmount: data.minBookingAmount ? Number(data.minBookingAmount) : undefined,
        validFrom: data.validFrom,
        validUntil: data.validUntil,
        usageLimit: data.usageLimit ? Number(data.usageLimit) : undefined,
        description: data.description || undefined,
        isActive: data.isActive,
      });
    } else {
      promoStore.add({
        code: data.code,
        type: data.type,
        value: Number(data.value),
        minBookingAmount: data.minBookingAmount ? Number(data.minBookingAmount) : undefined,
        validFrom: data.validFrom,
        validUntil: data.validUntil,
        usageLimit: data.usageLimit ? Number(data.usageLimit) : undefined,
        description: data.description || undefined,
        isActive: data.isActive,
      });
    }
    setDialogPromo(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this promo code?')) {
      promoStore.delete(id);
    }
  };

  const toggleActive = (promo: Promo) => {
    promoStore.update(promo.id, { isActive: !promo.isActive });
  };

  const isExpired = (p: Promo) => new Date(p.validUntil) < new Date();
  const isUpcoming = (p: Promo) => new Date(p.validFrom) > new Date();

  const getStatusLabel = (p: Promo): { label: string; cls: string } => {
    if (!p.isActive) return { label: 'Inactive', cls: 'text-[#8A8278] bg-[#F0EBE4]' };
    if (isExpired(p)) return { label: 'Expired', cls: 'text-red-500 bg-red-50' };
    if (isUpcoming(p)) return { label: 'Upcoming', cls: 'text-blue-600 bg-blue-50' };
    return { label: 'Active', cls: 'text-emerald-600 bg-emerald-50' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-serif text-[#1A1610] text-2xl font-normal mb-1">Promotions</h2>
          <p className="text-[#8A8278] text-sm">Create and manage promo codes for guests.</p>
        </div>
        <button
          onClick={() => setDialogPromo(null)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1610] text-white text-[11px] tracking-[0.14em] uppercase hover:bg-[#C9A87C] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Promo
        </button>
      </div>

      {promos.length === 0 ? (
        <div className="bg-white border border-[#E8E0D4] rounded p-16 text-center">
          <Tag className="w-10 h-10 text-[#E8E0D4] mx-auto mb-4" />
          <p className="text-[#8A8278] text-sm mb-4">No promo codes yet.</p>
          <button
            onClick={() => setDialogPromo(null)}
            className="text-[#C9A87C] text-sm hover:underline"
          >
            Create your first promo →
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E0D4] rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[#E8E0D4] bg-[#FAF8F4]">
              <tr>
                {['Code', 'Discount', 'Validity', 'Usage', 'Status', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A8278] font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE4]">
              {promos.map(p => {
                const { label, cls } = getStatusLabel(p);
                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F4] transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-mono font-medium text-[#1A1610] tracking-wider">{p.code}</p>
                        {p.description && (
                          <p className="text-xs text-[#8A8278] mt-0.5">{p.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[#C9A87C] font-medium">
                        {p.type === 'percentage' ? `${p.value}% off` : `₱${p.value.toLocaleString()} off`}
                      </p>
                      {p.minBookingAmount && (
                        <p className="text-xs text-[#8A8278]">
                          Min ₱{p.minBookingAmount.toLocaleString()}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs text-[#8A8278]">
                      <p>{format(parseISO(p.validFrom), 'MMM d, yyyy')}</p>
                      <p>→ {format(parseISO(p.validUntil), 'MMM d, yyyy')}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#8A8278]">
                      <p>{p.usageCount} used</p>
                      {p.usageLimit && <p>of {p.usageLimit} limit</p>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        'text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full',
                        cls
                      )}>
                        {label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => toggleActive(p)}
                          title={p.isActive ? 'Deactivate' : 'Activate'}
                          className={cn(
                            'transition-colors',
                            p.isActive ? 'text-[#C9A87C] hover:text-[#8A8278]' : 'text-[#C4B9AD] hover:text-[#C9A87C]'
                          )}
                        >
                          {p.isActive
                            ? <ToggleRight className="w-5 h-5" />
                            : <ToggleLeft className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => setDialogPromo(p)}
                          className="text-[#8A8278] hover:text-[#1A1610] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-[#8A8278] hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {dialogPromo !== undefined && (
        <PromoFormDialog
          promo={dialogPromo}
          onClose={() => setDialogPromo(undefined)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
