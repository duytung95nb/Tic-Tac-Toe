import "./App.scss";
import { RoomConnection } from "./views/components/roomConnection/RoomConnection";
import { getKeyCloak, useAuthentication } from "./domain/auth/keycloak";
import Button from "./views/components/Button";
import { useEffect, useState } from "react";
import { KeycloakProfile } from "keycloak-js";

function App() {
  const authenticated = useAuthentication();
  const keycloak = getKeyCloak();
  const [userProfile, setUserProfile] = useState<KeycloakProfile | undefined>(
    keycloak.profile
  );
  useEffect(() => {
    if (!authenticated) {
      return;
    }
    (async () => {
      try {
        const profile = await keycloak.loadUserProfile();
        setUserProfile(profile);
        console.log("Loading user profile success");
      } catch (e) {
        console.error("Loading user profile failed", e);
      }
    })();
  }, [authenticated]);
  const onLoginClicked = async () => {
    try {
      await keycloak.login();
      console.log("Login success");
    } catch (e) {
      console.error("Login fail", e);
    }
  };
  if (authenticated) {
    return (
      <>
        <div>Username: {userProfile?.username}</div>
        <RoomConnection />
      </>
    );
  } else {
    return (
      <>
        Need login
        <Button text="Login" onClick={onLoginClicked} />
      </>
    );
  }
}

export { App };
