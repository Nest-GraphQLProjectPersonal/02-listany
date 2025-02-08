import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';



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

  async findAll(user: User,): Promise<Item[]> {
    // TODO:Pagination
    return await this.itemsRepository.find({
      where: {
        user: {// Es el nombre de la relación entre la entidad Item y la entidad User
          //Es el campo de la entidad User que se utiliza para filtrar. 
          id: user.id //Es el valor del id del usuario que se pasa como parámetro al método. Esto asegura que solo se devuelvan los items que pertenecen a ese usuario específico.
        }
      }
    })
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

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {


    const item = await this.itemsRepository.preload(updateItemInput);
    if (!item) { throw new NotFoundException(`Item with id: ${id} not found`) }

    return await this.itemsRepository.save(item);

  }

  async remove(id: string, user: User): Promise<Item> {

    const item = await this.findOne(id, user);
    await this.itemsRepository.remove(item);

    return { ...item, id };


  }
}
