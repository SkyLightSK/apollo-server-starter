import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Todo} from './todo.entity';

@Resolver('Todo')
export class TodoResolvers {

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    @Query()
    async todos() {
        return await this.todoRepository.find();
    }

    // @Mutation('addTodo')
    // async add(@Args('createTodoText') args: string): Promise<any> {
    //     // const createdTodo = await this.todoRepository.create(args);
    //     // return createdTodo;
    // }
}
