export const SBT_ABI = [
  "function balanceOf(address user) view returns (uint256)",
  "function userTokenId(address) view returns (uint256)",
  "function hasSoul(address user) view returns (bool)",
  "function tokenOf(address user) view returns (uint256)",
  "function getCreditDashboard(address user) view returns (uint256 trustRatio, uint256 currentApr, uint256 totalBorrowedUsd, uint256 totalRepaidUsd, uint256 principalRepaidUsd, uint256 interestRepaidUsd, uint256 successfulLoans, uint256 defaults, uint8 tier)",
  "function getCreditDashboardByTokenId(uint256 tokenId) view returns (address user, uint256 trustRatio, uint256 currentApr, uint256 totalBorrowedUsd, uint256 totalRepaidUsd, uint256 principalRepaidUsd, uint256 interestRepaidUsd, uint256 successfulLoans, uint256 defaults, uint8 tier)",
  "function getCreditHistory(address user) view returns (uint256 loansTaken, uint256 totalBorrowed, uint256, uint256 totalRepaid, uint256)",
  "function getReputation(address user) view returns (uint256 repaidVolume, uint256 successfulLoans, uint256 defaults, uint256 loansTaken, uint8 tier, uint256 trustRatio)",
  "function getReputationByTokenId(uint256 tokenId) view returns (address user, uint256 repaidVolume, uint256 successfulLoans, uint256 defaults, uint256 loansTaken, uint8 tier, uint256 trustRatio)",
  "function getTrustRatio(address user) view returns (uint256)",
  "function getTrustTier(address user) view returns (string)",
  "function getCurrentRisk(address user) view returns (uint256)"
];