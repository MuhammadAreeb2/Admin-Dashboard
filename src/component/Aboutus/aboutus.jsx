import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './about.css'
function AboutUs() {
    const [textData, setTextData] = useState('');

    const onTextChange = (event) => {
        const newText = event.target.value;
        setTextData(newText);
    };
    const uploadToDatabase = () => {
        if (textData.trim() === '') {
            console.error('Text data is empty');
            return;
        }

        const aboutusDocRef = doc(db, 'Aboutus', 'admin'); // Assuming 'admin' is the document ID

        setDoc(aboutusDocRef, {
            title: "admin",
            data: textData
        })
            .then(() => {
                console.log('Successfully updated text information in the database');
                toast.success('About Us is Saved to Data Base and Successfully Posted ! ', {
                    style: {
                        background: 'green',
                        color: 'white',
                    },
                });
                setTextData('');
            })
            .catch((error) => {
                toast.success('About Us is not Successfully posted ', {
                    style: {
                        background: 'red',
                        color: 'white',
                    },
                });
                console.error('Error updating text information:', error);
            });
    };
    const handleClick = () => {
        uploadToDatabase();
    };

    return (

        <>
            <ToastContainer />
            <div class="about-container">
                <div class="form">
                    <span class="heading">About Us  </span>
                    <textarea placeholder="Say Hello" rows="10" cols="30" id="message" name="message" class="textarea" value={textData}
                        onChange={onTextChange}></textarea>
                    <div class="button-container">

                        <div class="about-button-container">
                            <div id="reset-btn" class="about-button">  <button style={{ background: 'none', border: 'none', color: 'white' }} onClick={handleClick}>
                                Post Your About
                            </button></div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AboutUs;
