export const Api = () => {
  let data = {
    baseURL: "https://api.intra.42.fr/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const token = localStorage.getItem("token");
  if (token) data.headers["Authorization"] = "Bearer " + token;
  return axios.create(data);
};

export const generateToken = async () => {
  return new Promise((resolve) => {
    const credentials = {
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    Api()
      .post("/oauth/token", new URLSearchParams(credentials).toString())
      .then((res) => resolve(res.data.access_token))
      .catch((err) => console.log(err));
  });
};

export const checkToken = (token) =>
  new Promise((resolve) => {
    Api(token)
      .get("/oauth/token/info")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => resolve(err.response.data));
  });
