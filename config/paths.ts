export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    callback: {
      path: "/auth/callback",
      getHref: () => "/auth/callback",
    },
    login: {
      path: "/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },

  waitlist: {
    path: "/waitlist",
    getHref: () => "/waitlist",
  },

  app: {
    root: {
      path: "/",
      getHref: () => "/",
    },
    billing: {
      path: "/billing",
      getHref: () => "/billing",
    },
    serviceComposer: {
      path: "/service-composer",
      getHref: () => "/service-composer",
    },
    dashboard: {
      path: "",
      getHref: () => "/app",
    },
    deployments: {
      path: "deployments",
      getHref: () => "/deployments",
    },
    discussions: {
      path: "discussions",
      getHref: () => "/discussions",
    },
    discussion: {
      path: "discussions/:discussionId",
      getHref: (id: string) => `/discussions/${id}`,
    },
    users: {
      path: "users",
      getHref: () => "/users",
    },
    profile: {
      path: "profile",
      getHref: () => "/profile",
    },
  },
} as const;
