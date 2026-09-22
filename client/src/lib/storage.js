const KEY = "veilswap.selfCommits.v1";

// Self-custody preimages (nonce/salt) live only in the browser — the server
// never sees them, which is the point of the self-custody flow.

export function loadSelfCommits() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

export function saveSelfCommit(entry) {
  const list = loadSelfCommits();
  list.unshift(entry);
  return persist(list);
}

export function updateSelfCommit(hash, patch) {
  const list = loadSelfCommits().map((c) =>
    c.hash === hash ? { ...c, ...patch } : c,
  );
  return persist(list);
}
