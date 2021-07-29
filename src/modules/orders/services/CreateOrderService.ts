import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customerExists = await customersRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError(
                'Could not find any customer with the given id.',
            );
        }

        const existsProducts = await productsRepository.findAllByIds(products);
        // busca todos os produtos(em produtos) através do ids dos produtos(pedido) do body
        // só encontra produtos que estão na tabela produtos

        if (!existsProducts.length) {
            throw new AppError(
                'Could not find any products with the given ids.',
            );
        }

        const existsProductsIds = existsProducts.map(product => product.id);
        // filtrar somente os ids dos produtos encontrados

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );
        // filtrar os produtos passados pelo body(product) que não existem em produtos

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product ${checkInexistentProducts[0].id}.`,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );
        //filtra os produtos passados(body) os quais a quantidade seja maior do que a disponivel

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));
        // monta o [] de obj produtos. Busca os preco do produto filtrando o do body com o do db

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });
        // Obj do cliente com o [ ] de produtos
        const { order_products } = order; // [] produtos do pedido

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0]
                    .quantity - product.quantity,
        }));
        //monta o obj produto para atualizar a quantidade. Filtra Produto body com db ids pegando  quantidade e sub

        await productsRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
