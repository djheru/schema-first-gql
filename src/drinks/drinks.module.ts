import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { Tea } from 'src/teas/entities/tea.entity';
import { TeasModule } from 'src/teas/teas.module';
import { DrinksResolver } from './drinks.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Tea, Flavor]),
    TeasModule,
    CoffeesModule,
  ],
  providers: [DrinksResolver],
})
export class DrinksModule {}
