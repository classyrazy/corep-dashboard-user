import { Graph } from "@avanda/avandajs";
let sessionToken: string = "";
if (process.client) {
  sessionToken = localStorage.getItem("session-token") || '';
}

Graph.setRequestConfig({
  // baseURL: "http://192.168.43.133:5000/",
  baseURL: "https://corep-server-v1.onrender.com",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${sessionToken}`
  }
});

export default Graph;
