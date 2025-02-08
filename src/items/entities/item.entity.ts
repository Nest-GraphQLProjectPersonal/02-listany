import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {

  @Field(() => ID)
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Field(() => String)
  @Column()
  name: string;

  // @Field(() => Float)
  // @Column()
  // quantity: number;


  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  quantityUnits: string;


  //store
  //user

  @ManyToOne(() => User, user => user.items, { nullable: false, lazy: true }) //el nullable añade que el campo no sea nulo
  @Index('userId-index')// este index me ayuda para hacer consultas mas eficientes 
  @Field(() => User)
  user: User

}
