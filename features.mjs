function canUseStorage(win) {
  try {
    const storage = win.localStorage;
    const key = '__nexus_mobile_storage_probe__';
    const previous = storage.getItem(key);
    try {
      storage.setItem(key, '1');
      return storage.getItem(key) === '1';
    } finally {
      if (previous === null) storage.removeItem(key);
      else storage.setItem(key, previous);
    }
  } catch {
    return false;
  }
}

// Accepting an optional scope also permits deterministic server/browser tests.
export function detectFeatures(scope = globalThis) {
  const win = scope.window;
  if (!win) return {};
  const nav = win.navigator;
  const mobile = /iPhone|iPad|iPod|Android/i.test(nav.userAgent);
  return {
    isMobile: mobile,
    isTablet: /iPad|Android/i.test(nav.userAgent) && !/Mobile/i.test(nav.userAgent),
    isDesktop: !mobile,
    isSmallScreen: win.innerWidth < 640,
    isMediumScreen: win.innerWidth >= 640 && win.innerWidth < 1024,
    isLargeScreen: win.innerWidth >= 1024,
    hasTouch: 'ontouchstart' in win || nav.maxTouchPoints > 0,
    hasServiceWorker: 'serviceWorker' in nav,
    hasNotifications: 'Notification' in win,
    hasGeolocation: 'geolocation' in nav,
    isOnline: nav.onLine,
    connection: nav.connection || nav.mozConnection || nav.webkitConnection,
    hasLocalStorage: canUseStorage(win),
  };
}
