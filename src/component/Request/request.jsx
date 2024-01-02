import React, { useState, useEffect } from 'react';
import './request.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Requestz = () => {
    const [requests, setRequests] = useState([]);
    const getRandomStatus = () => {
        const statuses = ['Pending', 'Active', 'Inactive'];
        const randomIndex = Math.floor(Math.random() * statuses.length);
        return statuses[randomIndex];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersCollection = collection(db, 'User');
                const usersSnapshot = await getDocs(usersCollection);

                const allRequests = [];

                for (const userDoc of usersSnapshot.docs) {
                    const userId = userDoc.id;
                    const userRequestsCollection = collection(db, 'User', userId, 'requests');
                    const requestsSnapshot = await getDocs(userRequestsCollection);
                    const requestsData = requestsSnapshot.docs.map(doc => doc.data());

                    // Combine userId with each request data
                    const requestsWithUserId = requestsData.map(request => ({ ...request, userId, status: getRandomStatus() }));

                    allRequests.push(...requestsWithUserId);
                }

                setRequests(allRequests);
                console.log(requests);
            } catch (error) {
                console.error('Error fetching user requests data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2>Request</h2>

            <div className="container">
                <table className="responsive-table">
                    <thead className="responsive-table__head">
                        <tr className="responsive-table__row">
                            <th className="responsive-table__head__title responsive-table__head__title--types">Name</th>
                            <th className="responsive-table__head__title responsive-table__head__title--update">CNIC</th>
                            <th className="responsive-table__head__title responsive-table__head__title--country">Donation Type</th>
                            <th className="responsive-table__head__title responsive-table__head__title--status" style={{ textAlign: "right" }}>Contact</th>
                            <th className="responsive-table__head__title responsive-table__head__title--status">Status</th>
                        </tr>
                    </thead>
                    <tbody className="responsive-table__body">
                        {requests.map((request, index) => (
                            <tr key={index} className="responsive-table__row" style={{ width: "1000px" }}>
                                <td className="responsive-table__body__text responsive-table__body__text--types">{request.name}</td>
                                <td className="responsive-table__body__text responsive-table__body__text--update">{request.cnic}</td>
                                <td className="responsive-table__body__text responsive-table__body__text--country">{request.donationType}</td>
                                <td className="responsive-table__body__text responsive-table__body__text--country">{request.contact}</td>
                                <td class="responsive-table__body__text responsive-table__body__text--status">  <span className={`status-indicator status-indicator--${request.status.toLowerCase()}`}>

                                </span>
                                    <span> {request.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Requestz;
