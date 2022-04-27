import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConnection: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'task-management',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(databaseConnection)],
  controllers: [],
  providers: [],
})
export class AppModule {}
