import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class CreateTeaInput extends GraphQLTypes.CreateTeaInput {
  @MinLength(3)
  name: string;
}
