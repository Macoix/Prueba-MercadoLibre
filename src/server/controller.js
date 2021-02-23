//importación de el http que contiene la direccion de la API ML
import http from './config/http';
//importacion del express-validator, validación de las request
import { validationResult } from 'express-validator';


export default {
    items: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({
                errors: errors.array()
            });
        }

        try {
            const { data } = await http.get('/sites/MCO/search', {
                params: {
                  q: req.query.q,
                  limit: req.query.limit,
                  offset: req.query.offset
                }
            });

            const author = {
                name: 'Giuseppe',
                lastname: 'Micucci'
            };

            let items = [];
            let categories = [];
            let paging = [];

            if(data.results.length !== 0) {
                items = data.results.map((item) => {
                    const split = item.price.toString().split('.');
                    const decimals = split.length > 1 ? split.pop() : '00';
                    const ratingNumber = Math.floor(Math.random() * (6 - 0)) + 0;
                    return{
                        id: item.id,
                        title: item.title,
                        price: {
                            currency: item.currency_id,
                            amount: split[0], decimals
                        },
                        picture: item.thumbnail,
                        condition: item.condition,
                        free_shipping: item.shipping.free_shipping,
                        address: item.address.state_name,
                        ...ratingNumber !== 0 && {rating: ratingNumber}
                    };
                })
            }

            if(data.filters.length !== 0){
                categories = data.filters
                .find((filter) => filter.id === 'category')
                .values[0].path_from_root.map((crumb) => crumb.name);
            }

            if(data.paging.length !== 0){
              paging = data.paging;
            }

            return res.status(200).send({ author, items, categories,paging });
        } catch (error) {
            return res
                .status(error?.response?.data?.status || 500)
                .send({ error: error.message});
        }
    },

    item: async (req, res) =>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(422).send({
              errors: errors.array()
          });
      }

      try {
        const itemResponse = await http.get(`/items/${req.params.id}`);
        const itemDescriptionR = await http.get(`/items/${req.params.id}/description`);

        const {
          id,
          title,
          currency_id,
          pictures,
          condition,
          shipping,
          sold_quantity,
          price
        } = itemResponse.data;

        const split = price.toString().split('.');
        const decimals = split.length > 1 ? price.pop() : '00';

        const item = {
          author: {
            name: 'Giuseppe',
            latname: 'Micucci'
          },
          id,
          title,
          price: {
            currency: currency_id,
            amount: split[0], decimals
          },
          picture: pictures[0],
          condition,
          free_shipping: shipping.free_shipping,
          sold_quantity,
          description: itemDescriptionR.data.plain_text
        };

        return res.status(200).send(item);
      } catch (error) {
        return res
          .status(errors?.response?.data?.status || 500)
          .send({ error: error.message });
      }
    }
};
