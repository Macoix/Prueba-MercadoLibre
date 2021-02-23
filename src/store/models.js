import axios from 'axios';


export const itemsMeli = {
  state: {
    query: '',
    items: [],
    categories: [],
    total: 0,
    page: 0
  },
  reducers: {
    search(state, payload) {
      const { items, categories} = payload;
      const offset = payload.paging.offset;
      const total = payload.paging.total;
      return {...state, items, categories, offset, total};
    },
    setCategories(state, payload) {
      return {...state, categories: payload}
    },
    setQuery(state,payload) {
      return {...state, query: payload};
    },
    setPage(state, payload) {
      return {...state, page: payload};
    }
  },
  effects: (dispath) => ({
    async searchAPI(payload) {
      dispath.Loading.setLoaderStatus(true);
      const { q, offset, page } = payload;

      dispath.itemsMeli.setQuery(q);
      dispath.itemsMeli.setPage(page);
      try {
        const res = await axios.get(`http://127.0.0.1:3333/api/v1/items?q=${q}&limit=20&offset=${offset === 1 ? 0 : offset}`);
        // console.log(res);
        dispath.itemsMeli.search(res.data);
        dispath.Loading.setLoaderStatus(false);
      } catch (error) {}
    }
  })
}


export const itemMeli = {
  state: {
    id:{},
    item:{},
  },
  reducers: {
    searchItem(state, payload) {
      const {id, title, condition, picture, price, free_shipping, sold_quantity, description } = payload;
      return {...state, id: id, item: {title, condition, picture, price, free_shipping, sold_quantity, description} };
    }
  },
  effects: (dispath) => ({
    async searchItemAPI(payload){
      dispath.Loading.setLoaderStatus(true);
      // console.log(payload);
      const id = payload;

      try {
        const res = await axios.get(`http://127.0.0.1:3333/api/v1/item/${id}`);

        dispath.itemMeli.searchItem(res.data);

        dispath.Loading.setLoaderStatus(false);
      } catch (error) {

      }
    }
  })

}

export const Loading = {
  state: {
    loading: false
  },
  reducers: {
    setLoaderStatus(state, payload) {
      return {...state, loading: payload}
    }
  },
}
