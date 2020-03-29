import { configService } from './config.service';

const config = configService.getTypeOrmConfig();

export = config;
