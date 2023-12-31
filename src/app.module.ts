import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { createClient } from 'redis';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './user/entities/permission.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'demo666',
      database: 'acl_test',
      entities: [User, Permission],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'south',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
