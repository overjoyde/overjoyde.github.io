// Edit these lists to change what shows on the site.
// Groups render as dashed "subgraph" boundaries; keep each to a handful of nodes.
// Group fields: id, label, role (primary | platform | aux) — role picks the node stroke colour.
// Project fields: name, group, description, url, tags, optional demo (live link).
window.GROUPS = [
  { id: "fincrime", label: "Financial crime & AML/CTF", role: "primary" },
  { id: "forensics", label: "Data & forensics", role: "platform" },
  { id: "tooling", label: "Tooling & agents", role: "aux" },
];

window.PROJECTS = [
  {
    name: "fincrime-llm-toolkit",
    group: "fincrime",
    description: "Practitioner toolkit for using LLMs in AML/CTF transaction monitoring and KYC/EDD work.",
    url: "https://github.com/overjoyde/fincrime-llm-toolkit",
    tags: ["Python", "LLM"],
  },
  {
    name: "bear-fincrime-toolkit-2.0",
    group: "fincrime",
    description: "Detection pipelines for structuring, mule networks and pass-through, with synthetic typology data and evaluation.",
    url: "https://github.com/overjoyde/bear-fincrime-toolkit-2.0",
    tags: ["Python", "Detection"],
  },
  {
    name: "AMLGentex-llm-toolkit",
    group: "fincrime",
    description: "Fork bridging AMLGentex simulated laundering data with fincrime-llm-toolkit.",
    url: "https://github.com/overjoyde/AMLGentex-llm-toolkit",
    tags: ["Python", "Fork"],
  },
  {
    name: "pdf-forensics-kit",
    group: "forensics",
    description: "Signature-aware PDF tampering and provenance analysis. Recovers earlier revisions and detects changes after signing.",
    url: "https://github.com/overjoyde/pdf-forensics-kit",
    tags: ["Python", "PDF"],
  },
  {
    name: "bra-kriminalstatistik",
    group: "forensics",
    description: "Automated retrieval of Brå crime statistics, with an offence-code catalogue for AML/CTF and fraud.",
    url: "https://github.com/overjoyde/bra-kriminalstatistik",
    tags: ["Python", "Open data"],
  },
  {
    name: "bear-cli",
    group: "tooling",
    description: "Command-line tooling.",
    url: "https://github.com/overjoyde/bear-cli",
    tags: ["Shell"],
  },
  {
    name: "obsidian-skills",
    group: "tooling",
    description: "Agent skills for working with an Obsidian vault.",
    url: "https://github.com/overjoyde/obsidian-skills",
    tags: ["Obsidian"],
  },
];
