import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PredictionsBar from "../components/PredictionsBar";
import SearchBar from "../components/SearchBar/SearchBar";
import TimezoneList from "../components/TimezoneList/TimezoneList";
import useInterval from "../hooks/useInterval";
import "./SearchPage-module.css";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [timezoneList, setTimezoneList] = useState([]);
  const [timezoneListAPI, setTimezoneListAPI] = useState([]);
  const [timezoneListDefault, setTimezoneListDefault] = useState([]);
  const [predictions, setPredictions] = useState();
  const intervalTime = 5000;

  const fetchData = async () => {
    setLoading(true);
    await fetch("http://localhost:8000/timezones", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTimezoneListAPI(data.body.timezones);
      });
  };

  const fetchDataSaved = async () => {
    setLoading(true);
    await fetch("http://localhost:8000/timezones/saved", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTimezoneList(data.body.timezones.docs);
        setTimezoneListDefault(data.body.timezones.docs);
      });
  };

  const updateInput = async (input) => {
    setLoading(true);
    if (input.length === 0) {
      setPredictions();
    }
    const filtered = timezoneListDefault?.filter((timezon) => {
      return timezon.timezone.toLowerCase().includes(input.toLowerCase());
    });
    const predictions = timezoneListAPI?.filter((timezone) => {
      return timezone.toLowerCase().includes(input.toLowerCase());
    });

    setInput();
    setPredictions(predictions?.slice(0, 5));
    setTimezoneList(filtered);
    setLoading(false);
  };

  const handleRemove = async (id) => {
    setLoading(true);
    const removeApi = await fetch(`http://localhost:8000/timezones/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchDataSaved();
        fetchData();
        setInput("");
      });
    if (!removeApi) {
      return null;
    }
    const filtered = timezoneListDefault.filter((item) => item.id !== id);
    setInput(filtered);
    setTimezoneList(filtered);
    setTimezoneListDefault(filtered);
    fetchDataSaved();
    setLoading(false);
  };

  const setTimezone = async (timezone) => {
    setLoading(true);
    const addApi = await fetch(`http://localhost:8000/timezones/${timezone}`, {
      method: "PUT",
    });
    if (!addApi) {
      return null;
    }
    fetchDataSaved();
    fetchData();
    setInput("");
    setLoading(false);
  };

  const handlePrediction = async (prediction) => {
    setInput("");
    setPredictions();
    fetchDataSaved();
    fetchData();
    setTimezone(prediction);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setInput("");
      fetchDataSaved();
    }
  };

  useInterval(() => {
    setTimeout(() => {
      fetchData();
      console.log("API call");
    }, 5000);
  }, intervalTime);

  useEffect(() => {
    fetchDataSaved();
  }, []);

  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <>
      <div className='header'>
        <SearchBar
          input={input}
          onChange={updateInput}
          handleKeyDown={handleKeyDown}
        />
        <PredictionsBar
          predictions={predictions}
          handlePrediction={handlePrediction}
        />
      </div>
      <div>
        {!loading && timezoneList?.length !== 0 && (
          <h2 style={{ textAlign: "center" }}>Your timezones</h2>
        )}
      </div>
      <div className='content'>
        {!loading ? (
          <TimezoneList
            timezoneList={timezoneList}
            handleRemove={handleRemove}
          />
        ) : (
          <Loader />
        )}
      </div>
      ;
    </>
  );
}

export default SearchPage;
