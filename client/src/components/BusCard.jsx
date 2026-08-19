const BusCard = ({ journey, onSelect }) => {

    const bus = journey.bus;


    return (
        <div className="bus-card">

            <div className="bus-info">

                <h3>
                    {bus.busName}
                </h3>


                <span>
                    {bus.busType}
                </span>


                <time>
                    {bus.departureTime}
                    {" ----- "}
                    {bus.arrivalTime}
                </time>


                <p>
                    Available Seats {journey.availableSeats}
                </p>


                <h5>
                    ₹ {bus.price}
                </h5>


                <button
                    type="button"
                    className="select-seat-btn"
                    onClick={() => onSelect(journey._id)}
                >
                    Select Seats
                </button>

            </div>

        </div>
    );
};


export default BusCard;