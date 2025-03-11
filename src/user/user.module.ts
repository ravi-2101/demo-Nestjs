import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppService } from 'src/app.service';
import { AuthenticationMiddleware } from 'src/authentication/authentication.middleware';

@Module({
    controllers: [UserController],
    providers : [UserService,AppService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware)
        .forRoutes('/user/getUsers')
    }
    
}
