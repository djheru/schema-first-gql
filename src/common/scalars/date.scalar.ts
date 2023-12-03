import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  // parse values in variables from the client in json format
  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  // Before the response is sent to the client
  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  // parse values from the query, in the AST
  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === 'IntValue') {
      return new Date(ast.value);
    }
    return null;
  }
}
