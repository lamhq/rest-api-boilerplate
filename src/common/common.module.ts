import { Module, Global } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';

/**
 * Provide common API used by other services
 */
@Global()
@Module({
  providers: [UtilsService],
})
export class CommonModule {}
