import 'reflect-metadata';
import { plainToInstance } from '../../src/index';
import { Expose, Type } from '../../src/decorators';
import { getMetadataStorage } from '../../src/storage';

describe('implicit type conversion', () => {
  it('should run only when enabled', () => {
    getMetadataStorage().clear();

    class SimpleExample {
      @Expose()
      readonly implicitTypeNumber: number;

      @Expose()
      readonly implicitTypeString: string;
    }

    const result1: SimpleExample = plainToInstance(
      SimpleExample,
      {
        implicitTypeNumber: '100',
        implicitTypeString: 133123,
      },
      { enableImplicitConversion: true }
    );

    const result2: SimpleExample = plainToInstance(
      SimpleExample,
      {
        implicitTypeNumber: '100',
        implicitTypeString: 133123,
      },
      { enableImplicitConversion: false }
    );

    expect(result1).toEqual({ implicitTypeNumber: 100, implicitTypeString: '133123' });
    expect(result2).toEqual({ implicitTypeNumber: '100', implicitTypeString: 133123 });
  });
});

describe('implicit and explicity type declarations', () => {
  getMetadataStorage().clear();

  class Example {
    @Expose()
    readonly implicitTypeViaOtherDecorator: Date;

    @Type()
    readonly implicitTypeViaEmptyTypeDecorator: number;

    @Type(() => String)
    readonly explicitType: string;
  }

  const result: Example = plainToInstance(
    Example,
    {
      implicitTypeViaOtherDecorator: '2018-12-24T12:00:00Z',
      implicitTypeViaEmptyTypeDecorator: '100',
      explicitType: 100,
    },
    { enableImplicitConversion: true }
  );

  it('should use implicitly defined design:type to convert value when no @Type decorator is used', () => {
    expect(result.implicitTypeViaOtherDecorator).toBeInstanceOf(Date);
    expect(result.implicitTypeViaOtherDecorator.getTime()).toEqual(new Date('2018-12-24T12:00:00Z').getTime());
  });

  it('should use implicitly defined design:type to convert value when empty @Type() decorator is used', () => {
    expect(typeof result.implicitTypeViaEmptyTypeDecorator).toBe('number');
    expect(result.implicitTypeViaEmptyTypeDecorator).toEqual(100);
  });

  it('should use explicitly defined type when @Type(() => Construtable) decorator is used', () => {
    expect(typeof result.explicitType).toBe('string');
    expect(result.explicitType).toEqual('100');
  });
});

describe('plainToInstance transforms built-in primitive types properly', () => {
  getMetadataStorage().clear();

  class Example {
    @Type()
    date: Date;

    @Type()
    string: string;

    @Type()
    string2: string;

    @Type()
    number: number;

    @Type()
    number2: number;

    @Type()
    boolean: boolean;

    @Type()
    boolean2: boolean;
  }

  const result: Example = plainToInstance(
    Example,
    {
      date: '2018-12-24T12:00:00Z',
      string: '100',
      string2: 100,
      number: '100',
      number2: 100,
      boolean: 1,
      boolean2: 0,
    },
    { enableImplicitConversion: true }
  );

  it('should recognize and convert to Date', () => {
    expect(result.date).toBeInstanceOf(Date);
    expect(result.date.getTime()).toEqual(new Date('2018-12-24T12:00:00Z').getTime());
  });

  it('should recognize and convert to string', () => {
    expect(typeof result.string).toBe('string');
    expect(typeof result.string2).toBe('string');
    expect(result.string).toEqual('100');
    expect(result.string2).toEqual('100');
  });

  it('should recognize and convert to number', () => {
    expect(typeof result.number).toBe('number');
    expect(typeof result.number2).toBe('number');
    expect(result.number).toEqual(100);
    expect(result.number2).toEqual(100);
  });

  it('should recognize and convert to boolean', () => {
    expect(result.boolean).toBeTruthy();
    expect(result.boolean2).toBeFalsy();
  });
});
