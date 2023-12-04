import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeaInput } from './dto/create-tea.input';
import { UpdateTeaInput } from './dto/update-tea.input';
import { TeasService } from './teas.service';

@Resolver('Tea')
export class TeasResolver {
  constructor(private readonly teasService: TeasService) {}

  @Mutation('createTea')
  create(@Args('createTeaInput') createTeaInput: CreateTeaInput) {
    return this.teasService.create(createTeaInput);
  }

  @Query('teas')
  findAll() {
    return this.teasService.findAll();
  }

  @Query('tea')
  findOne(@Args('id') id: number) {
    return this.teasService.findOne(id);
  }

  @Mutation('updateTea')
  update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateTeaInput') updateTeaInput: UpdateTeaInput,
  ) {
    return this.teasService.update(id, updateTeaInput);
  }

  @Mutation('removeTea')
  remove(@Args('id') id: number) {
    return this.teasService.remove(id);
  }
}
