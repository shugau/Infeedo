import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "task")
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn("uuid" )
  readonly id?: string;

  @Column({ type: "varchar", nullable: true })
  task_type?: string;

  @Column({ type: "varchar", nullable: true })
  task_date?: string;;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at?: Date;

  @Column({nullable: true})
  updated_at?: Date;

  @BeforeInsert()
  async updateDateCreation(){
    this.created_at = new Date();
  }

  @BeforeUpdate()
  async updateDateUpdate(){
    this.updated_at = new Date();
  }

}
