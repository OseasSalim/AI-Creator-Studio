import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Clapperboard, FolderKanban, LayoutDashboard, Menu, Plus, Settings, Sparkles, X } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { to: '/projetos', label: 'Meus projetos', icon: FolderKanban },
];

export function AppShell() {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-ink text-paper">
    {open && <button aria-label="Fechar menu" className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-white/10 bg-ink px-5 py-6 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-2"><NavLink to="/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid h-9 w-9 place-items-center rounded-xl bg-acid text-ink"><Clapperboard size={19} /></span><span className="font-semibold tracking-tight">AI Creator <span className="text-acid">Studio</span></span></NavLink><button className="text-muted lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar"><X size={20} /></button></div>
      <button className="mt-12 flex items-center justify-center gap-2 rounded-xl bg-acid px-4 py-3 text-sm font-bold text-ink transition hover:brightness-105"><Plus size={17} /> Novo projeto</button>
      <nav className="mt-8 space-y-1">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive ? 'bg-white/10 text-paper' : 'text-muted hover:bg-white/5 hover:text-paper'}`}><Icon size={18} />{label}</NavLink>)}</nav>
      <div className="mt-auto space-y-1"><NavLink to="#" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-white/5 hover:text-paper"><Settings size={18} /> Configurações</NavLink><div className="mt-4 rounded-2xl border border-acid/20 bg-acid/10 p-4"><p className="text-xs font-semibold text-acid">Seu plano atual</p><p className="mt-1 text-sm text-paper">Starter <span className="text-muted">· 120 créditos</span></p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/60"><div className="h-full w-2/5 rounded-full bg-acid" /></div></div></div>
    </aside>
    <main className="min-h-screen lg:pl-72"><header className="flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-8"><button className="text-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></button><div className="hidden text-sm text-muted sm:block">Workspace / <span className="text-paper">Studio principal</span></div><div className="ml-auto flex items-center gap-4"><div className="hidden rounded-full border border-white/10 px-3 py-2 text-xs text-muted sm:block"><Sparkles size={14} className="mr-2 inline text-acid" /> 120 créditos</div><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-acid to-emerald-400 text-sm font-bold text-ink">OC</div></div></header><Outlet /></main>
  </div>;
}
