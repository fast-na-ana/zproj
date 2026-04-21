import React, { useState } from 'react';

const BookingModal = ({ ride, isOpen, onClose, token }) => {
    const [seatsToBook, setSeatsToBook] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleBook = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rideId: ride.RideID,
                    seatsToBook: seatsToBook
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to book ride');

            alert(`Success! Total Fare: Rs. ${data.totalFare}`);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#1a1428] border border-white/10 backdrop-blur-xl p-8 rounded-2xl w-96 text-white">
                <h2 className="text-2xl font-bold mb-2">Book Ride</h2>
                <p className="text-zinc-400 text-sm mb-6">To {ride.Destination}</p>

                <div className="mb-6 space-y-3 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Available Seats:</span>
                        <span className="font-semibold text-white">{ride.AvailableSeats}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Price per Seat:</span>
                        <span className="font-semibold text-purple-400">Rs. {ride.PricePerSeat}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block mb-3 text-sm font-semibold">Seats to Book:</label>
                    <input
                        type="number"
                        min="1"
                        max={ride.AvailableSeats}
                        value={seatsToBook}
                        onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-purple-600/60 focus:bg-purple-900/10 outline-none transition-colors"
                    />
                </div>

                <div className="mb-6 p-4 bg-purple-900/20 border border-purple-700/40 rounded-lg">
                    <p className="text-zinc-400 text-sm mb-1">Total Estimated:</p>
                    <p className="font-bold text-2xl text-purple-400">Rs. {ride.PricePerSeat * seatsToBook}</p>
                </div>

                {error && <p className="text-red-400 mb-4 text-sm bg-red-900/20 border border-red-700/30 p-3 rounded-lg">{error}</p>}

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleBook}
                        disabled={loading}
                        className="px-6 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg disabled:bg-purple-900 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;