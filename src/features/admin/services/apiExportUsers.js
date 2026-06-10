export async function exportUsers({ excelData, GOOGLE_SCRIPT_URL }) {
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(excelData),
  });

  // jeśli używasz mode: "no-cors", tego nie rób – wtedy nie ma res.ok
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return;
}
