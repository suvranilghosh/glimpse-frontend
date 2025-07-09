export type Lead = {
  leadId: string;
  leadName: string;
  contactInformation: string;
  source: string;
  interestLevel: string;
  status: string;
  assignedSalesPerson: string;
  createdAt: string;
};

export type PaginatedResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Lead[];
};
