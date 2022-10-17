import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthMutationsResolver } from './resolvers/auth.mutations.resolver';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule,ConfigService} from '@nestjs/config'
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[UsersModule,PassportModule,ConfigModule,
    JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(ConfigService)=> ({
        secret:ConfigService.get('JWT_SECRET'),
        signOptions:{expiresIn: '10m'}        
    })
  })],
  providers: [AuthService,AuthMutationsResolver,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
