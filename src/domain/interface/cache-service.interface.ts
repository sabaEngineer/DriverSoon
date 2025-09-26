export abstract class ICacheService {
  abstract add<ValueType>(
    key: string,
    value: ValueType,
    expirationSeconds?: number,
  ): Promise<boolean>;
  abstract remove(key: string): Promise<boolean>;
  abstract get<ValueType>(key: string): Promise<ValueType | null>;
}
