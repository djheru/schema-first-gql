import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    // Give it an array of coffeeIds, and it will return an array of flavor collections
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'],
      relations: { flavors: true },
      where: {
        id: In([...coffeeIds]),
      },
    });

    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}
