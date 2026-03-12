import type { BondStatus } from "../types";

const statusSlug: Record<BondStatus, string> = {
  Application: "application",
  Underwriting: "underwriting",
  Active: "active",
  "Claim Filed": "claim-filed",
  Renewed: "renewed",
  Cancelled: "cancelled",
  Expired: "expired",
  "Information Requested": "information-requested",
};

export default function StatusBadge({ status }: { status: BondStatus }) {
  return (
    <span className="status-badge" data-status={statusSlug[status]}>
      {status}
    </span>
  );
}
