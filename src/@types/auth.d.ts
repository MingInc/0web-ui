declare namespace Auth {
  interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
  }

  interface AuthContextType {
    authState: AuthState;
    login: (user: any) => void;
    logout: () => void;
  }

  type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };
}
