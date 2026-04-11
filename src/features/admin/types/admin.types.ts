export type AdminUser = {
	id: string;
	name: string;
	email: string;
	isActive: boolean;
	createdAt: string;
	totalLeads: number;
	totalDeals: number;
	totalBusinesses: number;
};

export type AdminUserListQuery = {
	page?: number;
	limit?: number;
	search?: string;
	isActive?: boolean;
};

export type AdminUserListMeta = {
	total: number;
	page: number;
	limit: number;
	offset: number;
};

export type AdminUserListResponse = {
	items: AdminUser[];
	meta: AdminUserListMeta;
};

export type AdminUserDetailBusiness = {
	id: string;
	name: string;
	type: string | null;
	createdAt: string;
	updatedAt: string;
	leadCount: number;
	dealCount: number;
};

export type AdminUserLoginHistoryItem = {
	id: string;
	createdAt: string;
	expiresAt: string;
	revokedAt: string | null;
};

export type AdminUserDetails = {
	id: string;
	email: string;
	name: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	businesses: AdminUserDetailBusiness[];
	loginHistory: AdminUserLoginHistoryItem[];
};

export type AdminSystemStats = {
	totalUsers: number;
	totalActiveUsers: number;
	totalBusinesses: number;
	totalLeads: number;
	totalDeals: number;
	totalWonDeals: number;
	totalRevenue: number;
	newUsersThisWeek: number;
	newLeadsThisWeek: number;
	leadsByPlatform: Array<{ platform: string; count: number }>;
	leadsByStatus: Array<{ status: string; count: number }>;
	dealsByStage: Array<{ stage: string; count: number }>;
};

export type MessageResponse = {
	message: string;
};
