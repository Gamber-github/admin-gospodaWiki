import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthUserProvider } from "./store/AuthUserProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000),
      cacheTime: 10 * (60 * 1000),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </AuthUserProvider>
    </QueryClientProvider>
  );
}

export default App;
