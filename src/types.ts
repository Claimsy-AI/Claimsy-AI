export type ClaimStatus = "new" | "in_review" | "negotiation" | "settled" | "closed";

export interface Claim {
  id: string;
  case_number: string;
  agency_id: string;
  insured_name: string;
  insured_contact: string;
  loss_date: string;
  loss_details: string;
  status: ClaimStatus;
  assigned_adjuster_id: string;
  assigned_vendor_id: string | null;
  referral_source: string | null;
  qa_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: "adjuster" | "manager" | "vendor_user" | "admin";
  agency_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agency {
  id: string;
  name: string;
  primary_contact_email: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  contact_email: string;
  phone: string | null;
  metadata: Record<string, unknown> | null;
  payment_details: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  claim_id: string;
  uploaded_by: string;
  vendor_id: string | null;
  filename: string;
  file_type: string;
  file_size: number;
  storage_key: string;
  tags: string[] | null;
  meta: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface TimelineEvent {
  id: string;
  claim_id: string;
  event_type: "note" | "status_change" | "email" | "call" | "document_uploaded";
  body: string;
  meta: Record<string, unknown> | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface WorkflowStage {
  id: string;
  title: string;
  summary: string;
  outputs: string[];
  status: "incoming" | "active" | "loop" | "closing";
}

export interface CarrierLoopStep {
  id: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface SwimlanePhase {
  id: string;
  title: string;
  adjuster: string;
  client: string;
  carrier: string;
  vendor: string;
}

export type ReferralStatus = "pending" | "in_progress" | "awaiting_approval" | "completed" | "declined";

export interface Referral {
  id: string;
  claim_id: string;
  policyholder: string;
  loss_type: string;
  referred_partner: string;
  referral_date: string;
  status: ReferralStatus;
  progress: number;
  last_update: string;
}
