# Chess Arena România — Modul 1

Prototip funcțional local cu Next.js + chess.js.

## Pornire

Instalează Node.js 20+ și rulează:

```bash
npm install
npm run dev
```

Deschide http://localhost:3000

## Ce funcționează
- Partidă locală pentru doi jucători, validare mutări și finaluri prin chess.js
- Selectare piese, evidențiere mutări, undo și restart
- Listă turnee demonstrative și înscrieri locale gratuite
- Interfață portofel dezactivată

## Limitări
- Fără server de partide, conturi, bază de date, ceas sau matchmaking
- Promovare automată în damă (selectorul va fi adăugat ulterior)
- Înscrierile nu persistă; turneele nu sunt executate
- Fără plăți, premii sau retrageri reale

## Module viitoare
1. PostgreSQL/Prisma: User, Session, Game, Move, Tournament, Registration, LedgerEntry, PayoutRequest, AuditLog
2. Auth cu verificare email și rate limits
3. Server WebSocket autoritativ pentru partide, ceasuri, deconectări și reconectări
4. Turnee reale, pairing, clasamente și reguli anti-cheat
5. KYC, procesator aprobat, ledger dublu și plăți numai după aviz juridic
