import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL ?? ''),
    UserModule,
    PostsModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
