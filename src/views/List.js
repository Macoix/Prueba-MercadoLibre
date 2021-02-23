import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from 'react-paginate';

import LogoShipping from '../assets/ic_shipping.png'

import Starts from '../components/stars';

const List = (props) => {

  const { items, history, itemSearch, total, search, query, page} = props;
  const pageCount = Math.ceil(total / 20);
  const searchItem = (id) => {
    itemSearch(id)
    history.push(`/item/${id}`);
  }

  const handlePageClick = (data) => {
    const selected = data.selected;
    const offsetCal = Math.ceil(selected * 20 + 1);

    search({q: query, offset: offsetCal, page: selected});

  }
  return (
    <section className="listContainer">
      <ol className="list">
        {
          items.map((item) => (
            <li className="listItem" key={item.id}>
              <div className="wrapper">
                <div className="listCard">
                  <div className="imgContainer">
                    <img src={item.picture} srcSet={item.picture} onClick={() => searchItem(item.id)} alt={item.title}/>
                  </div>
                  <div className="content-wrapper">
                    <div className="itemTitle" onClick={() => searchItem(item.id)}>
                      <h2>{item.title}</h2>
                    </div>
                    <div className="content-columns">
                        <div className="leftColumn">
                          <div className="itemPrice">
                            <span>
                              $
                            </span>
                            <span>
                              {new Intl.NumberFormat("de-DE").format(item.price.amount)}
                            </span>
                          </div>
                          <div>
                            {
                              item.free_shipping &&
                              (
                                <>
                                  <img src={LogoShipping} alt="Shipping Icon"></img> <span>Envío Gratis</span>
                                </>
                              )
                            }
                          </div>
                        </div>
                        <div className="rightColumn">

                          {item.rating && <Starts  numberStarts={item.rating}/> }

                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ol>
      <Pagination
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'currentItem'}
        forcePage={page}
      />
    </section>
  )
}

const mapState = (state) =>({
  items: state.itemsMeli.items,
  total: state.itemsMeli.total,
  query: state.itemsMeli.query,
  page: state.itemsMeli.page
})
const mapDispatch = (dispath) => ({
  itemSearch: (payload) => dispath.itemMeli.searchItemAPI(payload),
  search: (payload) => dispath.itemsMeli.searchAPI(payload)
})

export default withRouter(connect(mapState, mapDispatch)(List));
