import { API_ROUTES } from "@/src/config/api";
import {
	requestDelete,
	requestGet,
	requestPost,
	requestPut,
} from "@/src/features/shared/services";
import {
	type CreateLeadInput,
	type Lead,
	type LeadListQuery,
	type LeadNote,
	type LeadNoteInput,
	type UpdateLeadInput,
} from "../types/lead.types";

export const createLead = (payload: CreateLeadInput) =>
	requestPost<Lead, CreateLeadInput>(API_ROUTES.LEADS.BASE, payload);

export const listLeads = (params?: LeadListQuery) =>
	requestGet<Lead[]>(API_ROUTES.LEADS.BASE, { params });

export const getLeadById = (leadId: string) => requestGet<Lead>(`${API_ROUTES.LEADS.BASE}/${leadId}`);

export const updateLead = (leadId: string, payload: UpdateLeadInput) =>
	requestPut<Lead, UpdateLeadInput>(`${API_ROUTES.LEADS.BASE}/${leadId}`, payload);

export const deleteLead = (leadId: string) =>
	requestDelete<{ message: string }>(`${API_ROUTES.LEADS.BASE}/${leadId}`);

export const listLeadNotes = (leadId: string) =>
	requestGet<LeadNote[]>(`${API_ROUTES.LEADS.BASE}/${leadId}/notes`);

export const createLeadNote = (leadId: string, payload: LeadNoteInput) =>
	requestPost<LeadNote, LeadNoteInput>(`${API_ROUTES.LEADS.BASE}/${leadId}/notes`, payload);

export const updateLeadNote = (leadId: string, noteId: string, payload: LeadNoteInput) =>
	requestPut<LeadNote, LeadNoteInput>(`${API_ROUTES.LEADS.BASE}/${leadId}/notes/${noteId}`, payload);
