import React from 'react';
import { connect } from 'react-redux';

const Categories = (props) => {

  const { categories } = props;
  const lIndenx = categories.length - 1;
  return (
    <ol className="categoriesList">
      {categories.map((categ, index) => (
        <React.Fragment key={index}>
          <li>
            {categ}
          </li>
          {lIndenx !== index && <span className="categoriesListChevron"> {'>'} </span>}
        </React.Fragment>
      ))}
    </ol>
  )

}
const mapState = (state) => ({
  categories: state.itemsMeli.categories
})
export default connect(mapState, {})(Categories);
