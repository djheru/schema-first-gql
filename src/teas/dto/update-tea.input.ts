import { IsOptional, MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class UpdateTeaInput extends GraphQLTypes.UpdateTeaInput {
  @IsOptional()
  @MinLength(3)
  name?: string;
}
