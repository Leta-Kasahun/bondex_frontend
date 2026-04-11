import { APP_CONSTANTS } from "@/src/constants/config";
import { type DealStage } from "../types/deal.types";

export const dealStageOptions: Array<{ value: DealStage; label: string }> = [
  { value: APP_CONSTANTS.DEAL_STAGE.QUALIFIED, label: "Qualified" },
  { value: APP_CONSTANTS.DEAL_STAGE.PROPOSAL, label: "Proposal" },
  { value: APP_CONSTANTS.DEAL_STAGE.NEGOTIATION, label: "Negotiation" },
  { value: APP_CONSTANTS.DEAL_STAGE.WON, label: "Won" },
  { value: APP_CONSTANTS.DEAL_STAGE.LOST, label: "Lost" },
];

export const dealStageLabel: Record<DealStage, string> = {
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export const dealStageClassName: Record<DealStage, string> = {
  qualified: "bg-[#E2E8F0] text-[#334155]",
  proposal: "bg-[#DBEAFE] text-[#1D4ED8]",
  negotiation: "bg-[#FEF3C7] text-[#92400E]",
  won: "bg-[#DCFCE7] text-[#166534]",
  lost: "bg-[#FEE2E2] text-[#B91C1C]",
};

export const formatDealDate = (value: string): string =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
