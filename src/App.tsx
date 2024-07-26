import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthUserProvider } from "./store/AuthUserProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <RouterProvider router={router} />
      </AuthUserProvider>
    </QueryClientProvider>
  );
}

export default App;
