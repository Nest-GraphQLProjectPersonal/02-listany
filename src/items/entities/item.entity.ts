import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'items'})
@ObjectType()
export class Item {

  @Field(() => ID)
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  
  @Field(() => String)
  @Column()
  name: string;
  
  @Field(() => Float)
  @Column()
  quantity: number;
  
  
  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  quantityUnits: string;


  //store
  //user


}
