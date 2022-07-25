import { Graph } from "@avanda/avandajs";
let sessionToken = "";
if (process.client) {
  sessionToken = localStorage.getItem("session-token");
}

Graph.setRequestConfig({
  // baseURL: "http://192.168.43.43:4000/",
  baseURL: "https://corep-server-v1-test-1.herokuapp.com/",
  withCredentials: true,
  headers: {
      Authorization: `Bearer ${sessionToken}`
  }
});

export default Graph;
