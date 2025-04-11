import { TransformationType } from '../../enums/index.js';
import { ClassTransformOptions } from '../class-transformer-options.interface.js';

export interface TransformFnParams {
  value: any;
  key: string;
  obj: any;
  type: TransformationType;
  options: ClassTransformOptions;
}
