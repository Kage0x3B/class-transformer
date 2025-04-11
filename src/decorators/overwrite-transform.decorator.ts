import { getMetadataStorage } from '../storage.js';
import { OverwriteTransformOptions, TransformFnParams } from '../interfaces/index.js';

/**
 * Takes over value transformation, skips all other transformation for this value.
 *
 * Can be applied to properties only.
 */
export function OverwriteTransform(
  transformFn: (params: TransformFnParams) => any,
  options: OverwriteTransformOptions = {}
): PropertyDecorator {
  return function (target: any, propertyName: string | Symbol): void {
    getMetadataStorage().addOverwriteTransformMetadata({
      target: target.constructor,
      propertyName: propertyName as string,
      transformFn,
      options,
    });
  };
}
