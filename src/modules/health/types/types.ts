import { ApiProperty } from '@nestjs/swagger';

export type StatusValue = 'OK' | 'KO';

export class StatusDTO {
  @ApiProperty()
  status: StatusValue;
}
