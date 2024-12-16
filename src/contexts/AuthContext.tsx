import { auth } from "@/firebase.config";
import { getRedirectResult, GithubAuthProvider } from "firebase/auth";
import React, { createContext, useReducer, ReactNode, useEffect } from "react";

// Create the Context
export const AuthContext = createContext<Auth.AuthContextType | undefined>(
  undefined
);

// @dev Initial Authentication State after rendering application
const initialState: Auth.AuthState = {
  isAuthenticated: false,
  user: null,
};

// Reducer function
const authReducer = (
  authState: Auth.AuthState,
  action: Auth.AuthAction
): Auth.AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("mowhq_cookie_user", JSON.stringify(action.payload));
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      auth.signOut().then(
        () => {
          localStorage.removeItem("mowhq_cookie_user");
        },
        (error) => {
          console.log("User Signout Error from /src/contexts/AuthContext.tsx");
          console.error("Sign Out Error", error);
        }
      );

      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return authState;
  }
};

// Context Provider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (user: any) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    auth.onAuthStateChanged((_user) => {
      if (_user != null) {
        dispatch({ type: "LOGIN", payload: _user });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
