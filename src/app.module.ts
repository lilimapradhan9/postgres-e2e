import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Drama} from "./db/entities/drama.entity";
import test from "./config/test";
import development from "./config/development";
import {DramasModule} from "./dramas/dramas.module";
import {HealthController} from './health/health.controller';
import {TerminusModule} from "@nestjs/terminus";

const _configs = {'development': development, 'default': test};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [_configs[process.env.NODE_ENV] || _configs['default']],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          synchronize: config.get('database.synchronize'),
          entities: [Drama],
          keepConnectionAlive: true
        };
      },
    }),
    DramasModule,
    TerminusModule
  ],
  controllers: [HealthController],
  providers: [ConfigService],
})
export class AppModule {
}
