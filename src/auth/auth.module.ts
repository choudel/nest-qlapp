import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthMutationsResolver } from './resolvers/auth.mutations.resolver';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule,ConfigService} from '@nestjs/config'

@Module({
  imports:[UsersModule,PassportModule,
    JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(ConfigService)=> ({
        secret:ConfigService.get('JWT_SECRET'),
        signOptions:{expiresIn: '10m'}        
    })
  })],
  providers: [AuthService,AuthMutationsResolver,LocalStrategy]
})
export class AuthModule {}
