import React from "react";
import "./TimezoneList-module.css";

const TimezoneList = ({ timezoneList = [], handleRemove }) => {
    return (
        <>
            {timezoneList.map((timeZ, index) => {
                if (!timeZ) {
                    return null;
                }
                const { _id: id, timezone, unixtime } = timeZ;
                const milliseconds = unixtime * 1000;
                const dateObject = new Date(milliseconds);
                const humanDateFormat = dateObject.toLocaleString();
                return (
                    <div key={index} className="box">
                        <div className="box-container">
                            <h4 className="title">{timezone}</h4>
                            <p className="text">{humanDateFormat}</p>
                        </div>
                        <span type="button" onClick={() => handleRemove(id)}>
                            ✖️
                        </span>
                    </div>
                );
            })}
        </>
    );
};

export default TimezoneList;
