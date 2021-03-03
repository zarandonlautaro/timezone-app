import React from "react";
import "./TimezoneList-module.css";

const TimezoneList = (props) => {
  const { timezoneList = [], handleRemove } = props;
  return (
    <>
      {timezoneList.map((data) => {
        if (!data) {
          return null;
        }
        const { _id: id, timezone, unixtime } = data;
        const milliseconds = unixtime * 1000;
        const dateObject = new Date(milliseconds);
        const humanDateFormat = dateObject.toLocaleString();
        return (
          <div key={id} className='box'>
            <div className='box-container'>
              <h2 className='title'>{timezone}</h2>
              <p className='text'>{humanDateFormat}</p>
            </div>
            <span type='button' onClick={() => handleRemove(id)}>
              ✖️
            </span>
          </div>
        );
      })}
    </>
  );
};

export default TimezoneList;
