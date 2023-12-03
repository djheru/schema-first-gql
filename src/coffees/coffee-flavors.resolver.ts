import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Resolver('Coffee') // Supplies a parent object to the resolver methods
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor) private flavorRepository: Repository<Flavor>,
  ) {}

  @ResolveField('flavors')
  async flavors(@Parent() coffee: Coffee) {
    return this.flavorRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
