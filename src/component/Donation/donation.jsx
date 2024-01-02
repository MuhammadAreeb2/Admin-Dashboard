import './donation.css'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
function Donation() {
    const [donates, setDonates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersCollection = collection(db, 'User');
                const usersSnapshot = await getDocs(usersCollection);

                const allDonates = [];

                for (const userDoc of usersSnapshot.docs) {
                    const userId = userDoc.id;
                    const userDonatesCollection = collection(db, 'User', userId, 'donates');
                    const DonatesSnapshot = await getDocs(userDonatesCollection);
                    const DonatesData = DonatesSnapshot.docs.map(doc => doc.data());

                    // Combine userId with each request data
                    const DonatesWithUserId = DonatesData.map(request => ({ ...request, userId }));

                    allDonates.push(...DonatesWithUserId);
                }

                setDonates(allDonates);
                console.log(donates);
            } catch (error) {
                console.error('Error fetching user Donates data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2>Donation</h2>
            <div class="container" style={{ width: "100%" }}>
                <table class="responsive-table" style={{ width: "100%" }}>
                    <thead class="responsive-table__head" style={{ width: "100%" }}>
                        <tr class="responsive-table__row" style={{ width: "100%" }}>
                            <th class="responsive-table__head__title responsive-table__head__title--types">Name</th>
                            <th class="responsive-table__head__title responsive-table__head__title--update">DonationType</th>
                            <th class="responsive-table__head__title responsive-table__head__title--country">Description</th>
                            <th class="responsive-table__head__title responsive-table__head__title--country">Contact No</th>
                        </tr>
                    </thead>
                    <tbody className="responsive-table__body">
                        {donates.map((donates, index) => (
                            <tr key={index} className="responsive-table__row" style={{ width: "1000px" }}>
                                <td className="responsive-table__body__text responsive-table__body__text--types">{donates.name}</td>
                                <td className="responsive-table__body__text responsive-table__body__text--update">{donates.donationType}</td>
                                <td className="responsive-table__body__text responsive-table__body__text--country">{donates.desc}</td>
                                <td className="responsive-table__body__text responsive-table__body__text--country">{donates.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>


    )
}
export default Donation