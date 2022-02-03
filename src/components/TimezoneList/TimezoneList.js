import React from "react";
import "./TimezoneList-module.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

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
                const humanDateFormat = dateObject.toLocaleTimeString();
                return (
                    <div key={index} className="box">
                        <div className="box-container">
                            <p className="text">{humanDateFormat}</p>
                            <p className="timezone">{timezone}</p>
                            <div className="clock">
                                <Clock value={humanDateFormat} />
                            </div>
                            <span
                                type="button"
                                onClick={() => handleRemove(id)}
                            >
                                X
                            </span>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TimezoneList;
