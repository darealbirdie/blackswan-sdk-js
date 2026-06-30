# blackswan-sdk

TypeScript SDK for BlackSwan Protocol - works with JavaScript, TypeScript, React, Next.js, Node.js, and more.

## Installation

```bash
npm install blackswan-sdk
```

## Contract Addresses

```ts
import { AMOY_CONTRACTS, SEPOLIA_CONTRACTS } from "blackswan-sdk";

// Amoy (Polygon Testnet)
AMOY_CONTRACTS.P2PLENDING   // 0x7E04C0a283d372537E547086D37642776199C1DC
AMOY_CONTRACTS.BLACKSWANSBT  // 0x6665e5E15Ee295d9de05C6D57c629F33653687D7

// Sepolia Testnet
SEPOLIA_CONTRACTS.P2PLENDING  // 0x20D2E08E283FF4052B2B02A3475dda1B320cD26f
SEPOLIA_CONTRACTS.BLACKSWANSBT // 0xf8D2F43227Ea25a7fD0B34E1b74FF6FF2722879F
```

## Usage

### React / Next.js (ESM)

```tsx
import { BlackSwanClient } from "blackswan-sdk";

const client = new BlackSwanClient({
  network: "amoy",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!
});

const dashboard = await client.getCreditDashboard(wallet);
// {
//   trustRatio: 7700,
//   trustTierScore: 'C',
//   currentApr: 142,
//   totalBorrowedUsd: '...',
//   totalRepaidUsd: '...',
//   interestRepaidUsd: '...',
//   successfulLoans: 1,
//   defaults: 0
// }
```

### Node.js (CommonJS)

```js
const { BlackSwanClient } = require("blackswan-sdk");

const client = new BlackSwanClient({
  network: "amoy",
  rpcUrl: process.env.RPC_URL
});

const dashboard = await client.getCreditDashboard(wallet);
```

## API Methods

- `hasSoulboundToken(wallet)` - Check if wallet has SBT (returns true/false)
- `getCreditDashboard(wallet)` - Get trustRatio, trustTierScore (A-E), currentApr, amounts, loans
- `getReputation(wallet)` - Get repaidVolume, loans, trustRatio
- `getCurrentApr(wallet)` - Get current APR
- `getTrustTier(wallet)` - Get trust tier score (A, B, C, D, E)
- `getTrustRatio(wallet)` - Get trust ratio (raw number)
- `getCreditHistory(wallet)` - Get loan history with formatted USD amounts
- `getCurrentRisk(wallet)` - Get current risk score

## Trust Tier Score

| Score | Tier |
|-------|------|
| >= 9000 | A |
| >= 8000 | B |
| >= 7000 | C |
| >= 6000 | D |
| < 6000 | E |

## License

MIT