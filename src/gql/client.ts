import { GraphQLClient } from "graphql-request";

const gqClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL);

export default gqClient;
