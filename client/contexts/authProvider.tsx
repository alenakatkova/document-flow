import React, { ReactNode, useState, createContext, useEffect, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { instance } from "../api/utils";
import { createTeam } from "../api/team";
import { logUserIn, logUserOut } from "../api/auth";
import { Team, TeamFromDB } from "../interfaces/team";
import { use } from "i18next";

interface ProviderProps {
  children : ReactNode;
}

interface AuthCtx {
  team : TeamFromDB|null;
  loading : boolean;
  error : unknown;
  signUp : (teamData : Team) => void;
  isAuthenticated : boolean;
  loadingInitial : boolean;
}

const AuthContext = createContext<AuthCtx|null>(null);

export const AuthProvider = ({ children } : ProviderProps) => {
  const [team, setTeam] = useState<TeamFromDB|null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<unknown|null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // const navigate = useNavigate();
  // const location = useLocation();

  const router = useRouter();

  React.useEffect(() => {
    if (error) setError(null);
  }, [router.pathname, error]);

  const getCurrentSession = React.useCallback(async () => {
    try {
      const fetchedData = await instance.get("/auth/current_session");
      console.log(fetchedData)
      console.log(fetchedData.data)
      console.log(fetchedData.data.data)
      console.log(fetchedData.data.data.team)
      setTeam(fetchedData.data.data.team);
      setIsAuthenticated(fetchedData.data.data.team !== undefined);
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
          // navigate("/");
          router.push("/signup");
        })
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
  };

  // const logIn = (username, password) => {
  //   setLoading(true);
  //   logUserIn(username, password)
  //       .then((res) => {
  //         setTeam(res.data.data.user);
  //         setIsAuthenticated(true);
  //         navigate("/");
  //       })
  //       .catch((error) => setError(error))
  //       .finally(() => setLoading(false));
  // };
  //
  // const logOut = () => {
  //   setLoading(true);
  //   logUserOut()
  //       .then(() => {
  //         setTeam(null);
  //         setIsAuthenticated(false);
  //       })
  //       .catch((error) => setError(error))
  //       .finally(() => setLoading(false));
  // };


  const memoedValue : AuthCtx = useMemo(
      () => ({
        team,
        loading,
        error,
        signUp,
        // logIn,
        isAuthenticated,
        loadingInitial
        // logOut,
      }),
      [team, isAuthenticated, loading, error]
  );

  return (
      <AuthContext.Provider value={memoedValue}>
        {!loadingInitial && children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  let context = React.useContext(AuthContext)

  if (context === null) throw Error("df")

  return context;
};