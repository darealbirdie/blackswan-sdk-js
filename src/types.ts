export type Network = "amoy" | "sepolia" | "polygon" | "mainnet";

export interface BlackSwanConfig {
  network: Network;
  rpcUrl: string;
  privateKey?: string;
}

export interface CreditDashboard {
  trustRatio: number;
  trustTierScore: "A" | "B" | "C" | "D" | "E";
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
}

export interface Reputation {
  repaidVolume: bigint;
  repaidVolumeFormatted: string;
  successfulLoans: number;
  defaults: number;
  loansTaken: number;
  trustRatio: number;
}