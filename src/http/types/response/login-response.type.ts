export type LoginResponse = {
  access_token?: string;
  token_type?: string;
  _links?: {
    revoke_token?: { href: string };
    revoke_all?: { href: string };
    account_emergency?: { href: string };
    bill_emergency?: { href: string };
  };
  refresh_token?: string;
  refresh_before?: string;
};
