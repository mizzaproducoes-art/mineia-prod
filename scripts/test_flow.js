/**
 * MINEIA n8n Flow Simulator
 * Rodar com: node scripts/test_flow.js <API_KEY>
 */

const API_KEY = process.argv[2];
const BASE_URL = 'http://localhost:3000/api/v1';

if (!API_KEY) {
  console.error("❌ Erro: Informe a API Key. Ex: node scripts/test_flow.js min_live_xxxx");
  process.exit(1);
}

async function simulateFlow() {
  console.log("🚀 Iniciando Simulação de Fluxo n8n...");

  // 1. Ingestão
  console.log("\n📦 1. Ingestão de Lead...");
  const ingestRes = await fetch(`${BASE_URL}/leads/ingest`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      leads: [{
        lead_hash: `test_${Date.now()}`,
        source: "TEST_SCRAPER",
        title: "Fusca Itamar Turbo",
        price: 45000,
        city: "Curitiba",
        state: "PR",
        url: "https://teste.com/anuncio"
      }]
    })
  });

  const data = await ingestRes.json();
  if (data.error) {
    console.error(`❌ Erro na Ingestão: ${data.error}`);
    process.exit(1);
  }
  const lead = data.leads[0];
  console.log(`✅ Lead Criado! ID: ${lead.id}`);

  // 2. IA Scoring
  console.log("\n🧠 2. Processando IA (Simulado)...");
  const scoreRes = await fetch(`${BASE_URL}/leads/${lead.id}/score`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      priority: "P0",
      status: "P0",
      scores: { urgency: 0.95, risk: 0.05 },
      ai_analysis: "SIMULAÇÃO: Veículo raro detectado em excelente estado. Contato imediato recomendado."
    })
  });
  console.log("✅ Inteligência Aplicada!");

  // 3. Evento
  console.log("\n📝 3. Registrando Log de Evento...");
  await fetch(`${BASE_URL}/leads/${lead.id}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: "SIMULATION_COMPLETE",
      payload: { flow: "n8n_test_script", success: true }
    })
  });
  console.log("✅ Evento Registrado!");

  console.log("\n✨ Fluxo concluído com sucesso! Verifique o Lead na Inbox do MINEIA.");
}

simulateFlow().catch(console.error);
