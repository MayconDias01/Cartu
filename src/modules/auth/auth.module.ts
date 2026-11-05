import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { CreateUsuarioUseCase } from './application/use-cases/create-usuario.use-case';
import { ListUsuariosUseCase } from './application/use-cases/list-usuarios.use-case';
import { USUARIO_REPOSITORY } from './domain/usuario.repository';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { PrismaUsuarioRepository } from './infrastructure/prisma-usuario.repository';
import { AuthController } from './presentation/auth.controller';
import { UsuariosController } from './presentation/usuarios.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'change-me',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController, UsuariosController],
  providers: [
    LoginUseCase,
    CreateUsuarioUseCase,
    ListUsuariosUseCase,
    JwtStrategy,
    { provide: USUARIO_REPOSITORY, useClass: PrismaUsuarioRepository },
  ],
})
export class AuthModule {}
