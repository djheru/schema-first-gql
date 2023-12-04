<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Notes

# Create the Application

```jsx
// create new application
nest new graphql-coffee

// Install necessary dependencies
// ⚠️ If you want to use the latest version of Apollo (>= v4), install the following packages:
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
// If you want to use an older version of Apollo (v2 or v3 - as shown on the video), install the following packages:
// npm i @nestjs/graphql@10 @nestjs/apollo@10 apollo-server-express graphql

/*
 * Note that if you prefer to use Fastify as your HTTP driver,
 * you'd also have to install the "@as-integrations/fastify" package.
 */

// app.module.ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver, // 👈 Using the ApolloDriver
  typePaths: ['./**/*.graphql'], // 👈 where our (.)graphql files are located
}),

// src / generate-types.ts
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), ‘src/graphql.ts'),
  outputAs: 'class', // Output as class so we can use class-validator
  watch: true,
  skipResolverArgs: true,
});
```

# Introduction to Resolvers and Object Types

```jsx
TYPESCRIPT
// src/coffees/ coffees.graphql
// ❗️ (exclamation point) means non-nullable AKA: REQUIRED
// - Don't worry we'll dive into everything here in more detail - in the next lesson
type Coffee {
  id: ID! // ID (unique identifier) - non-nullable (required)
  name: String! // String - non-nullable (required)
  brand: String! // String - non-nullable (required)
  flavors: [String!]! // non-nullable Array of non-nullable String's
}

type Query {
  coffees: [Coffee!]!
}

// ◾️ Terminal - let's install a dependency
npm i ts-morph
// ◾️ Terminal - let's run our generate-types Script
npx ts-node src/generate-types

// ⚙️ generate-types script
// let's add a new configuration propery
defaultTypeMapping: {
  ID: 'number',
},

// --------
// ◾️ Terminal
nest g module coffees
nest g resolver coffees

// 📝 CoffeesResolver
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }
}

// ◾ ️Termina l- start the app
npm run start

// 🌚 Insomnia - query Demo
{
  coffees {
    id
    name
    brand
    flavors
  }
}

// ------
// 💡 GraphQL Query BREAKDOWN
// If we look at the query we’ve written here:
{ // 👈 we start off with a special “root” object.
  coffees { // 👈 We’re then selecting the “coffees” field on that
    // ☝️ Next, when it comes to the object that gets returned by “coffees”, we’re selecting:
    id // 👈
    name // 👈
    brand // 👈
    flavors // 👈
  }
}
```

# GraphQL Schemas, Types and Scalars

```graphql
type Coffee {
  id: ID! # ID Scalar - non-nullable (required)
  name: String! # String Scalar - non-nullable (required)
  brand: String! # String Scalar - non-nullable (required)
  flavors: [String!]! # non-nullable (required) Array of non-nullable String's (required)
}

type Query {
  # coffees GraphQL Query
  coffees: [Coffee!]! # non-nullable (required) Array of non-nullable Coffee's (required)
}
```

# Passing Arguments: Returning a coffee by id

```graphql
// Using the @Args decorator
@Query(() => Coffee, { name: 'coffee' })
async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
  return null;
}

// Add the new Query
type Query {
  coffees: [Coffee!]!
  coffee(id: ID!): Coffee
}

// Coffee query with ID being passed
{
  coffee(id: 1) {
    id,
    name,
    brand,
    flavors
  }
}
/*
 * Remember we can return as many (or few) fields as we want!
 * Try it out!
 */
```

```graphql
// 📝 coffees.graphql file - let's add a new coffee by ID query
type Query {
  coffees: [Coffee!]!
  // 👇👇 Notice the ID is non-nullable (required) ❗️
  // but the return of "Coffee" is nullable (optional) - *NO Exclamation point*
  coffee(id: ID!): Coffee
}

// 📃 CoffeesResolver
export class CoffeesResolver {
  // ...
  @Query('coffee')
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return null;
  }
}
```

# Manipulating Data with Mutations

```graphql
// 📝 coffees.graphql file - creating our new createCoffee Mutation
type Mutation {
  createCoffee(createCoffeeInput: CreateCoffeeInput!): Coffee!
}

// 📝 create-coffee.input
// - with example Descriptions
"""Create coffee input object type."""
input CreateCoffeeInput {
  """A new coffee name."""
  name: String!
  brand: String!
  flavors: [String!]!
}

// 📝 CoffeesResolver
export class CoffeesResolver {
  // ...

  @Mutation('createCoffee') // notice we're decoupled the name from the actual GQL mutation name 'createCoffee'
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ): Promise<Coffee> {
    return null;
  }
}

// 🌚 Insomnia
// - Let's test our mutation
mutation { // 👈 REMEMBER: Mutation is required, unlike a GraphQL "Query"
  createCoffee(createCoffeeInput: { // 👈 notice our mutation "createCoffee" and "createCoffeeInput"
    name: "Shipwreck Roast",
    brand: "Buddybrew",
    flavors: ["chocolate", "vanilla"]
  }) { // 👈 what we want to return back - in this case, we selected everything
    id,
    name,
    brand,
    flavors
  }
}
```

# Using GraphQL Variables

```graphql
mutation createCoffee($createCoffeeInput: CreateCoffeeInput!) {
  createCoffee(createCoffeeInput: $createCoffeeInput) {
    id
    name
    brand
    flavors
  }
}

{
  "createCoffeeInput": {
      "name": "Coffee 1",
      "brand": "Brand 1",
      "flavors": [
        "flavor 1",
        "flavor 2"
      ]
    }
}
```

# Connecting with TypeORM and PostgreSQL

```graphql
// ⚙️ docker-compose.yml file
version: "3"
services:
  db:
    image:  postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
       POSTGRES_PASSWORD: pass123

// ◾️ Terminal - Bring up our docker container
// **Make sure DOCKER is Running 🔔 https://docs.docker.com/get-docker/
docker-compose up -d

// ◾ ️Terminal - Install typeorm and Postgres
npm install @nestjs/typeorm typeorm pg

// 📝 app.module.ts/
// adding TypeOrm configuration ⚙️
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
}),

// ◾ ️Terminal - Start Nest in DEV mode
npm run start:dev

// ◾ ️Terminal
nest g class coffees/entities/coffee.entity --no-spec

// ------
// ⚙️ eslint.rc - Custom ESLint Rule
rules: {
  // ... leave all the existing rules
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ImportDeclaration[source.value=/graphql-types/] > ImportSpecifier',
      message: 'Named imports are not allowed for "graphql-types" imports. Use "import * as GraphQLTypes [...]" instead.'
    }
  ]
}

// 📝 coffee.entity
import { Entity } from "typeorm";
import * as GraphQLTypes from '../../graphql-types';

@Entity()
export class Coffee implements GraphQLTypes.Coffee {
  @PrimaryGeneratedField()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  flavors: string[];
}

// 📝 CoffeesModule - add imports Array to register this Coffee Entity
imports: [TypeOrmModule.forFeature([Coffee])]
```

# Adding a Coffees Service

```graphql
// 📃 CoffeesService

// 1) utilizing Coffee Repository
// 2) using the Repository within our Methods
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>, // 👈👈
  ) {}

  async findAll() {
    return this.coffeesRepository.find()
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    if (!coffee) {
      // ⚠️ If you use the latest version of Apollo (>= v4), import "UserInputError" from "@nestjs/graphql"
      // Users that still depend on Apollo v3 can import this class from the "apollo-server-express" package
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }
}

// 🔔 coffees.graphql file
// Don't forget to add ! (exclamation to the coffee Query and Mutation
type Query {
  coffees: [Coffee!]!
  coffee(id: ID!): Coffee! // 👈 this last exclamation point (so now it's required)
}

type Mutation {
  createCoffee(createCoffeeInput: CreateCoffeeInput!): Coffee!
  // this last exclamation point (so now it's required)     ☝️
}

// ------
// 🌚 Insomnia
// Make a few Mutation's, and
// 🔔 update some random fields so there are different results in the DB
mutation {
  createCoffee(createCoffeeInput: {
    name: "Shipwreck Roast", // 👈 change this
    brand: "Buddybrew", // 👈 or this
    flavors: ["chocolate", "vanilla"] // 👈 or this
  }) {
    id,
    name,
    brand,
    flavors
  }
}
```

# Adding Mutations for Update and Delete

```graphql
// 📝 coffees.graphql file
// - add new update mutation
type Mutation {
  createCoffee(createCoffeeInput: CreateCoffeeInput!): Coffee!
  updateCoffee(id: ID!, updateCoffeeInput: UpdateCoffeeInput!): Coffee! // 👈
}
// - new UpdateCoffeeInput Input Type
input UpdateCoffeeInput {
  name: String
  brand: String
  flavors: [String!]
}

// 📃 CoffeesResolver - New "updateCoffee" mutation
export class CoffeesResolver {
  // ...
  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: GraphQLTypes.UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }
}

// -----
// 📃 CoffeesService - "preload" replacement code
export class CoffeesService {
  // ...

  async update(
    id: number,
    updateCoffeeInput: GraphQLTypes.UpdateCoffeeInput
  ): Promise<GraphQLTypes.Coffee> {
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }
}

// 📝 coffees.graphql file
// - let's add our "remove" mutation
type Mutation {
  // ...
  removeCoffee(id: ID!): Coffee! // 👈
}

// 📃 CoffeesResolver
// - let's add the Delete or removeCoffee Mutation
export class CoffeesResolver {
  // ...

  @Mutation('removeCoffee')
  async remove(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.remove(id);
  }
}

// 📃 CoffeesService - remove method updates
export class CoffeesService {
  // ...
  async remove(id: number): Promise<GraphQLTypes.Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}

// Insomnia 🌚 -
// (Example) Update mutation - make sure it's an ID you have in your DB
mutation {
  updateCoffee(id: 3, updateCoffeeInput: {
    name: "Updated"
  }) {
    name
  }
}

// Insomnia 🌚
// (Example) Delete mutation - make sure it's an ID you still have in your DB
mutation {
  removeCoffee(id: 2) {
    name
  }
}
```

# Auto-Validate Input Data

```graphql
// 📝 app.module.ts - Add the ValidationPipe (from @nestjs/common)
app.useGlobalPipes(new ValidationPipe());

// ◾ ️Terminal - Install dependencies
npm i class-validator class-transformer

// ◾️ Terminal - generate inputs
nest g class coffees/dto/create-coffee.input --no-spec
nest g class coffees/dto/update-coffee.input --no-spec

// -----
// 📝 create-coffee.input
import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class CreateCoffeeInput extends GraphQLTypes.CreateCoffeeInput {
  @MinLength(3)
  name: string;
}

// 📝 update-coffee.input
import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class UpdateCoffeeInput extends GraphQLTypes.UpdateCoffeeInput {
  @IsOptional()
  @MinLength(3)
  name: string;
}

// 🔔🔔 Make sure to update references of GraphQLTypes.CreateCoffeeInput (and Update) to
// CreateCoffeeInput & UpdateCoffeeInput respectively

// Demo mutation - to test validation
/* 🚨 SHOULD fail since "UP" is just TWO characters long */
mutation {
  createCoffee(createCoffeeInput: {
    name: "Up", // 👈 notice less than 3 characters long - should trigger validation
    brand: "Buddybrew",
    flavors: [
      "chocolate",
      "vanilla"
    ]
  }) {
    name
  }
}
```

# Adding Relations to the Entities

```graphql
// 📝 coffees.graphl
// - add the new Flavor "type"
type Flavor {
  id: ID!
  name: String!
}

// - update flavors property within Coffee
type Coffee {
  // ...
  flavors: [Flavor!]
  // 🔔 notice there is no️ ! (exclamation) at the end, since some of our Coffees
  // don't have flavors
  // ❗️ If we forgot this, we'd get an error when trying to run the app
}

// ◾️ Terminal
nest g class coffees/entities/flavor.entity --no-spec

// flavor.entity.ts
@Entity()
export class Flavor implements GraphQLTypes.Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// Coffee entity "owner" side
@Entity()
export class Coffee {
  // ...
  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees /* inverse side */,
    {
      cascade: true, // 👈
    },
  )
  flavors?: Flavor[];
}

// Flavor entity "inverse" side of the relation
@Entity()
export class Flavor {
  // ...
  @ManyToMany(type => Coffee, coffee => coffee.flavors /* inverse side */)
  coffees: Coffee[];
}

// CoffeesService - let's inject the Flavor Repository
export class CoffeesService {
  constructor(
    // ...
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>, // 👈
  ) {}

  // preloadFlavorByName method - for CoffeesService
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({ where: { name } });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}

// -----
// 📃 CoffeesService ADDITIONS

// ++ create method additions
async create(createCoffeeInput: CreateCoffeeInput) {
  const flavors = await Promise.all(
    createCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
  );
  const coffee = this.coffeesRepository.create({
    ...createCoffeeInput,
    flavors,
  });
  return this.coffeesRepository.save(coffee);
}

// ++ update method additions - CoffeesService
async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
  const flavors =
        updateCoffeeInput.flavors && // 👈 new
        (await Promise.all(
          updateCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
        ));
  const coffee = await this.coffeesRepository.preload({
    id,
    ...updateCoffeeDto,
    flavors,
  });
}

// -----

// Insomnia 🌚 - DEMO time
// - Mutation create a new Coffee
mutation {
  createCoffee(createCoffeeInput: {
    name: "Shipwreck Roast - 2022",
    brand: "Buddybrew",
    flavors: [
      "chocolate",
      "vanilla"
    ]
  }) {
    name
    brand
    flavors {
      id
      name
    }
  }
}

// Let's grab all Coffees to see if the new coffee is there!
{
  coffees {
    id
    brand
    name
    flavors {
      id
      name
    }
  }
}
```

# Using Field Resolvers

```graphql
// ◾️ Terminal -
// Let’s create a new CoffeeFlavorsResolver class using the Nest CLI:
nest g resolver coffees/coffee-flavors --flat

// 📝 coffee-flavors.resolver
@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
    // ⚙️ Inject the Flavor Repository
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    // Using the injected repository,
    // let’s retrieve ALL flavors that belong to a “parent coffee”.
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
```

# Using Custom Scalar Types

```graphql
// 📝 coffees.graphql
scalar Date

// add createdAt prop to Coffee type
type Coffee {
  id: ID!
  name: String!
  brand: String!
  flavors: [Flavor!]
  createdAt: Date // 👈 no ! (exclamation) since some Coffee's don't have createdAt
}

// 📝 coffee.entity
// - add createdAt prop
export class Coffee {
  // ...
  @CreateDateColumn()
  createdAt?: Date | null;
}

// ◾️ Terminal - Generating our first custom Scalar
nest g class common/scalars/date.scalar

// 📝 date.scalar
// - Our custom Date Scalar
@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    console.log(`Serialising: ${value}`);
    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
```

# Implementing GraphQL Interfaces

```graphql
// 📝 coffees.graphql
// - creating our Drink interface
interface Drink {
  name: String!
}

// - let's create a Tea type, and implement Drink
type Tea implements Drink { // 👈
  name: String!
}

type Coffee implements Drink { // 👈 implement Drink
  // ...
}

// implementing our Drink interface
@ObjectType({
  implements: () => Drink, // ( or an array of interface such as: [Drink] )
})
export class Tea implements Drink {
  name: string;
}

// AppModule - Setting up Orphaned types within GraphQLModule options
GraphQLModule.forRoot({
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  buildSchemaOptions: {
    orphanedTypes: [Tea], // 👈
  },
}),

// ◾️ Terminal - generate DrinksResolver
nest g resolver drinks

// 📝 drinks.resolver
@Resolver('Drink') // 👈 represents that every FieldResolver represents the Drink type
export class DrinksResolver {
  @Query('drinks')
  async findAll(): Promise<GraphQLTypes.Drink[]> {
    // we're mocking everything just for demonstration purposes
    const coffee = new GraphQLTypes.Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    // we're mocking everything - we also don't have a Tea table
    // [if you'd like!] as a fun exercise follow steps similar to how we did everything for Coffee
    // to create a Tea table/etc
    const tea = new GraphQLTypes.Tea();
    tea.name = 'Lipton';
    return [tea, coffee];
  }

  // 💡 ResolveField code
  __resolveType(value: GraphQLTypes.Drink) {
    // 🔔 One option
    /*
    if ('brand' in value) {
      return 'Coffee';
    }
    return 'Tea';
    */

    // 🔔 Another option
    /*
    return Object.getPrototypeOf(value).constructor.name; // "Tea" or "Coffee"
    */

    // 🔔 Another option
    if (value instanceof GraphQLTypes.Coffee) {
      return 'Coffee';
    } else if (value instanceof GraphQLTypes.Tea) {
      return 'Tea';
    }
    return null;
  }

}

// 🌚 Insomnia - using "inline fragments" ( ... on )
{
  drinks {
    name
    ... on Coffee {
      brand
    }
  }
}
```

# Unions and Enums

```graphql
// 📝 coffees.graphql
// - let's create a DrinksResult union
union DrinksResult = Coffee | Tea

// 📝 drinks.resolver
// - update to use DrinksResult (instead of Drinks)
@Resolver('DrinksResult') // 👈
export class DrinksResolver {
  @Query('drinks')
  async findAll(): Promise<GraphQLTypes.DrinksResult[]> { // 👈
    // ...
  }
  // ...
}

// Insomnia - Query with inline fragments for both Tea & Coffee
{
  drinks {
    ... on Tea {
      name
    }
    ... on Coffee {
      name
      brand
    }
  }
}

// 📝 coffees.graphql
// - let's create a CoffeeType Enum
enum CoffeeType {
  ARABICA
  ROBUSTA
}

// - let's use it within our Coffee
type Coffee implements Drink {
  // ...
  type: CoffeeType // 👈 add type CoffeeType (no exclamation) since some Coffee's don't have type
}

// - let's update both Create & Update inputs to use it as well
input CreateCoffeeInput {
  // ...
  type: CoffeeType // 👈
}
input UpdateCoffeeInput {
  // ...
  type: CoffeeType // 👈
}

// 📝 coffee.entity
// - let's add the CoffeeType to our Coffee Entity
export class Coffee {
  // ...
  @Column({ nullable: true })
  type: GraphQLTypes.CoffeeType;
}

// 🌚 Insomnia
// - using __ to retrieve enumValues back for something ("CoffeeType" in our case)
{
  __type(name: "CoffeeType") {
    enumValues {
      name
    }
  }
}
```

# Real-Time Updates with Subscriptions

```graphql
// ◾️ Terminal - Installing dependencies
npm i graphql-subscriptions

// ◾️ Terminal - Generate the PubSub module
nest g module pub-sub

// 📝 pub-sub.module
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [PubSub],
  exports: [PubSub],
})
export class PubSubModule {}

// 📝 coffees.service
// - Using DI to include the PubSub suervice
export class CoffeesService {
  constructor(
    // ...
    private readonly pubSub: PubSub,
  ) {}
  // ...
}

// 📝 coffees.service
// - utilizing the PubSub Service
// inside our "create" method()
async create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
  // ...
  // 👇 turn the return statement into a variable
  const newCoffeeEntity = await this.coffeesRepository.save(coffee);
  this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity}); // 👈 PubSub
  return newCoffeeEntity;
}

// 📝 coffees.graphql
// - create a new Subscription "type" with coffeeAdded inside
type Subscription {
  coffeeAdded: Coffee!
}

// 📝 coffees-resolver
// - create our new Subscription
export class CoffeesResolver {
  constructor(
    // ...
    private readonly pubSub: PubSub, // 👈 add PubSub provider
  ) {}
  // ...

  // add our new Subscription "coffeeAdded"
  @Subscription(() => Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}

// 📝 app.module
// - add installSubscriptionHandlers to our GraphQLModule.forRoot configuration object
GraphQLModule.forRoot({
  // ...
  installSubscriptionHandlers: true, // 👈
})

// 🏀 GraphQL playground - making our Subscription request
subscription {
  coffeeAdded {
    id
    name
    brand
  }
}

// 🏀 GraphQL playground - making a mutation (different tab)
mutation {
  createCoffee(createCoffeeInput: {
    name: "Shipwreck Roast - 2020",
    brand: "Buddybrew",
    type: Arabica,
    flavors: [
      "chocolate",
      "vanilla"
    ]
  }) {
    name
    brand
    type
    flavors {
      id
      name
    }
  }
}
```

# Batching and Caching with Data Loader

```graphql
// 📝 app.module
// - addition to the TypeOrm configuration object
logging: ['query'],

// 🌚 Insomnia - demonstration query to show N+1 problem
{
  coffees {
    id
    brand
    name
    flavors {
      id
      name
    }
    createdAt
  }
}

// ----
// ◾️ Terminal - Installing the dependency
npm install --save dataloader

// 📝 flavors-by-coffee.loader
// - Request Scoped FlavorsByCoffeeLoader - utilizing the DataLoadaer
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader'; // Add esmoduleinterop if needed
import { Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST }) // 👈 Request scoped
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    super(keys => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'], // since we don't really need a coffee object here
      relations: ['flavors'], // to fetch related flavors
      where: {
        id: In(coffeeIds as number[]), // to make sure we only query requested coffees
      },
    });

    // to map an array of coffees two a 2-dimensional array of flavors where position in the array indicates to which coffee flavors belong
    return coffeesWithFlavors.map(coffee => coffee.flavors);
  }
}

// 📝 coffee-flavors.resolver
@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
   private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader, // 👈 utilize our new loader
  ) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsByCoffeeLoader.load(coffee.id); // 👈
  }
}
```
