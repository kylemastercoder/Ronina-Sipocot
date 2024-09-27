import { init, Applications } from "@kinde/management-api-js";

export const getConnections = async () => {
  init({
    kindeDomain: process.env.KINDE_ISSUER_URL!,
    clientId: process.env.KINDE_CLIENT_ID,
    clientSecret: process.env.KINDE_CLIENT_SECRET,
  });
  const { connections } = await Applications.getApplicationConnections({
    applicationId: process.env.KINDE_APPLICATION_ID!,
  });

  return connections;
};
