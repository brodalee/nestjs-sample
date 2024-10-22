import { IsNotEmpty } from 'class-validator';

export class PostTestInput {
  @IsNotEmpty()
  name: string;
}
