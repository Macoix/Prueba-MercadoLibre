import React from 'react';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';

import Categories from './components/Categories';
import Navbar from './components/Navbar';
import Loader from './components/Loader';


import List from './views/List';
import Details from './views/Details';



const App = (props) => {
  const { Loading, items, categories } = props;
  return(
    <>
        <Navbar />
        {categories && <Categories />}

        {Loading && <Loader />}

        <Switch>
          <Route exact path="/items">
          {items.length ? (
                !Loading && <List />
            ) : (
                !Loading && (
                  <div className="noResultsList">
                    <h3>No hay publicaciones que coincidan con tu búsqueda</h3>
                    <ul>
                      <li><b>Revisa la ortografía</b> de la palabra</li>
                      <li>Utiliza <b>Palabras más genericas</b> o menos palabras</li>
                    </ul>
                  </div>

                )
            )}
          </Route>

          <Route path="/item/:id">
            {!Loading && <Details />}
          </Route>

          <Route path="*">
            <div className="noResults">
              <h3>¡Bienvenido!</h3>
              <h4>Realiza una busqueda</h4>
            </div>
          </Route>

        </Switch>
    </>
  )
}

const mapState = (status) => ({
  Loading: status.Loading.loading,
  items: status.itemsMeli.items,
  categories: status.itemsMeli.categories
})

export default withRouter(connect(mapState, {})(App));
