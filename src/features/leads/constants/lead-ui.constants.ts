import { APP_CONSTANTS } from "@/src/constants/config";
import { type LeadPriority, type LeadStatus } from "../types/lead.types";

export const leadStatusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: APP_CONSTANTS.LEAD_STATUS.NEW, label: "New" },
  { value: APP_CONSTANTS.LEAD_STATUS.CONTACTED, label: "Contacted" },
  { value: APP_CONSTANTS.LEAD_STATUS.CONVERTED, label: "Converted" },
  { value: APP_CONSTANTS.LEAD_STATUS.IGNORED, label: "Ignored" },
];

export const leadPriorityOptions: Array<{ value: LeadPriority; label: string }> = [
  { value: APP_CONSTANTS.LEAD_PRIORITY.LOW, label: "Low" },
  { value: APP_CONSTANTS.LEAD_PRIORITY.MEDIUM, label: "Medium" },
  { value: APP_CONSTANTS.LEAD_PRIORITY.HIGH, label: "High" },
];

export const leadStatusLabel: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  ignored: "Ignored",
};

export const leadPriorityLabel: Record<LeadPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const leadPriorityClassName: Record<LeadPriority, string> = {
  low: "bg-[#D5DEE7] text-[#2C4E6F]",
  medium: "bg-[#E2E8F0] text-[#334155]",
  high: "bg-[#FEE2E2] text-[#B91C1C]",
};

export const formatLeadDate = (value: string): string =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatLeadPlatform = (value: string): string => value.replace(/_/g, " ");
