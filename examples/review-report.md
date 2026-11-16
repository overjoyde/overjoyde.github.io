# Demonstration review

Scope: one fictional fan-in rule and four examples.

Expected outcomes: C01 hit; C02, C03, C04 no hit.
Amounts are integer currency minor units.
Window: (T−1h, T], evaluated separately per account and currency.

Open review items for a real implementation:
- Confirm booking timestamps and late-arrival treatment.
- Define counterparty identity and deduplication.
- Add cases for mixed currencies and account isolation.
- Add outgoing, non-booked, and reversal cases.

No execution against a production or user system.
Synthetic tests do not establish detection effectiveness.
