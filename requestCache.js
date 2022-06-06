const cacheRequest = (cacheName, requestUrl, onCacheCallback) => {
  caches.open(cacheName).then((cache) => {
    cache.match(requestUrl).then((resp) => {
      if (!resp) {
        caches.open(cacheName).then((newCache) => {
          newCache.add(requestUrl).then(() => {
            cacheRequest(cacheName, requestUrl, onCacheCallback);
          });
        });
      } else {
        resp.json().then((response) => {
          onCacheCallback(response);
        });
      }
    });
  });
};

export default cacheRequest;
