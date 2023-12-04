import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoffeesService } from 'src/coffees/coffees.service';
import * as GraphQLTypes from 'src/graphql-types';
import { TeasService } from 'src/teas/teas.service';

@Resolver('DrinksResult')
export class DrinksResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly teasService: TeasService,
  ) {}

  @Query('drinks')
  async findAll() {
    const teas = await this.teasService.findAll();
    const coffees = await this.coffeesService.findAll();
    return [...teas, ...coffees];
  }

  @ResolveField()
  __resolveType(value: GraphQLTypes.DrinksResult) {
    // if ('brand' in value) {
    //   return 'Coffee';
    // }
    // return 'Tea';
    return Object.getPrototypeOf(value).constructor.name; // Get name of class
  }
}
