export type Network = "amoy" | "sepolia" | "polygon" | "mainnet";

export interface BlackSwanConfig {
  network: Network;
  rpcUrl: string;
  privateKey?: string;
}

export interface CreditDashboard {
  trustRatio: number;
  trustTier: "AAA" | "AA" | "A" | "BBB" | "BB" | "B";
  currentApr: number;
  totalBorrowedUsd: bigint;
  totalRepaidUsd: bigint;
  principalRepaidUsd: bigint;
  interestRepaidUsd: bigint;
  interestRepaidUsdFormatted: string;
  successfulLoans: number;
  defaults: number;
  totalBorrowedUsdFormatted: string;
  totalRepaidUsdFormatted: string;
  tier: number;
}

export interface Reputation {
  repaidVolume: bigint;
  repaidVolumeFormatted: string;
  successfulLoans: number;
  defaults: number;
  loansTaken: number;
  trustRatio: number;
  tier: number;
}