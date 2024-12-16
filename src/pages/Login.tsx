import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { signInWithGitHub } from "@/firebase.config";

export function Login() {
  const { authState, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authState.isAuthenticated, navigate]);

  const handleGithubAuthentication = async () => {
    try {
      const response = await signInWithGitHub();
      login(response);
    } catch (error) {
      console.log("Error authenticating with GitHub using firebase.");
      console.log("src/pages/Login.tsx");
      console.log(error);
    }
  };
  return (
    <div className="mx-auto text-center flex flex-col gap-2">
      <h1 className="text-xl font-medium mt-4">Login to Ming.</h1>
      <div className="flex flex-col gap-2 items-center">
        <button
          className=" rounded-sm bg-black text-white text-sm py-2 px-4 w-[80vw] md:w-[30vw]"
          onClick={() => handleGithubAuthentication()}
        >
          <i className="ri-github-fill"></i> Sign in with Github
        </button>
      </div>
    </div>
  );
}
