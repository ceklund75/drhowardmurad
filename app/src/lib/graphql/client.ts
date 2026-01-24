import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    credentials: "same-origin",
  }),
});