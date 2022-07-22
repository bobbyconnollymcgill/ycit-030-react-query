import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { AppWithCaching } from "./AppWithCaching"
// import { AppNoCaching } from "./AppNoCaching"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
            retryDelay: 5,
        },
    },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <QueryClientProvider client={queryClient}>
        <AppWithCaching />
    </QueryClientProvider>
)
