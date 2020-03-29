import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value ?? '';
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host:
        process.env.NODE_ENV === 'test'
          ? 'postgres-tests'
          : this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT') ?? ''),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      dropSchema: process.env.NODE_ENV === 'test' ? true : false,
      ssl: false,
      entities: ['dist/**/*.entity{.ts,.js}'],

      // We are using migrations, synchronize should be set to false.
      synchronize: true,
      autoLoadEntities: true,

      // Run migrations automatically,
      // you can disable this if you prefer running migration manually.
      migrationsRun: true,
      logging: false,
      logger: 'file',

      // allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev
      migrations: ['../migrations/**/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
]);

export { configService };
