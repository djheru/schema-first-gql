import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeesService {
  findAll() {
    return [
      {
        id: 1,
        name: 'Coffee 1',
        brand: 'Brand 1',
        flavors: ['flavor 1', 'flavor 2'],
      },
    ];
  }

  findOne(id: number) {
    return {
      id,
      name: 'Coffee 1',
      brand: 'Brand 1',
      flavors: ['flavor 1', 'flavor 2'],
    };
  }

  create(createCoffeeDto: any) {
    return {
      id: 1,
      ...createCoffeeDto,
    };
  }
}
