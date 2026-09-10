export const messages = {
  welcome: "Welcome",
  title: "Test Page",
  searchPlaceholder: "start searching",
  search: "Search",
  clearSearch: "Clear search",
  searchResults: "Search results",
  searching: "Searching",
  recentSearches: "Recent searches",
  showMore: "Show more",
  showAll: "Show all",
  signIn: "Sign in",
  signUp: "Sign up",
  account: "Account",
  notFoundCode: "404",
  notFoundTitle: "Page not found",
  notFoundDescription: "The page you are looking for does not exist or may have moved.",
  backToMain: "Back to main page",
  resultFor: (query: string) =>
    `Here are some mock results for "${query}". This sample text includes your search so you can see how results will appear.`,
};

export type Messages = typeof messages;
