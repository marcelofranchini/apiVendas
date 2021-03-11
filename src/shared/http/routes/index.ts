import Router from 'express';
import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.get('/', (req, res) => {
    res.send('Foi');

    //res.json({ msg: 'abc' });
});

export default routes;
