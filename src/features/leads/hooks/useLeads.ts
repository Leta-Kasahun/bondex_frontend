import {
	createLead,
	createLeadNote,
	deleteLead,
	getLeadById,
	listLeadNotes,
	listLeads,
	updateLead,
	updateLeadNote,
} from "../services";
import {
	type CreateLeadInput,
	type LeadListQuery,
	type LeadNoteInput,
	type UpdateLeadInput,
} from "../types/lead.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const LEAD_LIST_KEY = buildFeatureKey("leads", "list");

export const useLeads = (params?: LeadListQuery, enabled = true) =>
	useFeatureQuery({
		queryKey: [...LEAD_LIST_KEY, JSON.stringify(params ?? {})],
		queryFn: () => listLeads(params),
		enabled,
	});

export const useLead = (leadId?: string) =>
	useFeatureQuery({
		queryKey: buildFeatureKey("leads", "detail", leadId),
		queryFn: () => getLeadById(leadId as string),
		enabled: Boolean(leadId),
	});

export const useLeadNotes = (leadId?: string) =>
	useFeatureQuery({
		queryKey: buildFeatureKey("leads", "notes", leadId),
		queryFn: () => listLeadNotes(leadId as string),
		enabled: Boolean(leadId),
	});

export const useCreateLead = () =>
	useFeatureMutation((payload: CreateLeadInput) => createLead(payload), {
		invalidateKeys: [LEAD_LIST_KEY],
	});

export const useUpdateLead = () =>
	useFeatureMutation(
		(input: { leadId: string; payload: UpdateLeadInput }) =>
			updateLead(input.leadId, input.payload),
		{ invalidateKeys: [LEAD_LIST_KEY] }
	);

export const useDeleteLead = () =>
	useFeatureMutation((leadId: string) => deleteLead(leadId), {
		invalidateKeys: [LEAD_LIST_KEY],
	});

export const useCreateLeadNote = () =>
	useFeatureMutation(
		(input: { leadId: string; payload: LeadNoteInput }) =>
			createLeadNote(input.leadId, input.payload),
		{ invalidateKeys: [LEAD_LIST_KEY] }
	);

export const useUpdateLeadNote = () =>
	useFeatureMutation(
		(input: { leadId: string; noteId: string; payload: LeadNoteInput }) =>
			updateLeadNote(input.leadId, input.noteId, input.payload),
		{ invalidateKeys: [LEAD_LIST_KEY] }
	);
