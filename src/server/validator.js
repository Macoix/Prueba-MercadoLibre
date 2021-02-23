import { param, query } from 'express-validator';

export default {
  items: [query('q').not().isEmpty().withMessage('Query must be defined.')],
  item: [param('id').not().isEmpty().withMessage('ID must be defined.')]
};