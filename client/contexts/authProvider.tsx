import React, { ReactNode, useState, createContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { instance } from "../api/utils";
import { createTeam } from "../api/team";
import { logUserIn, logUserOut } from "../api/auth";
import { Team, TeamFromDB } from "../interfaces/team";

interface ProviderProps {
  children : ReactNode;
}

interface LogInDetails {
  username : string;
  password : string;
}

interface AuthCtx {
  team : number|null;
  loading : boolean;
  error : unknown;
  signUp : (teamData : Team) => void;
  logOut : () => void;
  logIn : (logInDetails : LogInDetails) => void;
  isAuthenticated : boolean;
  loadingInitial : boolean;
}

const AuthContext = createContext<AuthCtx|null>(null);

export const AuthProvider = ({ children } : ProviderProps) => {
  const [team, setTeam] = useState<number|null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<unknown|null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const router = useRouter();

  React.useEffect(() => {
    if (error) setError(null);
  }, [router.pathname, error]);

  const getCurrentSession = React.useCallback(async () => {
    try {
      const fetchedData = await instance.get("/auth/current_session");
      setTeam(fetchedData.data.data.team);
      setIsAuthenticated(!!fetchedData.data.data.team);
    } catch (err) {
      throw new Error("fail");
    } finally {
      setLoadingInitial(false);
    }
  }, []);

  useEffect(() => {
    getCurrentSession();
  }, [router.pathname, getCurrentSession]);

  const signUp = (teamData : Team) => {
    setLoading(true);
    createTeam(teamData)
        .then((res) => {
          setTeam(res?.data?.team);
          setIsAuthenticated(true);
          router.push("/");
        })
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
  };

  const logIn = (logInDetails : LogInDetails) => {
    setLoading(true);
    console.log(logInDetails)
    logUserIn(logInDetails.username, logInDetails.password)
        .then((res) => {
          setTeam(res?.data.data.user);
          setIsAuthenticated(true);
          router.push("/");
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    logUserOut()
        .then(() => {
          setTeam(null);
          setIsAuthenticated(false);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
  };

  const value : AuthCtx = {
    team,
    loading,
    error,
    signUp,
    logIn,
    isAuthenticated,
    loadingInitial,
    logOut,
  };


  return (
      <AuthContext.Provider value={value}>
        {!loadingInitial && children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  let context = React.useContext(AuthContext)

  if (context === null) throw Error("AuthContext is not provided");

  return context;
};