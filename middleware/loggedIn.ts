import Graph from "../libs/avanda";
export default async function () {
  let data = null;
  try {
    let req = new Graph().service("User/getLoggedInUser");
    data = await (await req.get()).getData();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  if (!data) {
    return "/login";
  }
  console.log("Hello from loggedIn.ts", data);
}
