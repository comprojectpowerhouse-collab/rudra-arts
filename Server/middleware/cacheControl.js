export const publicCache = ({
  sMaxAge = 300,
  staleWhileRevalidate = 3600,
} = {}) => {
  return (_req, res, next) => {
    res.set(
      "Cache-Control",
      `public, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
    );
    next();
  };
};

export const noStore = (_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
};
