import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './supabase-config.js';

const REST_URL = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1`;

async function request(table, { method = 'GET', query = '', body, prefer } = {}) {
  const response = await fetch(`${REST_URL}/${table}${query ? `?${query}` : ''}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {})
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase (${response.status}): ${details || response.statusText}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

const encodeFilters = filters => Object.entries(filters)
  .map(([column, value]) => `${encodeURIComponent(column)}=eq.${encodeURIComponent(value)}`)
  .join('&');

export const SupabaseDB = {
  inserir(table, data) {
    return request(table, { method: 'POST', body: data, prefer: 'return=representation' });
  },

  listar(table, filters = {}) {
    const filterQuery = encodeFilters(filters);
    return request(table, { query: `select=*${filterQuery ? `&${filterQuery}` : ''}` });
  },

  atualizar(table, filters, data) {
    return request(table, {
      method: 'PATCH',
      query: encodeFilters(filters),
      body: data,
      prefer: 'return=representation'
    });
  },

  excluir(table, filters) {
    return request(table, {
      method: 'DELETE',
      query: encodeFilters(filters),
      prefer: 'return=representation'
    });
  },

  upsert(table, data, conflictColumn = 'id') {
    return request(table, {
      method: 'POST',
      query: `on_conflict=${encodeURIComponent(conflictColumn)}`,
      body: data,
      prefer: 'resolution=merge-duplicates,return=representation'
    });
  }
};

export const SupabaseStorage = {
  async carregar() {
    const rows = await SupabaseDB.listar('app_state', { id: 1 });
    return rows?.[0]?.data || null;
  },

  salvar(data) {
    return SupabaseDB.upsert('app_state', {
      id: 1,
      data,
      updated_at: new Date().toISOString()
    });
  },

  excluir() {
    return SupabaseDB.excluir('app_state', { id: 1 });
  }
};

