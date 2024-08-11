import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";
const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "master",
  clientId: "tic_tac_toe",
});

export function useAuthentication(): boolean {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: "check-sso" });
        setAuthenticated(authenticated);
        console.log(
          `User is ${authenticated ? "authenticated" : "not authenticated"}`
        );
      } catch (error) {
        console.error("Failed to initialize adapter:", error);
      }
    })();
  }, []);
  return authenticated;
}

export const getKeyCloak = () => keycloak;
