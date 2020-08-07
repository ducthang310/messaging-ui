export interface LoginData {
  email: string;
  password: string;
}
export interface ResponseAuth {
  data: {
    refresh_token: string;
    access_token: string;
    token_type: string;
    expires_in: number
  };
}

export interface AppJwtToken {
  exp: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
}
