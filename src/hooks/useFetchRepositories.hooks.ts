// import { useToast } from "@/components/ui";
import { auth } from "@/firebase.config";
// import { fetchRepositories } from "@/services/github.services";
import { getRedirectResult, GithubAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";

export const useRepositories = () => {
  // const [repos, setRepos] = useState<[] | Component.Repo[]>([]);
  const repos: any = [];
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null); // Specify type for error
  // const { notify } = useNotification();  // Using a notification hook to alert user
  // const { toast } = useToast();
  useEffect(() => {
    auth.onAuthStateChanged((_user) => {
      setLoading(true);
      getRedirectResult(auth).then((result: any) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = credential.accessToken;
          // ...
          console.log(token);
        }

        // The signed-in user info.
        const user = result?.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setLoading(false);
      });
      // .catch((error: any) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      // });
    });
  }, []);

  // remove {}
  return { repos, loading, error: {} };
};
