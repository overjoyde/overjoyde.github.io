# Fictional fan-in rule — DEMO-001

At evaluation time T, flag each account and currency group when:
- There are at least 3 unique counterparties.
- The sum is at least 10,000 in that currency's minor units.
- Only incoming, booked payments count.
- The rolling time window is (T−1h, T]: start excluded, end included.
- Group separately by account and currency.

Demo setup: T = 2026-01-01T12:00:00Z; account = DEMO-ACCOUNT-01;
currency = SEK. All transactions are fictional, incoming, and booked.

Fictional example. Expected outcomes, not execution against your system.
