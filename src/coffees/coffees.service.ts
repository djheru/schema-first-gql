import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(createCoffeeInput);
    return this.coffeeRepository.save(coffee);
  }

  async update(
    id: number,
    updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
