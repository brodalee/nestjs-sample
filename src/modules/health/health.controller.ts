import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatusDTO } from './types/types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '../../@types/response';
import { HttpStatusCode } from 'axios';

@ApiTags('Health-Check')
@Controller('/health-check')
export class HealthController {
  @ApiOperation({
    summary: 'Check if everything is OK',
  })
  @ApiResponse({ status: 200, description: 'OK', type: StatusDTO })
  @ApiResponse({ status: 500, description: 'KO', type: ErrorResponse })
  @HttpCode(HttpStatusCode.Ok)
  @Get()
  public healthCheck(): StatusDTO {
    return { status: 'OK' };
  }
}
