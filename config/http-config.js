import axios from "axios";

const client = axios.create({
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": window.location.origin, // For CORS (if not using proxy)
    "x-xss-protection": "1; mode=block",
    "referrer-policy": "same-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "cache-control": "no-cache, no-store , max-age=31536000",
    "X-Frame-Options": "SAMEORIGIN",
    "Content-Security-Policy":
      "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'"
    // "X-TenantID": "lifescan"
  }
});

const fetchAccessToken = () => {
  if (sessionStorage.getItem("authInfo")) {
    const authInfo = JSON.parse(sessionStorage.getItem("authInfo"));
    return authInfo.accessToken;
  }
  return null;
};

// AXIOS API CALL
export const apiCall = async ({ url, method = "GET", xTenantId, data = {} }) => {
  const axiosOptions = Object.assign({}, { url }, { method }, { data });
  // AXIOS REQUEST
  client.interceptors.request.use(
    (config) => {
      // add token  ----> getAppToken();
      const token = fetchAccessToken();
      const localSubDomain = sessionStorage.getItem("tenantId") ? sessionStorage.getItem("tenantId") : "lifescan";
      config.headers["X-TenantID"] = xTenantId || localSubDomain;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  // AXIOS RESPONSE
  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error && error.response && error.response.status === 401) {
        // window.location = "/";
        return new Promise(() => { });
      } else if (error && error.response && error.response.status === 500) {
        return new Promise(() => { });
      } else {
        return Promise.reject(error);
      }
    }
  );
  return new Promise((resolve, reject) => {
    client
      .request(axiosOptions)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
