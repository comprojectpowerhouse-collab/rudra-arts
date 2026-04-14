const DEFAULT_TTL_MS = 5 * 60 * 1000;
const memoryCache = new Map();
const inflightRequests = new Map();

const getStorageKey = (cacheKey) => `rudra-cache:${cacheKey}`;

const canUseStorage = () => typeof window !== "undefined" && !!window.sessionStorage;

export const getApiBaseUrl = () => {
  const configuredBaseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BASE_URL_PRODUCTION ||
    "";

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

export const buildApiUrl = (path) => `${getApiBaseUrl()}${path}`;

const readSessionCache = (cacheKey, ttlMs) => {
  if (!canUseStorage()) return null;

  try {
    const raw = window.sessionStorage.getItem(getStorageKey(cacheKey));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > ttlMs) {
      window.sessionStorage.removeItem(getStorageKey(cacheKey));
      return null;
    }

    memoryCache.set(cacheKey, parsed);
    return parsed.data;
  } catch {
    return null;
  }
};

const writeSessionCache = (cacheKey, data) => {
  if (!canUseStorage()) return;

  try {
    window.sessionStorage.setItem(
      getStorageKey(cacheKey),
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Ignore storage quota issues.
  }
};

export const getCachedData = (cacheKey, ttlMs = DEFAULT_TTL_MS) => {
  const inMemory = memoryCache.get(cacheKey);
  if (inMemory && Date.now() - inMemory.timestamp <= ttlMs) {
    return inMemory.data;
  }

  return readSessionCache(cacheKey, ttlMs);
};

export const setCachedData = (cacheKey, data) => {
  const payload = { timestamp: Date.now(), data };
  memoryCache.set(cacheKey, payload);
  writeSessionCache(cacheKey, data);
  return data;
};

export const fetchCachedJson = async (
  path,
  { cacheKey = path, ttlMs = DEFAULT_TTL_MS, force = false, init } = {}
) => {
  if (!force) {
    const cached = getCachedData(cacheKey, ttlMs);
    if (cached !== null) {
      return cached;
    }
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey);
  }

  const request = fetch(buildApiUrl(path), init).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  });

  inflightRequests.set(cacheKey, request);

  try {
    return await request;
  } finally {
    inflightRequests.delete(cacheKey);
  }
};
