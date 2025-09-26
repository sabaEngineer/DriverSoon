import { Module } from '@nestjs/common';
import { GovRepository } from './gov.repository';
import { IGetExamDatesService } from 'src/domain/interface';
import { getExamDatesService } from './gov.service';
import { HttpModule } from '@nestjs/axios';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [HttpModule, TelegramModule],
  providers: [
    GovRepository,
    { provide: IGetExamDatesService.name, useClass: getExamDatesService },
  ],
  exports: [
    { provide: IGetExamDatesService.name, useClass: getExamDatesService },
  ],
})
export class GovModule {}
