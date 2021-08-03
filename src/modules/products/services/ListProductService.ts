import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST',
        ); // busca o cache

        if (!products) {
            products = await productsRepository.find(); // caso nao tenha cache busca no db

            await redisCache.save('api-vendas-PRODUCT_LIST', products); // e salva em cache
        }

        return products;
    }
}

export default ListProductService;
