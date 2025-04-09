import { MetadataStorage } from './MetadataStorage';
import { getGlobal } from './utils';

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
