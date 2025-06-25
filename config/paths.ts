export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  login: {
    path: "/login",
    getHref: (redirectTo?: string | null | undefined) =>
      `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    dashboard: {
      path: "",
      getHref: () => "/app",
    },
    deployments: {
      path: "deployments",
      getHref: () => "/app/deployments",
    },
    discussions: {
      path: "discussions",
      getHref: () => "/app/discussions",
    },
    discussion: {
      path: "discussions/:discussionId",
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      path: "users",
      getHref: () => "/app/users",
    },
    profile: {
      path: "profile",
      getHref: () => "/app/profile",
    },
  },
} as const;
