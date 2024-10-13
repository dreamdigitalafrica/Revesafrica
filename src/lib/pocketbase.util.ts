import PocketBase from "pocketbase";

export const pbUrl = "https://revesfoundation.pockethost.io/";
const pbClient = new PocketBase(pbUrl);

export default pbClient;
