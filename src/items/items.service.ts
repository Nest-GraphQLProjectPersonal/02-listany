import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Item } from './entities/item.entity';
import { User } from 'src/users/entities/user.entity';

import { PaginationArgs, SearchArgs } from 'src/common/dto/args';


@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) { }


  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {

    const newItem = this.itemsRepository.create({ ...createItemInput, user });
    return await this.itemsRepository.save(newItem);

  }

  async findAll(user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Item[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs

    const queryBuilder = this.itemsRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId"  = :userId`, { userId: user.id })

    if( search ){
      queryBuilder.andWhere('Lower(name) like :name', { name: `%${ search.toLowerCase()}%` })
    }

    return queryBuilder.getMany()
    
    // return await this.itemsRepository.find({
    //   take: limit, //toma x cantidad de registro
    //   skip: offset, //inicia desde x valor (definido en paginationArgs)
    //   where: {
    //     user: {// Es el nombre de la relación entre la entidad Item y la entidad User
    //       //Es el campo de la entidad User que se utiliza para filtrar. 
    //       id: user.id //Es el valor del id del usuario que se pasa como parámetro al método. Esto asegura que solo se devuelvan los items que pertenecen a ese usuario específico.
    //     },
    //     name: Like(`%${search}%`)
    //   }
    // })
  }

  findOne(id: string, user: User): Promise<Item> {

    const item = this.itemsRepository.findOneBy({
      id,
      user: {
        id: user.id
      }
    });
    if (!item) { throw new NotFoundException(`Item with id: ${id} not found`) }

    return item;

  }

  async update(id: string, updateItemInput: UpdateItemInput, user: User): Promise<Item> {

    await this.findOne(id, user)

    const item = await this.itemsRepository.preload(updateItemInput);
    if (!item) { throw new NotFoundException(`Item with id: ${id} not found`) }

    return await this.itemsRepository.save(item);

  }

  async remove(id: string, user: User): Promise<Item> {

    const item = await this.findOne(id, user);
    await this.itemsRepository.remove(item);

    return { ...item, id };
  }

  async itemCountByUser(user: User): Promise<number> {
    return this.itemsRepository.count({
      where: {
        user: {
          id: user.id
        }
      }
    })
  }
}
