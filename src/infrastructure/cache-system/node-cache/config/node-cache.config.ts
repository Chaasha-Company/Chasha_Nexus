import NodeCache from 'node-cache';

export const nodeCacheConfig = new NodeCache({
  deleteOnExpire: true,
});
