import { BlackSwanClient } from "./src/client";

const client = new BlackSwanClient({
  network: "amoy",
  rpcUrl: "https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY"
});

const wallet = "0xYOUR_WALLET_ADDRESS";

async function testSdk() {
  console.log("Testing BlackSwan SDK...\n");

  const hasSBT = await client.hasSoulboundToken(wallet);
  console.log("hasSoulboundToken:", hasSBT);

  if (hasSBT) {
    const dashboard = await client.getCreditDashboard(wallet);
    console.log("\nCreditDashboard:", {
      trustRatio: dashboard.trustRatio,
      trustTierScore: dashboard.trustTierScore,
      currentApr: dashboard.currentApr,
      totalBorrowedUsd: dashboard.totalBorrowedUsdFormatted,
      totalRepaidUsd: dashboard.totalRepaidUsdFormatted,
      interestRepaidUsd: dashboard.interestRepaidUsdFormatted,
      successfulLoans: dashboard.successfulLoans,
      defaults: dashboard.defaults
    });

    const reputation = await client.getReputation(wallet);
    console.log("\nReputation:", {
      repaidVolume: reputation.repaidVolumeFormatted,
      successfulLoans: reputation.successfulLoans,
      defaults: reputation.defaults,
      trustRatio: reputation.trustRatio
    });

    const history = await client.getCreditHistory(wallet);
    console.log("\nCreditHistory:", {
      loansTaken: history.loansTaken,
      totalBorrowed: history.totalBorrowedFormatted,
      totalRepaid: history.totalRepaidFormatted
    });
  }
}

testSdk();