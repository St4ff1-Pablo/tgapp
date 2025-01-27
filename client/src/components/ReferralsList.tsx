import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

const ReferralsList: React.FC = () => {
    interface Referral {
        id: number;
        referral_id: number;  // Оставляем referral_id как число
    }

    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Жёстко зафиксированный userId
        const userId = 710934564;

        axios
            .get(`https://1ee8-158-195-196-54.ngrok-free.app/users/${userId}/referrals`)
            .then((response) => {
                console.log("API Response:", response.data); // Debugging
                if (Array.isArray(response.data)) {
                    setReferrals(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setError("Invalid data format from API.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("API Error:", error);
                setError(error.response?.data?.detail || "Error fetching referrals");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>My Referrals</h2>
            {Array.isArray(referrals) && referrals.length === 0 ? (
                <p>No referrals found.</p>
            ) : Array.isArray(referrals) ? (
                <ul>
                    {referrals.map((ref) => (
                        <li key={ref.id}>
                            Referral ID: <strong>{ref.referral_id.toString()}</strong> {/* Преобразуем в строку */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Unexpected data format received.</p>
            )}
        </div>
    );
};

export default ReferralsList;
