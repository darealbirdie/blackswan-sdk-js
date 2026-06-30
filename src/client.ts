import { ethers } from "ethers";
import { BlackSwanConfig, CreditDashboard, Reputation } from "./types";
import { CONTRACT_ADDRESSES } from "./contracts";
import { SBT_ABI } from "./abi";

export class BlackSwanClient {
  private provider: ethers.JsonRpcProvider;
  private signer?: ethers.Wallet;
  private sbtContract: ethers.Contract;

  constructor(private config: BlackSwanConfig) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    if (config.privateKey) {
      this.signer = new ethers.Wallet(config.privateKey, this.provider);
    }

    const address = CONTRACT_ADDRESSES[config.network].BLACKSWANSBT;
    this.sbtContract = new ethers.Contract(
      address,
      SBT_ABI,
      this.signer || this.provider
    );
  }

  async hasSoulboundToken(wallet: string): Promise<boolean> {
    const tokenId = await this.sbtContract.userTokenId(wallet);
    return tokenId > 0;
  }

  async getTrustRatio(wallet: string): Promise<number> {
    const ratio = await this.sbtContract.getTrustRatio(wallet);
    return Number(ratio);
  }

  async getCreditDashboard(wallet: string): Promise<CreditDashboard> {
    const [
      trustRatio,
      currentApr,
      totalBorrowedUsd,
      totalRepaidUsd,
      principalRepaidUsd,
      interestRepaidUsd,
      successfulLoans,
      defaults,
      _tier
    ] = await this.sbtContract.getCreditDashboard(wallet);

    return {
      trustRatio: Number(trustRatio),
      trustTierScore: this.tierFromScore(Number(trustRatio)),
      currentApr: Number(currentApr),
      totalBorrowedUsd,
      totalRepaidUsd,
      principalRepaidUsd,
      interestRepaidUsd,
      interestRepaidUsdFormatted: this.formatUsdRaw(interestRepaidUsd),
      successfulLoans: Number(successfulLoans),
      defaults: Number(defaults),
      totalBorrowedUsdFormatted: this.formatUsdRaw(totalBorrowedUsd),
      totalRepaidUsdFormatted: this.formatUsdRaw(totalRepaidUsd)
    };
  }

  async getReputation(wallet: string): Promise<Reputation> {
    const [repaidVolume, successfulLoans, defaults, loansTaken, _tier, trustRatio] =
      await this.sbtContract.getReputation(wallet);

    return {
      repaidVolume,
      repaidVolumeFormatted: this.formatUsdWei(repaidVolume),
      successfulLoans: Number(successfulLoans),
      defaults: Number(defaults),
      loansTaken: Number(loansTaken),
      trustRatio: Number(trustRatio)
    };
  }

  async getCurrentApr(wallet: string): Promise<number> {
    const dashboard = await this.sbtContract.getCreditDashboard(wallet);
    return Number(dashboard.currentApr);
  }

  async getTrustTier(wallet: string): Promise<"A" | "B" | "C" | "D" | "E"> {
    const trustRatio = await this.getTrustRatio(wallet);
    return this.tierFromScore(trustRatio);
  }

  async getCreditHistory(wallet: string): Promise<{
    loansTaken: number;
    totalBorrowed: bigint;
    totalRepaid: bigint;
    totalBorrowedFormatted: string;
    totalRepaidFormatted: string;
  }> {
    const [loansTaken, totalBorrowed, _unused1, totalRepaid, _unused2] =
      await this.sbtContract.getCreditHistory(wallet);

    return {
      loansTaken: Number(loansTaken),
      totalBorrowed,
      totalRepaid,
      totalBorrowedFormatted: this.formatUsdWei(totalBorrowed),
      totalRepaidFormatted: this.formatUsdWei(totalRepaid)
    };
  }

  async getCurrentRisk(wallet: string): Promise<number> {
    const risk = await this.sbtContract.getCurrentRisk(wallet);
    return Number(risk);
  }

  private formatUsdRaw(value: bigint): string {
    return `$${Number(value)}`;
  }

  private formatUsdWei(value: bigint): string {
    const formatted = Number(value) / Math.pow(10, 18);
    return `$${formatted.toFixed(2)}`;
  }

  private tierFromScore(score: number): "A" | "B" | "C" | "D" | "E" {
    if (score >= 9000) return "A";
    if (score >= 8000) return "B";
    if (score >= 7000) return "C";
    if (score >= 6000) return "D";
    return "E";
  }
}