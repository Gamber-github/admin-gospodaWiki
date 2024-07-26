let TOKEN: string | null = null;

export class TokenManager {
  static getToken() {
    return TOKEN;
  }

  static setToken(token: string | null) {
    TOKEN = token;
  }

  static getAuthHeader() {
    if (!TOKEN) {
      return {};
    }
    const res = { Authorization: `Bearer ${TOKEN}` };

    return res;
  }
}
