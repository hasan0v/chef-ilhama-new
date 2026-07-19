'use client';

import { useState, useEffect, useCallback } from 'react';

type AdminView = 'list' | 'create' | 'edit';
type AdminTab = 'reseptler' | 'cedveller';
type TableTab = 'kateqoriya' | 'mense' | 'bolge' | 'cetinlik' | 'muddet' | 'porsiya';
interface LookupItem { id: string; ad: string; adEn?: string | null; miqdar?: string | null; }
interface LookupData { categories: LookupItem[]; menseler: LookupItem[]; bolgeler: LookupItem[]; cetinlikler: LookupItem[]; muddetler: LookupItem[]; porsiyalar: LookupItem[]; }

interface AdminIngredient {
  sira: number;
  ad: string;
  adEn?: string | null;
  miqdar?: {
    ad: string;
    adEn?: string | null;
    miqdar?: string | null;
  } | null;
}

interface RecipeListItem {
  id: string;
  yemeyinAdi: string;
  slug: string;
  kateqoriya: string;
  cetinlikDerecesi: string;
  mense: string | null;
  bolge: string | null;
  featured: boolean;
  sekilLinki: string;
  updatedAt: string;
}

interface RecipeFormData {
  yemeyinAdi: string;
  yemeyinAdiEn: string;
  mense: string;
  menseEn: string;
  bolge: string;
  bolgeEn: string;
  kateqoriya: string;
  terkibHisseleri: string[];
  terkibHisseleriEn: string[];
  addimlar: string[];
  addimlarEn: string[];
  hazirlanmaMuddeti: string;
  cetinlikDerecesi: string;
  porsiyaSayi: string;
  tarixiMelumat: string;
  tarixiMelumatEn: string;
  teqdimTeklifleri: string;
  teqdimTeklifleriEn: string;
  sekilLinki: string;
  featured: boolean;
}

const emptyForm: RecipeFormData = {
  yemeyinAdi: '',
  yemeyinAdiEn: '',
  mense: '',
  menseEn: '',
  bolge: '',
  bolgeEn: '',
  kateqoriya: '',
  terkibHisseleri: [''],
  terkibHisseleriEn: [''],
  addimlar: [''],
  addimlarEn: [''],
  hazirlanmaMuddeti: '',
  cetinlikDerecesi: 'Orta',
  porsiyaSayi: '',
  tarixiMelumat: '',
  tarixiMelumatEn: '',
  teqdimTeklifleri: '',
  teqdimTeklifleriEn: '',
  sekilLinki: '',
  featured: false,
};

// ─── Auth helpers ────────────────────────────────────────
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem('admin_session') || 'null')?.access_token; }
  catch { return null; }
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

// ─── Login Screen ────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Giriş uğursuz oldu');
      return;
    }

    localStorage.setItem('admin_session', JSON.stringify(data.session));
    onLogin();
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#f7efe2] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8d3a24]/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8d3a24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#241c18]">Admin Panel</h1>
          <p className="mt-1 text-sm text-[rgba(57,44,35,0.56)]">Chef İlhamə idarəetmə</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[rgba(98,67,45,0.1)] bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)]">E-poçt</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8d3a24]/40 focus:ring-2 focus:ring-[#8d3a24]/10"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)]">Şifrə</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8d3a24]/40 focus:ring-2 focus:ring-[#8d3a24]/10"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#8d3a24] py-3 text-sm font-semibold text-white transition hover:bg-[#7a3220] disabled:opacity-50"
          >
            {loading ? 'Giriş edilir...' : 'Daxil ol'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Image Upload ────────────────────────────────────────
function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      onChange(data.url);
    }
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }

  return (
    <div className="space-y-2">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)]">Şəkil</label>
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[140px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition ${
          dragOver ? 'border-[#8d3a24] bg-[#8d3a24]/5' : 'border-[rgba(98,67,45,0.2)] bg-[rgba(98,67,45,0.03)]'
        }`}
        onClick={() => document.getElementById('img-input')?.click()}
      >
        {value ? (
          <div className="relative h-36 w-full overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-contain" />
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onChange(''); }}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition hover:bg-black/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        ) : (
          <div className="p-6 text-center">
            {uploading ? (
              <div className="text-sm text-[rgba(57,44,35,0.56)]">Yüklənir...</div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 h-8 w-8 text-[rgba(57,44,35,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                <p className="text-sm text-[rgba(57,44,35,0.5)]">Surəti buraya atın və ya klikləyin</p>
                <p className="mt-1 text-xs text-[rgba(57,44,35,0.35)]">JPG, PNG, WebP · Max 5MB</p>
              </>
            )}
          </div>
        )}
        <input
          id="img-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="və ya URL daxil edin"
        className="w-full rounded-lg border border-[rgba(98,67,45,0.14)] bg-white px-3 py-2 text-xs outline-none transition focus:border-[#8d3a24]/40"
      />
    </div>
  );
}

// ─── Recipe Form ─────────────────────────────────────────
function RecipeForm({ initial, onSubmit, onCancel, submitLabel, categoryList, cetinlikList, muddetList, porsiyaList }: {
  initial: RecipeFormData;
  onSubmit: (data: RecipeFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  categoryList: string[];
  cetinlikList: string[];
  muddetList: string[];
  porsiyaList: string[];
}) {
  const [form, setForm] = useState<RecipeFormData>(initial);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof RecipeFormData>(key: K, value: RecipeFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSubmit(form);
    setSaving(false);
  }

  const inputCls = 'w-full rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#8d3a24]/40 focus:ring-2 focus:ring-[#8d3a24]/10';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)]';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Yeməyin adı (AZ) *</label>
          <input className={inputCls} value={form.yemeyinAdi} onChange={e => set('yemeyinAdi', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Yeməyin adı (EN)</label>
          <input className={inputCls} value={form.yemeyinAdiEn || ''} onChange={e => set('yemeyinAdiEn', e.target.value)} />
        </div>

        <div>
          <label className={labelCls}>Kateqoriya *</label>
          <select className={inputCls} value={form.kateqoriya} onChange={e => set('kateqoriya', e.target.value)} required>
            <option value="">Seçin</option>
            {categoryList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Çətinlik *</label>
          <select className={inputCls} value={form.cetinlikDerecesi} onChange={e => set('cetinlikDerecesi', e.target.value)} required>
            <option value="">Seçin</option>
            {cetinlikList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Mənşə (AZ)</label>
          <input className={inputCls} value={form.mense} onChange={e => set('mense', e.target.value)} placeholder="Azərbaycan" />
        </div>
        <div>
          <label className={labelCls}>Mənşə (EN)</label>
          <input className={inputCls} value={form.menseEn || ''} onChange={e => set('menseEn', e.target.value)} placeholder="Azerbaijan" />
        </div>

        <div>
          <label className={labelCls}>Bölgə (AZ)</label>
          <input className={inputCls} value={form.bolge} onChange={e => set('bolge', e.target.value)} placeholder="Bakı" />
        </div>
        <div>
          <label className={labelCls}>Bölgə (EN)</label>
          <input className={inputCls} value={form.bolgeEn || ''} onChange={e => set('bolgeEn', e.target.value)} placeholder="Baku" />
        </div>

        <div>
          <label className={labelCls}>Hazırlanma müddəti *</label>
          <select className={inputCls} value={form.hazirlanmaMuddeti} onChange={e => set('hazirlanmaMuddeti', e.target.value)} required>
            <option value="">Seçin</option>
            {muddetList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Porsiya sayı *</label>
          <select className={inputCls} value={form.porsiyaSayi} onChange={e => set('porsiyaSayi', e.target.value)} required>
            <option value="">Seçin</option>
            {porsiyaList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <ImageUpload value={form.sekilLinki} onChange={url => set('sekilLinki', url)} />

      <div>
        <label className={labelCls}>Tərkib hissələri *</label>
        <div className="space-y-3">
          {form.terkibHisseleri.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-[rgba(98,67,45,0.08)] bg-[rgba(98,67,45,0.02)] p-3 sm:flex-row sm:items-center sm:bg-transparent sm:p-0 sm:border-0 sm:gap-3">
              <div className="flex flex-1 gap-2">
                <span className="flex h-10 w-6 items-center justify-center text-xs font-bold text-[rgba(57,44,35,0.4)]">{i + 1}</span>
                <input
                  className={`${inputCls} flex-1`}
                  value={item}
                  onChange={e => {
                    const arr = [...form.terkibHisseleri];
                    arr[i] = e.target.value;
                    set('terkibHisseleri', arr);
                  }}
                  placeholder="Tərkib (AZ) - Məs: Un – 500 qr"
                />
              </div>
              <input
                className={`${inputCls} flex-1`}
                value={form.terkibHisseleriEn?.[i] || ''}
                onChange={e => {
                  const arr = [...(form.terkibHisseleriEn || [])];
                  arr[i] = e.target.value;
                  set('terkibHisseleriEn', arr);
                }}
                placeholder="Tərkib (EN) - Məs: Flour – 500 g"
              />
              {form.terkibHisseleri.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    set('terkibHisseleri', form.terkibHisseleri.filter((_, j) => j !== i));
                    set('terkibHisseleriEn', (form.terkibHisseleriEn || []).filter((_, j) => j !== i));
                  }}
                  className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-red-500 transition hover:bg-red-100 self-end sm:self-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              set('terkibHisseleri', [...form.terkibHisseleri, '']);
              set('terkibHisseleriEn', [...(form.terkibHisseleriEn || []), '']);
            }}
            className="flex items-center gap-2 rounded-xl border border-dashed border-[rgba(98,67,45,0.25)] bg-white px-4 py-2 text-sm text-[rgba(57,44,35,0.6)] transition hover:border-[#8d3a24]/40 hover:text-[#8d3a24]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Tərkib əlavə et
          </button>
        </div>
      </div>

      <div>
        <label className={labelCls}>Hazırlanma addımları *</label>
        <div className="space-y-3">
          {form.addimlar.map((step, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-[rgba(98,67,45,0.08)] bg-[rgba(98,67,45,0.02)] p-3 sm:flex-row sm:items-start sm:bg-transparent sm:p-0 sm:border-0 sm:gap-3">
              <div className="flex flex-1 gap-2">
                <span className="flex h-10 w-6 items-center justify-center text-xs font-bold text-[rgba(57,44,35,0.4)]">{i + 1}</span>
                <textarea
                  className={`${inputCls} flex-1 min-h-[72px] resize-y`}
                  value={step}
                  onChange={e => {
                    const arr = [...form.addimlar];
                    arr[i] = e.target.value;
                    set('addimlar', arr);
                  }}
                  placeholder={`Addım ${i + 1} (AZ)`}
                />
              </div>
              <textarea
                className={`${inputCls} flex-1 min-h-[72px] resize-y`}
                value={form.addimlarEn?.[i] || ''}
                onChange={e => {
                  const arr = [...(form.addimlarEn || [])];
                  arr[i] = e.target.value;
                  set('addimlarEn', arr);
                }}
                placeholder={`Addım ${i + 1} (EN)`}
              />
              {form.addimlar.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    set('addimlar', form.addimlar.filter((_, j) => j !== i));
                    set('addimlarEn', (form.addimlarEn || []).filter((_, j) => j !== i));
                  }}
                  className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-red-500 transition hover:bg-red-100 self-end sm:self-auto sm:mt-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              set('addimlar', [...form.addimlar, '']);
              set('addimlarEn', [...(form.addimlarEn || []), '']);
            }}
            className="flex items-center gap-2 rounded-xl border border-dashed border-[rgba(98,67,45,0.25)] bg-white px-4 py-2 text-sm text-[rgba(57,44,35,0.6)] transition hover:border-[#8d3a24]/40 hover:text-[#8d3a24]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Addım əlavə et
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Tarixi məlumat (AZ)</label>
          <textarea className={`${inputCls} min-h-[80px]`} value={form.tarixiMelumat} onChange={e => set('tarixiMelumat', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Tarixi məlumat (EN)</label>
          <textarea className={`${inputCls} min-h-[80px]`} value={form.tarixiMelumatEn || ''} onChange={e => set('tarixiMelumatEn', e.target.value)} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Təqdim təklifləri (AZ)</label>
          <textarea className={`${inputCls} min-h-[80px]`} value={form.teqdimTeklifleri} onChange={e => set('teqdimTeklifleri', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Təqdim təklifləri (EN)</label>
          <textarea className={`${inputCls} min-h-[80px]`} value={form.teqdimTeklifleriEn || ''} onChange={e => set('teqdimTeklifleriEn', e.target.value)} />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="h-4 w-4 rounded border-[rgba(98,67,45,0.3)] text-[#8d3a24] accent-[#8d3a24]" />
        <span className="text-sm font-medium text-[#241c18]">Seçilmiş resept (featured)</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#8d3a24] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7a3220] disabled:opacity-50"
        >
          {saving ? 'Saxlanılır...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-6 py-2.5 text-sm font-medium text-[rgba(57,44,35,0.7)] transition hover:bg-[rgba(98,67,45,0.05)]"
        >
          Ləğv et
        </button>
      </div>
    </form>
  );
}

// ─── Recipe List ─────────────────────────────────────────
type SortKey = 'yemeyinAdi' | 'kateqoriya' | 'cetinlikDerecesi' | 'updatedAt' | 'featured';
type SortDir = 'asc' | 'desc';

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className={`ml-1 inline-flex flex-col leading-none ${active ? 'text-[#8d3a24]' : 'text-[rgba(57,44,35,0.25)]'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-2.5 w-2.5 -mb-0.5 transition-opacity ${active && dir === 'asc' ? 'opacity-100' : 'opacity-40'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 8H4z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-2.5 w-2.5 transition-opacity ${active && dir === 'desc' ? 'opacity-100' : 'opacity-40'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l-8-8h16z"/></svg>
    </span>
  );
}

function RecipeList({ recipes, onEdit, onDelete, onCreate }: {
  recipes: RecipeListItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  onCreate: () => void;
}) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const difficultyOrder: Record<string, number> = { 'Asan': 0, 'Orta': 1, 'Çətin': 2 };

  const filtered = recipes
    .filter(r =>
      r.yemeyinAdi.toLowerCase().includes(search.toLowerCase()) ||
      r.kateqoriya.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'yemeyinAdi') {
        cmp = a.yemeyinAdi.localeCompare(b.yemeyinAdi, 'az');
      } else if (sortKey === 'kateqoriya') {
        cmp = a.kateqoriya.localeCompare(b.kateqoriya, 'az');
      } else if (sortKey === 'cetinlikDerecesi') {
        cmp = (difficultyOrder[a.cetinlikDerecesi] ?? 1) - (difficultyOrder[b.cetinlikDerecesi] ?? 1);
      } else if (sortKey === 'updatedAt') {
        cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      } else if (sortKey === 'featured') {
        cmp = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)] select-none cursor-pointer hover:text-[#8d3a24] transition-colors';

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#241c18]">Reseptlər</h2>
          <p className="text-sm text-[rgba(57,44,35,0.5)]">{recipes.length} resept · {filtered.length} göstərilir</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Axtar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-4 py-2 text-sm outline-none transition focus:border-[#8d3a24]/40 focus:ring-2 focus:ring-[#8d3a24]/10"
          />
          {/* Mobile sort dropdown */}
          <select
            value={`${sortKey}:${sortDir}`}
            onChange={e => {
              const [k, d] = e.target.value.split(':') as [SortKey, SortDir];
              setSortKey(k); setSortDir(d);
            }}
            className="rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[#8d3a24]/40 lg:hidden"
          >
            <option value="updatedAt:desc">Yeni əlavə edilən</option>
            <option value="updatedAt:asc">Köhnə əlavə edilən</option>
            <option value="yemeyinAdi:asc">Ad (A→Z)</option>
            <option value="yemeyinAdi:desc">Ad (Z→A)</option>
            <option value="kateqoriya:asc">Kateqoriya (A→Z)</option>
            <option value="cetinlikDerecesi:asc">Çətinlik (az→çox)</option>
            <option value="cetinlikDerecesi:desc">Çətinlik (çox→az)</option>
            <option value="featured:asc">Seçilmişlər əvvəl</option>
          </select>
          <button
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-[#8d3a24] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7a3220]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Yeni
          </button>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filtered.map(r => (
          <div key={r.id} className="rounded-xl border border-[rgba(98,67,45,0.1)] bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-start gap-3">
              {r.sekilLinki && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.sekilLinki} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#241c18]">{r.yemeyinAdi}</h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-[#8d3a24]/8 px-2 py-0.5 text-[10px] font-medium text-[#8d3a24]">{r.kateqoriya}</span>
                  <span className="rounded-full bg-[rgba(98,67,45,0.08)] px-2 py-0.5 text-[10px] font-medium text-[rgba(57,44,35,0.6)]">{r.cetinlikDerecesi}</span>
                  {r.featured && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">★</span>}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-[rgba(98,67,45,0.08)] pt-3">
              <button onClick={() => onEdit(r.id)} className="flex-1 rounded-lg bg-[rgba(98,67,45,0.06)] py-1.5 text-xs font-medium text-[rgba(57,44,35,0.7)] transition hover:bg-[rgba(98,67,45,0.12)]">Redaktə</button>
              <button onClick={() => onDelete(r.id, r.yemeyinAdi)} className="rounded-lg bg-red-50 px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100">Sil</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-[rgba(98,67,45,0.1)] bg-white/80 shadow-sm backdrop-blur-sm lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(98,67,45,0.1)] bg-[rgba(98,67,45,0.03)]">
              <th className={thCls} onClick={() => toggleSort('yemeyinAdi')}>
                Resept <SortIcon active={sortKey === 'yemeyinAdi'} dir={sortDir} />
              </th>
              <th className={thCls} onClick={() => toggleSort('kateqoriya')}>
                Kateqoriya <SortIcon active={sortKey === 'kateqoriya'} dir={sortDir} />
              </th>
              <th className={thCls} onClick={() => toggleSort('cetinlikDerecesi')}>
                Çətinlik <SortIcon active={sortKey === 'cetinlikDerecesi'} dir={sortDir} />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)]">Bölgə</th>
              <th className={`${thCls} text-center`} onClick={() => toggleSort('featured')}>
                ★ <SortIcon active={sortKey === 'featured'} dir={sortDir} />
              </th>
              <th className={`${thCls} text-right`} onClick={() => toggleSort('updatedAt')}>
                Tarix <SortIcon active={sortKey === 'updatedAt'} dir={sortDir} />
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[rgba(57,44,35,0.56)]">Əməliyyat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(98,67,45,0.06)]">
            {filtered.map(r => (
              <tr key={r.id} className="transition hover:bg-[rgba(98,67,45,0.03)]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {r.sekilLinki && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.sekilLinki} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                    )}
                    <span className="text-sm font-medium text-[#241c18]">{r.yemeyinAdi}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><span className="rounded-full bg-[#8d3a24]/8 px-2.5 py-1 text-xs font-medium text-[#8d3a24]">{r.kateqoriya}</span></td>
                <td className="px-4 py-3 text-sm text-[rgba(57,44,35,0.7)]">{r.cetinlikDerecesi}</td>
                <td className="px-4 py-3 text-sm text-[rgba(57,44,35,0.7)]">{r.bolge || r.mense || '—'}</td>
                <td className="px-4 py-3 text-center">{r.featured ? <span className="text-amber-500">★</span> : <span className="text-[rgba(57,44,35,0.2)]">○</span>}</td>
                <td className="px-4 py-3 text-right text-xs text-[rgba(57,44,35,0.45)]">
                  {new Date(r.updatedAt).toLocaleDateString('az-AZ', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(r.id)} className="rounded-lg bg-[rgba(98,67,45,0.06)] px-3 py-1.5 text-xs font-medium text-[rgba(57,44,35,0.7)] transition hover:bg-[rgba(98,67,45,0.12)]">Redaktə</button>
                    <button onClick={() => onDelete(r.id, r.yemeyinAdi)} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100">Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-[rgba(57,44,35,0.4)]">Resept tapılmadı</div>
        )}
      </div>
    </div>
  );
}

// ─── Table Manager ─────────────────────────────────────────
const tableTabLabels: Record<TableTab, string> = {
  kateqoriya: 'Kateqoriyalar',
  mense: 'Mənşələr',
  bolge: 'Bölgələr',
  cetinlik: 'Çətinliklər',
  muddet: 'Müddətlər',
  porsiya: 'Porsiyalar',
};
const tableTabSingular: Record<TableTab, string> = {
  kateqoriya: 'kateqoriya',
  mense: 'mənşə',
  bolge: 'bölgə',
  cetinlik: 'çətinlik',
  muddet: 'müddət',
  porsiya: 'porsiya',
};

function TableManager({ showToast }: { showToast: (msg: string, type?: 'ok' | 'err') => void }) {
  const [tab, setTab] = useState<TableTab>('kateqoriya');
  const [data, setData] = useState<LookupData>({ categories: [], menseler: [], bolgeler: [], cetinlikler: [], muddetler: [], porsiyalar: [] });
  const [loading, setLoading] = useState(true);
  const [newVal, setNewVal] = useState('');
  const [newValEn, setNewValEn] = useState('');
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const [editValEn, setEditValEn] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', { headers: authHeaders(), cache: 'no-store' });
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function currentItems(): LookupItem[] {
    if (tab === 'kateqoriya') return data.categories;
    if (tab === 'mense') return data.menseler;
    if (tab === 'bolge') return data.bolgeler;
    if (tab === 'cetinlik') return data.cetinlikler;
    if (tab === 'muddet') return data.muddetler;
    return data.porsiyalar;
  }

  async function handleAdd() {
    if (!newVal.trim()) return;
    setAdding(true);
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: tab, ad: newVal.trim(), adEn: newValEn.trim() }),
    });
    setAdding(false);
    if (res.ok) { showToast('Əlavə edildi'); setNewVal(''); setNewValEn(''); load(); }
    else { const e = await res.json(); showToast(e.error || 'Xəta', 'err'); }
  }

  async function handleRename(id: string) {
    if (!editVal.trim()) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: tab, ad: editVal.trim(), adEn: editValEn.trim() }),
      });
      if (res.ok) { showToast('Yeniləndi'); setEditingId(null); load(); }
      else { const e = await res.json(); showToast(e.error || 'Xəta', 'err'); }
    } catch {
      showToast('Bağlanma xətası', 'err');
    }
  }

  async function handleDelete(id: string, ad: string) {
    if (!confirm(`"${ad}" silinsin? Bu dəyəri istifadə edən reseptlər təsirlənə bilər.`)) return;
    const res = await fetch(`/api/admin/categories/${id}?table=${tab}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) { showToast('Silindi'); load(); }
    else { const e = await res.json(); showToast(e.error || 'Silinmə xətası', 'err'); }
  }

  const inputCls = 'rounded-xl border border-[rgba(98,67,45,0.14)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#8d3a24]/40 focus:ring-2 focus:ring-[#8d3a24]/10';
  const items = currentItems();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#241c18]">Cədvəllər</h2>
        <p className="mt-1 text-sm text-[rgba(57,44,35,0.5)]">Kateqoriya, mənşə və bölgə dəyərlərini idarə edin</p>
      </div>

      {/* Sub-tabs */}
      <div className="mb-5 flex flex-wrap gap-1 rounded-xl border border-[rgba(98,67,45,0.1)] bg-white/60 p-1 backdrop-blur-sm w-fit">
        {(Object.keys(tableTabLabels) as TableTab[]).map(t => {
          const count = t === 'kateqoriya' ? data.categories.length : t === 'mense' ? data.menseler.length : t === 'bolge' ? data.bolgeler.length : t === 'cetinlik' ? data.cetinlikler.length : t === 'muddet' ? data.muddetler.length : data.porsiyalar.length;
          return (
            <button
              key={t}
              onClick={() => { setTab(t); setEditingId(null); setNewVal(''); setNewValEn(''); }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === t ? 'bg-[#8d3a24] text-white shadow-sm' : 'text-[rgba(57,44,35,0.6)] hover:text-[#241c18]'
              }`}
            >
              {tableTabLabels[t]}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                tab === t ? 'bg-white/20 text-white' : 'bg-[rgba(98,67,45,0.1)] text-[rgba(57,44,35,0.5)]'
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[rgba(98,67,45,0.1)] bg-white/80 shadow-sm backdrop-blur-sm">
        {/* Add row */}
        <div className="border-b border-[rgba(98,67,45,0.08)] p-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={newVal}
              onChange={e => setNewVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
              placeholder={`Yeni ${tableTabSingular[tab]} (AZ)...`}
              className={`${inputCls} flex-1`}
            />
            <input
              value={newValEn}
              onChange={e => setNewValEn(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
              placeholder={`Yeni ${tableTabSingular[tab]} (EN)...`}
              className={`${inputCls} flex-1`}
            />
            <button
              onClick={handleAdd}
              disabled={adding || !newVal.trim()}
              className="flex items-center gap-2 rounded-xl bg-[#8d3a24] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7a3220] disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Əlavə et
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#8d3a24] border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-[rgba(57,44,35,0.4)]">Heç bir dəyər tapılmadı</div>
        ) : (
          <ul className="divide-y divide-[rgba(98,67,45,0.06)]">
            {items.map((item, idx) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3 transition hover:bg-[rgba(98,67,45,0.02)]">
                <span className="w-6 shrink-0 text-center text-xs font-medium text-[rgba(57,44,35,0.3)]">{idx + 1}</span>
                {editingId === item.id ? (
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      autoFocus
                      value={editVal}
                      onChange={e => setEditVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleRename(item.id); if (e.key === 'Escape') setEditingId(null); }}
                      placeholder="AZ translation"
                      className={`${inputCls} flex-1 py-1.5`}
                    />
                    <input
                      value={editValEn}
                      onChange={e => setEditValEn(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleRename(item.id); if (e.key === 'Escape') setEditingId(null); }}
                      placeholder="EN translation"
                      className={`${inputCls} flex-1 py-1.5`}
                    />
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button onClick={() => handleRename(item.id)} className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100">Saxla</button>
                      <button onClick={() => setEditingId(null)} className="rounded-lg bg-[rgba(98,67,45,0.06)] px-3 py-1.5 text-xs font-medium text-[rgba(57,44,35,0.6)] transition hover:bg-[rgba(98,67,45,0.12)]">Ləğv</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 text-sm font-medium text-[#241c18]">
                      {tab === 'porsiya' && item.miqdar ? `${item.miqdar} ${item.ad}` : item.ad}
                      {item.adEn && (
                        <span className="ml-2 text-xs text-[rgba(57,44,35,0.45)]">
                          ({tab === 'porsiya' && item.miqdar ? `${item.miqdar} ${item.adEn}` : item.adEn})
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditVal(tab === 'porsiya' && item.miqdar ? `${item.miqdar} ${item.ad}` : item.ad);
                        setEditValEn(tab === 'porsiya' && item.miqdar ? `${item.miqdar} ${item.adEn || ''}` : (item.adEn || ''));
                      }}
                      className="rounded-lg bg-[rgba(98,67,45,0.06)] px-3 py-1.5 text-xs font-medium text-[rgba(57,44,35,0.7)] transition hover:bg-[rgba(98,67,45,0.12)]"
                    >Redaktə</button>
                    <button
                      onClick={() => handleDelete(item.id, item.ad)}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                    >Sil</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Main Admin App ──────────────────────────────────────
export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [view, setView] = useState<AdminView>('list');
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [cetinlikList, setCetinlikList] = useState<string[]>([]);
  const [muddetList, setMuddetList] = useState<string[]>([]);
  const [porsiyaList, setPorsiyaList] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<RecipeFormData | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('reseptler');

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Check existing session
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch('/api/admin/recipes', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => { if (r.ok) setAuthed(true); })
        .finally(() => setChecking(false));
    } else {
      Promise.resolve().then(() => setChecking(false));
    }
  }, []);

  const loadRecipes = useCallback(async () => {
    const res = await fetch('/api/admin/recipes', { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json();
      setRecipes(data.recipes);
    }
  }, []);

  const loadCategories = useCallback(async () => {
    const res = await fetch('/api/admin/categories', { headers: authHeaders(), cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      setCategoryList((data.categories as { ad: string }[]).map(c => c.ad));
      setCetinlikList((data.cetinlikler as { ad: string }[]).map(c => c.ad));
      setMuddetList((data.muddetler as { ad: string }[]).map(c => c.ad));
      setPorsiyaList((data.porsiyalar as { ad: string; miqdar?: string | null }[]).map(p => p.miqdar ? `${p.miqdar} ${p.ad}` : p.ad));
    }
  }, []);

  useEffect(() => {
    // Loading remote data when the authenticated session changes is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (authed) { loadRecipes(); loadCategories(); }
  }, [authed, loadRecipes, loadCategories]);

  function logout() {
    localStorage.removeItem('admin_session');
    setAuthed(false);
  }

  async function handleCreate(data: RecipeFormData) {
    const res = await fetch('/api/admin/recipes', {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showToast('Resept yaradıldı');
      setView('list');
      loadRecipes();
    } else {
      const err = await res.json();
      showToast(err.error || 'Xəta baş verdi', 'err');
    }
  }

  async function handleEdit(data: RecipeFormData) {
    if (!editId) return;
    const res = await fetch(`/api/admin/recipes/${editId}`, {
      method: 'PUT',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showToast('Resept yeniləndi');
      setView('list');
      setEditId(null);
      setEditData(null);
      loadRecipes();
    } else {
      showToast('Yeniləmə xətası', 'err');
    }
  }

  async function startEdit(id: string) {
    const res = await fetch(`/api/admin/recipes/${id}`, { headers: authHeaders() });
    if (!res.ok) {
      try {
        const errData = await res.json();
        showToast(errData.error || 'Resepti yükləmək mümkün olmadı', 'err');
      } catch {
        showToast('Resepti yükləmək mümkün olmadı (Server xətası)', 'err');
      }
      return;
    }
    const { recipe } = await res.json();
    setEditId(id);
    setEditData({
      yemeyinAdi: recipe.yemeyinAdi,
      yemeyinAdiEn: recipe.yemeyinAdiEn || '',
      mense: recipe.mense?.ad || '',
      menseEn: recipe.mense?.adEn || '',
      bolge: recipe.bolge?.ad || '',
      bolgeEn: recipe.bolge?.adEn || '',
      kateqoriya: recipe.kateqoriya.ad,
      terkibHisseleri: [...(recipe.terkibHisseleri ?? [])]
        .sort((a: AdminIngredient, b: AdminIngredient) => a.sira - b.sira)
        .map((i: AdminIngredient) => i.miqdar ? `${i.ad} – ${i.miqdar.miqdar ? `${i.miqdar.miqdar} ${i.miqdar.ad}` : i.miqdar.ad}` : i.ad),
      terkibHisseleriEn: [...(recipe.terkibHisseleri ?? [])]
        .sort((a: AdminIngredient, b: AdminIngredient) => a.sira - b.sira)
        .map((i: AdminIngredient) => {
          const adEn = i.adEn || i.ad;
          if (i.miqdar) {
            const qtyEn = i.miqdar.adEn || i.miqdar.ad;
            return i.miqdar.miqdar ? `${adEn} – ${i.miqdar.miqdar} ${qtyEn}` : `${adEn} – ${qtyEn}`;
          }
          return adEn;
        }),
      addimlar: [...(recipe.addimlar ?? [])].sort((a: {sira:number}, b: {sira:number}) => a.sira - b.sira).map((s: {metn:string}) => s.metn),
      addimlarEn: [...(recipe.addimlar ?? [])].sort((a: {sira:number}, b: {sira:number}) => a.sira - b.sira).map((s: {metnEn?:string|null}) => s.metnEn || ''),
      hazirlanmaMuddeti: recipe.hazirlanmaMuddeti,
      cetinlikDerecesi: recipe.cetinlikDerecesi,
      porsiyaSayi: recipe.porsiyaSayi,
      tarixiMelumat: recipe.tarixiMelumat || '',
      tarixiMelumatEn: recipe.tarixiMelumatEn || '',
      teqdimTeklifleri: recipe.teqdimTeklifleri || '',
      teqdimTeklifleriEn: recipe.teqdimTeklifleriEn || '',
      sekilLinki: recipe.sekiller?.find((s: {isMain: boolean}) => s.isMain)?.url || recipe.sekiller?.[0]?.url || '',
      featured: recipe.featured,
    });
    setView('edit');
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" reseptini silmək istədiyinizdən əminsiniz?`)) return;
    const res = await fetch(`/api/admin/recipes/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      showToast('Resept silindi');
      loadRecipes();
    } else {
      showToast('Silinmə xətası', 'err');
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#f7efe2]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8d3a24] border-t-transparent" />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => { setAuthed(true); }} />;
  }

  return (
    <div className="min-h-[100dvh] bg-[#f7efe2]">
      {/* Toast */}
      {toast && (
        <div className={`fixed right-4 top-4 z-50 rounded-xl px-5 py-3 text-sm font-medium shadow-lg transition-all ${
          toast.type === 'ok' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[rgba(98,67,45,0.1)] bg-[#f7efe2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8d3a24]/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8d3a24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#241c18]">Chef İlhamə</h1>
              <p className="text-[11px] text-[rgba(57,44,35,0.45)]">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'reseptler' && view !== 'list' && (
              <button
                onClick={() => { setView('list'); setEditId(null); setEditData(null); }}
                className="rounded-lg border border-[rgba(98,67,45,0.14)] bg-white px-3 py-1.5 text-xs font-medium text-[rgba(57,44,35,0.7)] transition hover:bg-[rgba(98,67,45,0.05)]"
              >
                ← Siyahıya qayıt
              </button>
            )}
            <button
              onClick={logout}
              className="rounded-lg bg-[rgba(98,67,45,0.06)] px-3 py-1.5 text-xs font-medium text-[rgba(57,44,35,0.6)] transition hover:bg-[rgba(98,67,45,0.12)]"
            >
              Çıxış
            </button>
          </div>
        </div>
        {/* Tab navigation */}
        <div className="border-t border-[rgba(98,67,45,0.08)] px-4 sm:px-6">
          <nav className="-mb-px flex">
            {([
              ['reseptler', 'Reseptlər', 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 10h8M8 14h5'],
              ['cedveller', 'Cədvəllər', 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'],
            ] as [AdminTab, string, string][]).map(([t, label, icon]) => (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  if (t !== 'reseptler') { setView('list'); setEditId(null); setEditData(null); }
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                  activeTab === t
                    ? 'border-[#8d3a24] text-[#8d3a24]'
                    : 'border-transparent text-[rgba(57,44,35,0.5)] hover:border-[rgba(98,67,45,0.2)] hover:text-[#241c18]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={icon}/></svg>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {activeTab === 'reseptler' && (
          <>
            {view === 'list' && (
              <RecipeList
                recipes={recipes}
                onEdit={startEdit}
                onDelete={handleDelete}
                onCreate={() => setView('create')}
              />
            )}
            {view === 'create' && (
              <div>
                <h2 className="mb-6 text-xl font-bold text-[#241c18]">Yeni resept</h2>
                <div className="rounded-2xl border border-[rgba(98,67,45,0.1)] bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-8">
                  <RecipeForm initial={emptyForm} onSubmit={handleCreate} onCancel={() => setView('list')} submitLabel="Yarat" categoryList={categoryList} cetinlikList={cetinlikList} muddetList={muddetList} porsiyaList={porsiyaList} />
                </div>
              </div>
            )}
            {view === 'edit' && editData && (
              <div>
                <h2 className="mb-6 text-xl font-bold text-[#241c18]">Resepti redaktə et</h2>
                <div className="rounded-2xl border border-[rgba(98,67,45,0.1)] bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-8">
                  <RecipeForm initial={editData} onSubmit={handleEdit} onCancel={() => { setView('list'); setEditId(null); setEditData(null); }} submitLabel="Yadda saxla" categoryList={categoryList} cetinlikList={cetinlikList} muddetList={muddetList} porsiyaList={porsiyaList} />
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === 'cedveller' && (
          <TableManager showToast={showToast} />
        )}
      </main>
    </div>
  );
}
