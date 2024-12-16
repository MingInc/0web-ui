import { auth } from "@/firebase.config";
import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { getRedirectResult, User } from "firebase/auth";

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

  const login = (user: User) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    });

    // Handle redirect result when returning to the app
    (async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          dispatch({ type: "LOGIN", payload: authState });
        }
      } catch (error) {
        console.error("Error handling redirect sign-in:", error);
      }
    })();

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
