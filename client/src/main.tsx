import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import App from "./App.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URI,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ApolloProvider>
);
