import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('database authorization contract', () => {
  const migration = readFileSync(resolve(process.cwd(), '../../supabase/migrations/20261102000100_auth_profiles_projects_assets.sql'), 'utf8');
  it('enables RLS for every private table', () => { expect(migration).toContain('alter table public.profiles enable row level security'); expect(migration).toContain('alter table public.projects enable row level security'); expect(migration).toContain('alter table public.assets enable row level security'); });
  it('prevents cross-user project and asset access', () => { expect(migration).toContain('user_id = (select auth.uid())'); expect(migration).toContain('p.user_id = (select auth.uid())'); });
  it('protects the profile role from user updates', () => expect(migration).toContain('role cannot be changed by the user'));
});
