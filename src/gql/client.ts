import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

const gqClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL);
const sdk = getSdk(gqClient);

export default gqClient;
export {sdk};

