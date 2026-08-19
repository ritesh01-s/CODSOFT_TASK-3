import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import BusCard from "../components/BusCard.jsx";
import "../styles/SearchResults.css";



const SearchResults = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [journeys, setJourneys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const source = searchParams.get("source");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");


    useEffect(() => {

        const fetchJourneys = async () => {

            try {

                setLoading(true);
                setError("");


                const response = await api.get("/journeys", {

                    params: {
                        source,
                        destination,
                        date
                    }

                });


                setJourneys(
                    response.data.journeys || []
                );


            } catch (error) {

                console.error(
                    "Search Journey Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to fetch available buses."
                );


            } finally {

                setLoading(false);

            }

        };


        if (source && destination && date) {

            fetchJourneys();

        } else {

            setLoading(false);

            setError(
                "Please provide source, destination and journey date."
            );

        }

    }, [source, destination, date]);


    if (loading) {

        return (
            <div>
                <h2>Searching for buses...</h2>
            </div>
        );

    }


    return (

        <div>

            <h1>Available Buses</h1>


            <p>
                {source} → {destination}
            </p>

            <p>
                Journey Date: {date}
            </p>


            {error && (

                <p>
                    {error}
                </p>

            )}


            {!error && journeys.length === 0 && (

                <div>

                    <h3>
                        No buses found
                    </h3>

                    <p>
                        Try searching for another route or date.
                    </p>

                </div>

            )}


            {journeys.length > 0 && (

                    <div className="bus-list">

                        {journeys.map((journey) => (

                            <BusCard
                                key={journey._id}
                                journey={journey}
                                onSelect={(journeyId) =>
                                    navigate(`/seats/${journeyId}`)
                                }
                            />

                        ))}

                    </div>

            )}

        </div>

    );

};


export default SearchResults;