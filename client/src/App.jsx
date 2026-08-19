import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import Footer from "./components/Footer";


function App() {

    return (

        <BrowserRouter>
          <Navbar />


            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/search"
                    element={<SearchResults />}
                />

                <Route
                    path="/seats/:journeyId"
                    element={<SeatSelection />}
                />
                <Route
                    path="/booking/:journeyId"
                    element={<PassengerDetails />}
                />

                <Route
                    path="/booking/:journeyId/confirm"
                    element={<BookingConfirmation />}
                />

                <Route
                    path="/ticket/:bookingId"
                    element={<BookingDetails />}
                />

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />

            </Routes>

          <Footer />
          
        </BrowserRouter>

    );

}


export default App;