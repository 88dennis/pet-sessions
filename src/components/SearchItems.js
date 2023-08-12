
import React from 'react'

const SearchItems = (props) => {
  return (
    <div className="search-appointments row justify-content-center my-4">
      <div className="col-md-6">
        <div className="input-group">
          <input
            id="SearchApts"
            type="text"
            className="form-control"
            aria-label="Search Appointments"
            onChange={e => props.searchItems(e.target.value)}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort by: <span className="caret" />
            </button>

            <div className="sort-menu dropdown-menu dropdown-menu-right">
              <button

                className={
                  'sort-by dropdown-item ' +
                  (props.orderBy === 'petName' ? 'active' : '')
                }
                onClick={e =>
                  props.changeOrder('petName', props.orderDir)
                }
                href="#"
              >
                Pet Name
              </button>
              <button
                className={
                  'sort-by dropdown-item ' +
                  (props.orderBy === 'aptDate' ? 'active' : '')
                }
                onClick={e =>
                  props.changeOrder('aptDate', props.orderDir)
                }
                href="#"
              >
                Date
              </button>
              <button
                className={
                  'sort-by dropdown-item ' +
                  (props.orderBy === 'ownerName' ? 'active' : '')
                }
                onClick={e =>
                  props.changeOrder('ownerName', props.orderDir)
                }
                href="#"
              >
                Owner
              </button>
              <div role="separator" className="dropdown-divider" />
              <button
                className={
                  'sort-by dropdown-item ' +
                  (props.orderDir === 'asc' ? 'active' : '')
                }
                onClick={e =>
                  props.changeOrder(props.orderBy, 'asc')
                }
                href="#"
              >
                Asc
              </button>
              <button
                className={
                  'sort-by dropdown-item ' +
                  (props.orderDir === 'desc' ? 'active' : '')
                }
                onClick={e =>
                  props.changeOrder(props.orderBy, 'desc')
                }
                href="#"
              >
                Desc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItems
