import { useState, useEffect } from 'react';
import { Pencil, Plus, X, Check } from 'lucide-react';
import { rateStore, STORE_EVENT } from '@/lib/store';
import type { PackageRate } from '@/lib/types';
import { cn } from '@/lib/utils';

// ── Feature List Editor ───────────────────────────────────────────────────────

function FeatureEditor({
  features,
  onChange,
}: {
  features: string[];
  onChange: (f: string[]) => void;
}) {
  const [newFeature, setNewFeature] = useState('');

  const add = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      onChange([...features, trimmed]);
      setNewFeature('');
    }
  };

  const remove = (idx: number) => onChange(features.filter((_, i) => i !== idx));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); add(); }
  };

  return (
    <div className="space-y-2">
      <ul className="space-y-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[#1A1610]">
            <span className="w-4 h-px bg-[#C9A87C]/60 shrink-0" />
            <span className="flex-1">{f}</span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-[#8A8278] hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          value={newFeature}
          onChange={e => setNewFeature(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add feature…"
          className="flex-1 bg-transparent border-b border-[#E8E0D4] text-sm text-[#1A1610] placeholder-[#C4B9AD] py-1.5 focus:outline-none focus:border-[#C9A87C] transition-colors"
        />
        <button
          type="button"
          onClick={add}
          className="text-[#C9A87C] hover:text-[#A88B5A] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────

function EditRateDialog({
  rate,
  onClose,
  onSave,
}: {
  rate: PackageRate;
  onClose: () => void;
  onSave: (updates: Partial<PackageRate>) => void;
}) {
  const [form, setForm] = useState({
    name: rate.name,
    basePrice: rate.basePrice.toString(),
    unit: rate.unit,
    description: rate.description,
    features: [...rate.features],
  });
  const [error, setError] = useState('');

  const set = (field: keyof typeof form, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const price = Number(form.basePrice);
    if (!form.name.trim()) return setError('Name is required.');
    if (isNaN(price) || price <= 0) return setError('Enter a valid price.');
    if (!form.unit.trim()) return setError('Unit is required.');
    setError('');
    onSave({
      name: form.name.trim(),
      basePrice: price,
      unit: form.unit.trim(),
      description: form.description.trim(),
      features: form.features,
    });
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
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278]">Edit Package</p>
            <h3 className="font-serif text-[#1A1610] text-xl font-normal">{rate.name}</h3>
          </div>
          <button onClick={onClose} className="text-[#8A8278] hover:text-[#1A1610] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <div>
            <label className={labelClass}>Package Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Price + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Base Price (₱)</label>
              <input
                type="number"
                min="0"
                step="100"
                value={form.basePrice}
                onChange={e => set('basePrice', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Unit</label>
              <input
                type="text"
                value={form.unit}
                onChange={e => set('unit', e.target.value)}
                placeholder="e.g. per night"
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Features */}
          <div>
            <label className={labelClass}>Included Features</label>
            <FeatureEditor
              features={form.features}
              onChange={f => set('features', f)}
            />
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Rate Card ─────────────────────────────────────────────────────────────────

function RateCard({
  rate,
  onEdit,
}: {
  rate: PackageRate;
  onEdit: () => void;
}) {
  return (
    <div className={cn(
      'relative flex flex-col p-8 border transition-shadow hover:shadow-md',
      rate.featured
        ? 'bg-[#1A1610] border-[#C9A87C]/30'
        : 'bg-white border-[#E8E0D4]'
    )}>
      {rate.featured && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-[#C9A87C]" />
          <span className="absolute top-5 right-5 text-[9px] tracking-[0.2em] uppercase border border-[#C9A87C]/40 text-[#C9A87C] px-2 py-0.5">
            Most Booked
          </span>
        </>
      )}

      <p className={cn(
        'text-[10px] tracking-[0.2em] uppercase mb-3',
        rate.featured ? 'text-white/40' : 'text-[#8A8278]'
      )}>
        {rate.description}
      </p>

      <h3 className={cn(
        'font-serif text-xl font-normal mb-5',
        rate.featured ? 'text-white' : 'text-[#1A1610]'
      )}>
        {rate.name}
      </h3>

      {/* Price */}
      <div className={cn(
        'mb-6 pb-6 border-b',
        rate.featured ? 'border-white/10' : 'border-[#E8E0D4]'
      )}>
        <span className={cn(
          'text-xs tracking-widest uppercase block mb-0.5',
          rate.featured ? 'text-white/30' : 'text-[#8A8278]'
        )}>
          from
        </span>
        <span className="font-serif text-[#C9A87C] text-4xl font-normal leading-none">
          ₱{rate.basePrice.toLocaleString()}
        </span>
        <span className={cn(
          'text-xs tracking-widest uppercase block mt-1',
          rate.featured ? 'text-white/30' : 'text-[#8A8278]'
        )}>
          {rate.unit}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-2 flex-1 mb-6">
        {rate.features.map((f, i) => (
          <li key={i} className={cn(
            'flex items-center gap-2 text-sm',
            rate.featured ? 'text-white/60' : 'text-[#8A8278]'
          )}>
            <span className="w-3 h-px bg-[#C9A87C]/60 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Edit button */}
      <button
        onClick={onEdit}
        className={cn(
          'flex items-center justify-center gap-2 py-2.5 text-[11px] tracking-[0.14em] uppercase transition-colors',
          rate.featured
            ? 'bg-[#C9A87C]/20 text-[#C9A87C] hover:bg-[#C9A87C] hover:text-white'
            : 'border border-[#1A1610]/30 text-[#1A1610] hover:border-[#C9A87C] hover:text-[#C9A87C]'
        )}
      >
        <Pencil className="w-3 h-3" />
        Edit Rate
      </button>
    </div>
  );
}

// ── Rate Manager ──────────────────────────────────────────────────────────────

export function RateManager() {
  const [rates, setRates] = useState<PackageRate[]>(() => rateStore.getAll());
  const [editing, setEditing] = useState<PackageRate | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => setRates(rateStore.getAll());
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleSave = (updates: Partial<PackageRate>) => {
    if (!editing) return;
    rateStore.update(editing.id, updates);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-serif text-[#1A1610] text-2xl font-normal mb-1">Package Rates</h2>
          <p className="text-[#8A8278] text-sm">
            Edit pricing and features — changes reflect on the website instantly.
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 px-4 py-2 rounded border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            Saved successfully
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {rates.map(rate => (
          <RateCard key={rate.id} rate={rate} onEdit={() => setEditing(rate)} />
        ))}
      </div>

      {editing && (
        <EditRateDialog
          rate={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
