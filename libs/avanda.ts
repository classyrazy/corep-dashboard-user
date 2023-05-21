import { Graph } from "@avanda/avandajs";
let sessionToken: string = "";
if (process.client) {
  sessionToken = localStorage.getItem("session-token") || "";
}
const config = useRuntimeConfig();
Graph.setAvandaConfig({
  rootUrl: config.apiBaseUrl,
});
Graph.setAxiosRequestConfig({
  baseURL: config.apiBaseUrl,
  // baseURL: "https://corep-server-v1.onrender.com",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${sessionToken}`,
  },
});

export default Graph;
