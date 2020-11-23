import auth0 from "../../lib/Auth0/auth0";

export default async function session(req, res) {

  try {
    const data = await auth0.getSession(req);
    
    const userObj = await Object.values(data)[0];
    const token = await Object.values(userObj)[2];
    const authObj = await { accessToken: data.accessToken, token: token };

    res.send(authObj);
    res.status(200).end(authObj);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}


