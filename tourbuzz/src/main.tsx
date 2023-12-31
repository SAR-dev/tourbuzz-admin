import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/tailwind.css";
import './css/toast.css';
import 'react-tooltip/dist/react-tooltip.css'

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { Tooltip } from "react-tooltip";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
        <Tooltip id="tooltip" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
