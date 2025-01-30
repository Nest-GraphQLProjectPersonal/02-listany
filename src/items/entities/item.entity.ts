import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'items'})
@ObjectType()
export class Item {

  @Field(() => ID)
  id: 'uuid';
  
  
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  
  @Column()
  name: string;
  
  @Field(() => Float)
  @Column()
  quantity: number;
  
  
  @Column()
  @Field(() => String, { description: 'QuantityUnits' })
  quantityUnits: string;


  //store
  //user


}
