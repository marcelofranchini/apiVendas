import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

class RedisCache {
    private client: RedisClient;
    private connected = false;

    constructor() {
        if (!this.connected) {
            this.client = new Redis(cacheConfig.config.redis);
            this.connected = true;
        } // para não criar uma nova instancia do banco a cada requisicao, só na 1
    }

    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    } // busca o cache

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}

export default new RedisCache();
