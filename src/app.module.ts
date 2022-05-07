import { Module } from '@nestjs/common';
import { AuthModule, TasksModule } from './modules';
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
  imports: [TasksModule, TypeOrmModule.forRoot(databaseConnection), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
