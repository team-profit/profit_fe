export interface ILoginRequestType {
  id: string;
  password: string;
}

export interface ILoginResponseType {
  accessToken: string;
  refreshToken: string;
}
