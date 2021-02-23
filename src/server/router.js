import express from 'express';
import controller from './controller';
import validator from './validator';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ status: 'online' });
});

router.get('/items', validator.items, controller.items);
router.get('/item/:id', validator.item, controller.item);

export default router;
