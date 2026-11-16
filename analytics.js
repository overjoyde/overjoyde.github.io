import { analyticsConfig } from './analytics-config.js';

export function startAnalytics() {
  const { goatcounterCode, productionHost } = analyticsConfig;
  if (!/^[a-z0-9][a-z0-9-]{1,59}$/.test(goatcounterCode)) return;
  if (location.hostname !== productionHost) return;
  if (new URLSearchParams(location.search).get('analytics') === 'off') return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.dataset.goatcounter = `https://${goatcounterCode}.goatcounter.com/count`;
  document.head.append(script);
}
