import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PredictionsBar from "../components/PredictionsBar";
import SearchBar from "../components/SearchBar/SearchBar";
import TimezoneList from "../components/TimezoneList/TimezoneList";
import "./SearchPage-module.css";

function SearchPage() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [timezoneList, setTimezoneList] = useState([]);
    const [timezoneListAPI, setTimezoneListAPI] = useState([]);
    const [timezoneListDefault, setTimezoneListDefault] = useState([]);
    const [predictions, setPredictions] = useState();

    const fetchTimezones = async () => {
        setLoading(true);
        await fetch(`${process.env.REACT_APP_API_URL}/timezones`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLoading(false);
                setTimezoneListAPI(data.body.timezones);
                // setTimezoneList(data.body.timezones);
            });
    };

    const fetchTimezonesFavorites = async () => {
        setLoading(true);
        await fetch(`${process.env.REACT_APP_API_URL}/timezones/favorites`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLoading(false);
                // setTimezoneListAPI(data.docs);
                setTimezoneList(data.docs);
            });
    };

    const onChangeSearch = async (input) => {
        setInput(input);
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

        if (predictions.length > 0) setPredictions(predictions?.slice(0, 5));
        if (filtered.length > 0) setTimezoneList(filtered);

        setLoading(false);
    };

    const handleRemove = async (id) => {
        setLoading(true);
        const removeApi = await fetch(
            `${process.env.REACT_APP_API_URL}/timezones/${id}`,
            {
                method: "DELETE",
            },
        )
            .then((response) => response.json())
            .then((data) => {
                fetchTimezonesFavorites();
                fetchTimezones();
                setInput("");
            });
        if (!removeApi) {
            return null;
        }
        const filtered = timezoneListDefault.filter((item) => item.id !== id);
        setInput(filtered);
        setTimezoneList(filtered);
        setTimezoneListDefault(filtered);
        fetchTimezonesFavorites();
        setLoading(false);
    };

    const setTimezone = async (timezone) => {
        setLoading(true);
        const addApi = await fetch(
            `${process.env.REACT_APP_API_URL}/timezones/${timezone}`,
            {
                method: "POST",
            },
        );
        if (!addApi) {
            return null;
        }
        fetchTimezonesFavorites();
        fetchTimezones();
        setInput("");
        setLoading(false);
    };

    const handlePrediction = async (prediction) => {
        setInput("");
        setPredictions();
        fetchTimezonesFavorites();
        fetchTimezones();
        setTimezone(prediction);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            setInput("");
            fetchTimezonesFavorites();
        }
    };

    useEffect(() => {
        fetchTimezonesFavorites();
    }, []);

    useEffect(() => {
        fetchTimezones();
    }, []);

    return (
        <>
            <div className="header">
                <h1 style={{ textAlign: "center" }}>Our timezones</h1>
                <SearchBar
                    value={input}
                    onChange={onChangeSearch}
                    handleKeyDown={handleKeyDown}
                >
                    <PredictionsBar
                        predictions={predictions}
                        handlePrediction={handlePrediction}
                    />
                </SearchBar>
            </div>
            <div className="content">
                {!loading ? (
                    <TimezoneList
                        timezoneList={timezoneList}
                        handleRemove={handleRemove}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}

export default SearchPage;
