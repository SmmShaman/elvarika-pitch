import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { BlogContext } from "@/hooks/useBlog";
import { Blog } from "@/pages/Blog";

import { Business } from "@/pages/Business";

function Router() {
  return (
    <Switch>
      {/* Business page as main page */}
      <Route path="/" component={Business} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const blogContextValue = {
    openBlog: () => setIsBlogOpen(true)
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BlogContext.Provider value={blogContextValue}>
          <Toaster />
          <Router />
          <Blog isOpen={isBlogOpen} onClose={() => setIsBlogOpen(false)} />
        </BlogContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
