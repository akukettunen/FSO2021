import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  return (
    <div>
      filter
      <input 
        style={{marginLeft: '5px', marginBottom: '10px'}} 
        value={ props.filter } 
        onChange={ (e) => props.setFilter(e.target.value) } 
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)


export default ConnectedFilter