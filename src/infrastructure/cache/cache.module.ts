import { Module } from '@nestjs/common';
import { ICacheService } from 'src/domain/interface';
import { SimpleInMemoryCacheService } from './custum-cache.service';

@Module({
  imports: [],
  providers: [
    {
      provide: ICacheService.name,
      useClass: SimpleInMemoryCacheService,
    },
  ],
  exports: [
    {
      provide: ICacheService.name,
      useClass: SimpleInMemoryCacheService,
    },
  ],
})
export class CacheModule {}
