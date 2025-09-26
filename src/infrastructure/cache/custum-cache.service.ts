import { Injectable } from '@nestjs/common';
import { ICacheService } from 'src/domain/interface';

@Injectable()
export class SimpleInMemoryCacheService implements ICacheService {
  private readonly store = new Map<string, unknown>();

  async add<ValueType>(
    key: string,
    value: ValueType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expirationSeconds?: number,
  ): Promise<boolean> {
    this.store.set(key, value);
    return true;
  }

  async remove(key: string): Promise<boolean> {
    return this.store.delete(key);
  }

  async get<ValueType>(key: string): Promise<ValueType | null> {
    return this.store.get(key) as ValueType | null;
  }
}
