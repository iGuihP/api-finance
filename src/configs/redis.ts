import { createClient, RedisClientType } from 'redis';
import logger from '../utils/logger';

const redis: RedisClientType = createClient({
    url: `redis://${process.env.REDIS_USER ? `${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})

redis.connect();

redis.on('error', (err) => {
    logger.error('Houve um erro de conexão com o Servidor do Redis', err);
})
.on('connect', () => {
    logger.info('Conectado ao Redis');
})
.on('reconnecting', (info) => logger.info('Tentando se reconectar ao Redis', info))
.on('end', () => logger.warn('A Conexão com o Redis foi fechada'));

export default redis;
