import { MetadataStorage } from './MetadataStorage.js';
import { getGlobal } from './utils/index.js';

/**
 * Gets metadata storage.
 * Metadata storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataStorage(): MetadataStorage {
  const global = getGlobal();

  if (!global.classTransformerMetadataStorage) {
    global.classTransformerMetadataStorage = new MetadataStorage();
  }

  return global.classTransformerMetadataStorage;
}

export const defaultMetadataStorage = getMetadataStorage();
