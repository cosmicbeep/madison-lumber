import React from 'react';
import PropTypes from 'prop-types';


const AlertMessages = (props) => {
  let msgCount = 0;
  let errCount = 0;
  return (
  <div className="alert-messages">
    { props.success.length > 0 &&
      <div className="alert alert-success">
        {props.success.map((msg, i) => {
          msgCount++;
          return (
          <span key={`msg${msgCount}`}>
            { i === 0
              ? <strong>{msg} <br/></strong>
              : <span>{msg} <br/></span> }
          </span>
          )
        })}
      </div>
    }

    { props.errors.length > 0 &&
      <div className="alert alert-danger">
        {props.errors.map((err, i) => {
          errCount++;
          return (
          <span key={`err${errCount}`}>
            { i === 0
              ? <strong>{err} <br/></strong>
              : <span>{err} <br/></span> }
          </span>
          )
        })}
      </div>
    }
  </div>
)}


AlertMessages.propTypes = {
  success: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired
}


export default AlertMessages;