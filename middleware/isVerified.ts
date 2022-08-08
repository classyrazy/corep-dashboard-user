import Graph from "../libs/avanda";
export default async function () {
  let data = null;
  try {
    let req = new Graph().service("User/checkIfVerified");
    data = await (await req.get()).getData();
  } catch (error) {
    console.log(error);
    if (error.getMsg() === "not verified" && error.getData() === null) {
      return "/email-verification";
    }
  }
  console.log("Hello from verified.ts", data);
}
