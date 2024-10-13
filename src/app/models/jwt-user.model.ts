import { AppConstants } from '../utils/app-constants';

export class JwtUser {
  constructor(
    public id: number,
    public email: string,
    private jwt: string,
    public accountId: number
  ) {}

  public get jwtTimeStamp(): number {
    return JSON.parse(atob(this.jwt.split('.')[1])).exp;
  }

  public get expirationTime(): number {
    return this.jwtTimeStamp * 1000 - new Date().getTime();
  }

  public get jwtToken(): string {
    return this.expirationTime > 0 ? this.jwt : null;
  }

  public static fromLocalStorage(): JwtUser {
    const userData: {
      id: number;
      email: string;
      jwt: string;
      accountId: number;
    } = JSON.parse(localStorage.getItem(AppConstants.USER_LOCALSTORAGE_KEY));
    if (!userData) {
      return null;
    }
    return new JwtUser(
      userData.id,
      userData.email,
      userData.jwt,
      userData.accountId
    );
  }
}
