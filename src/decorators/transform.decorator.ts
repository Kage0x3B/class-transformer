import { getMetadataStorage } from '../storage.js';
import { TransformFnParams, TransformOptions } from '../interfaces/index.js';

/**
 * Defines a custom logic for value transformation.
 *
 * Can be applied to properties only.
 */
export function Transform(
  transformFn: (params: TransformFnParams) => any,
  options: TransformOptions = {}
): PropertyDecorator {
  return function (target: any, propertyName: string | Symbol): void {
    getMetadataStorage().addTransformMetadata({
      target: target.constructor,
      propertyName: propertyName as string,
      transformFn,
      options,
    });
  };
}
