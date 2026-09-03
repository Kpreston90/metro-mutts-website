import { useEffect } from "react";

const GINGR_LOGIN_URL =
  "https://metromutts.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";

export default function CustomerLoginRedirect() {
  useEffect(() => {
    window.location.replace(GINGR_LOGIN_URL);
  }, []);

  return <main className="min-h-screen bg-white" aria-busy="true" />;
}
