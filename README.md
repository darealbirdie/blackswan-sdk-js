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
AMOY_CONTRACTS.P2PLENDING   // 0x85DF6de0C868927c0600D96b10F31777D5f26C82
AMOY_CONTRACTS.BLACKSWANSBT  // 0x4bdF83dA3f6cce61dfDDAce51c92E696f8e00171

// Sepolia Testnet
SEPOLIA_CONTRACTS.P2PLENDING  // 0x0595e518b218E66C84ae195020df080809f41535
SEPOLIA_CONTRACTS.BLACKSWANSBT // 0xc7432A7973a2c58feBA0B194bbbbf22947946BBc
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
//   trustTier: 'A',
//   currentApr: 142,
//   totalBorrowedUsd: '...',
//   totalRepaidUsd: '...',
//   interestRepaidUsd: '...',
//   successfulLoans: 1,
//   defaults: 0,
//   tier: 0
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
- `hasSoul(wallet)` - Returns bool if wallet owns SBT
- `tokenOf(wallet)` - Returns SBT token ID
- `getCreditDashboard(wallet)` - Get trustRatio, trustTier (AAA-B), currentApr, amounts, loans, tier
- `getCreditDashboardByTokenId(tokenId)` - Same as above, looks up by SBT token
- `getReputation(wallet)` - Get repaidVolume, loans, trustRatio, tier
- `getReputationByTokenId(tokenId)` - Same, looks up by token
- `getCurrentApr(wallet)` - Get current APR
- `getTrustTier(wallet)` - Get trust tier (AAA, AA, A, BBB, BB, B)
- `getTrustRatio(wallet)` - Get trust ratio (0-10000)
- `getCreditHistory(wallet)` - Get loan history with formatted USD amounts
- `getCurrentRisk(wallet)` - Get current risk score

## Trust Tier

| Score | Tier |
|-------|------|
| >= 9000 | AAA |
| >= 8000 | AA |
| >= 7000 | A |
| >= 6000 | BBB |
| >= 5000 | BB |
| < 5000 | B |

## License

MIT