import { Graph } from "@avanda/avandajs";
let sessionToken = "";
if (process.client) {
  sessionToken = localStorage.getItem("session-token");
}

Graph.setRequestConfig({
  baseURL: "http://192.168.43.215:4000/",
  withCredentials: true,
  headers: {
      Authorization: `Bearer ${sessionToken}`
  }
});

export default Graph;
