async function load() {
  const status = document.getElementById('status');
  const tbody = document.getElementById('tbody');
  status.textContent = 'Loading...';
  try {
    const res = await fetch('results.json', { cache: 'no-store' });
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.items || []);
    tbody.innerHTML = '';
    for (const it of items) {
      const tr = document.createElement('tr');
      const tdTs = document.createElement('td');
      const tdSource = document.createElement('td');
      const tdGame = document.createElement('td');
      const tdRes = document.createElement('td');
      const tdHash = document.createElement('td');

      const ts = it.ts ? new Date(it.ts) : null;
      tdTs.textContent = ts ? ts.toLocaleString() : '';
      tdSource.innerHTML = `<span class="pill">${it.source || ''}</span>`;
      tdGame.textContent = it.gameId || '';
      tdRes.textContent = it.result || '';
      tdHash.textContent = it.hash || '';

      tr.appendChild(tdTs);
      tr.appendChild(tdSource);
      tr.appendChild(tdGame);
      tr.appendChild(tdRes);
      tr.appendChild(tdHash);
      tbody.appendChild(tr);
    }
    status.textContent = `Loaded ${items.length}`;
  } catch (e) {
    console.error(e);
    status.textContent = 'Error loading results.json';
  }
}

document.getElementById('refresh').addEventListener('click', load);
load();
