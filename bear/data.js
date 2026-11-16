// Public product facts, verified through Agensi on 2026-11-16.
// Update price, version, status and checkedOn here when a listing changes.
export const catalog = {
  checkedOn: '2026-11-16',
  products: [
    {
      slug: 'bear-model-doc-writer', name: 'BEAR Model Doc Writer', version: '1.0', status: 'Live',
      price: 'Free', priceLabel: 'start here', featured: true, icon: '≡',
      description: 'Turn SQL, dbt models, and rule notes into a structured transaction-monitoring documentation draft.',
      features: ['Describe the method, assumptions, and limitations.', 'Organise test evidence and unresolved questions.', 'Keep missing information visible as explicit gaps.'],
      formats: ['Method', 'Assumptions', 'Open questions'],
      limitation: 'Drafts reflect the information you provide. Review missing inputs, factual claims, and conclusions before using the documentation.',
      cta: 'Start with the free skill', url: 'https://agensi.io/skills/bear-model-doc-writer'
    },
    {
      slug: 'tm-scenario-test-designer', name: 'TM Scenario Test Designer', version: '1.1.1', status: 'Live',
      price: '$12', priceLabel: 'one-time purchase', featured: false, icon: '{ }',
      description: 'Turn rule notes into an explicit rule contract, synthetic transactions, a test matrix, and expected outcomes.',
      features: ['Probe thresholds, time windows, and counterparty conditions.', 'Make unresolved rule decisions visible before testing.', 'Optional research mode uses public sources to propose tests.'],
      formats: ['Markdown', 'CSV', 'JSON', 'Manifest + ZIP'],
      limitation: 'Creating files requires an agent environment with suitable file and Python capabilities. Packages depend on the inputs and tools available.',
      cta: 'View on Agensi', url: 'https://agensi.io/skills/tm-scenario-test-designer'
    },
    {
      slug: 'bear-transaction-anomaly-analyst', name: 'BEAR Transaction Anomaly Analyst', version: '1.0.1', status: 'Live',
      price: '$19', priceLabel: 'one-time purchase', featured: false, icon: '↗',
      description: 'Inspect synthetic transaction CSVs for fan-in, fan-out, and repeated pass-through, with evidence you can trace.',
      features: ['Link findings to exact transaction evidence IDs.', 'Inspect explainable patterns and execution receipts.', 'Review CSV/JSON results alongside a written report.'],
      formats: ['CSV', 'JSON', 'Review report'],
      limitation: 'Runs locally with Python 3.11+ in a suitable agent environment. Built for synthetic transaction analysis; findings do not establish suspicious activity or production detection effectiveness.',
      cta: 'View analysis skill', url: 'https://agensi.io/skills/bear-transaction-anomaly-analyst'
    }
  ]
};

export const ruleText = `# Fictional fan-in rule — DEMO-001

At evaluation time T, flag each account and currency group when:
- There are at least 3 unique counterparties.
- The sum is at least 10,000 in that currency's minor units.
- Only incoming, booked payments count.
- The rolling time window is (T−1h, T]: start excluded, end included.
- Group separately by account and currency.

Demo setup: T = 2026-01-01T12:00:00Z; account = DEMO-ACCOUNT-01;
currency = SEK. All transactions are fictional, incoming, and booked.

Fictional example. Expected outcomes, not execution against your system.`;

export const cases = [
  { id: 'C01', label: 'At the threshold', title: 'Three counterparties. Sum exactly 10,000.', expected: true,
    explanation: 'All three payments are inside the window. Three unique counterparties and 10,000 minor units meet both inclusive thresholds.',
    rows: [{party:'A',amount:3000,time:'11:15:00',included:true},{party:'B',amount:3000,time:'11:35:00',included:true},{party:'C',amount:4000,time:'12:00:00',included:true}] },
  { id: 'C02', label: 'One unit below', title: 'Change the final amount to 3,999.', expected: false,
    explanation: 'Three counterparties remain, but the total is 9,999 minor units. The amount condition is not met.',
    rows: [{party:'A',amount:3000,time:'11:15:00',included:true},{party:'B',amount:3000,time:'11:35:00',included:true},{party:'C',amount:3999,time:'12:00:00',included:true}] },
  { id: 'C03', label: 'Repeated counterparty', title: 'Replace counterparty C with B.', expected: false,
    explanation: 'The total is still 10,000 minor units, but there are only two unique counterparties: A and B. The counterparty condition is not met.',
    rows: [{party:'A',amount:3000,time:'11:15:00',included:true},{party:'B',amount:3000,time:'11:35:00',included:true},{party:'B',amount:4000,time:'12:00:00',included:true}] },
  { id: 'C04', label: 'At the window start', title: 'Move a necessary payment to exactly T−1h.', expected: false,
    explanation: 'The 3,000 payment from A is exactly at 11:00:00, the excluded start. Only B and C count: two counterparties and 7,000 minor units.',
    rows: [{party:'A',amount:3000,time:'11:00:00',included:false},{party:'B',amount:3000,time:'11:35:00',included:true},{party:'C',amount:4000,time:'12:00:00',included:true}] }
];

export const filePreviews = {
  'rule-contract.md': ruleText,
  'test-matrix.csv': 'case_id,variation,expected_hit,eligible_minor_units,unique_counterparties\n' + cases.map(c => [c.id,c.label,c.expected,c.rows.filter(r=>r.included).reduce((sum,r)=>sum+r.amount,0),new Set(c.rows.filter(r=>r.included).map(r=>r.party)).size].join(',')).join('\n'),
  'transactions.csv': 'case_id,account,currency,counterparty,amount_minor,booked_at,direction,status\n' + cases.flatMap(c => c.rows.map(r => [c.id,'DEMO-ACCOUNT-01','SEK',r.party,r.amount,`2026-01-01T${r.time}Z`,'incoming','booked'].join(','))).join('\n'),
  'expected-results.json': JSON.stringify({fictional:true,execution_performed:false,evaluation_time:'2026-01-01T12:00:00Z',results:cases.map(c=>({case_id:c.id,expected_hit:c.expected}))},null,2),
  'review-report.md': `# Demonstration review\n\nScope: one fictional fan-in rule and four examples.\n\nExpected outcomes: C01 hit; C02, C03, C04 no hit.\nAmounts are integer currency minor units.\nWindow: (T−1h, T], evaluated separately per account and currency.\n\nOpen review items for a real implementation:\n- Confirm booking timestamps and late-arrival treatment.\n- Define counterparty identity and deduplication.\n- Add cases for mixed currencies and account isolation.\n- Add outgoing, non-booked, and reversal cases.\n\nNo execution against a production or user system.\nSynthetic tests do not establish detection effectiveness.`,
  'manifest.json': JSON.stringify({demo_id:'DEMO-001',fictional:true,execution_performed:false,files:['rule-contract.md','test-matrix.csv','transactions.csv','expected-results.json','review-report.md','manifest.json']},null,2)
};
