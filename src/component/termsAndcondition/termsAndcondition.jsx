import {  collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
function TermsAndCondition() {
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

    const termsRef = collection(db, 'TermsAndCondition');
    const newDocRef = doc(termsRef); // Create a new document reference within the collection

    setDoc(newDocRef, {
      data: textData,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log('Successfully updated text information in the database');
        toast.success('Terms And Condition is Saved to Data Base and Successfully Posted ! ', {
          style: {
            background: 'green',
            color: 'white',
          },
        });
        setTextData('');
      })
      .catch((error) => {
        toast.success('Terms And Condition is not Successfully posted ', {
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
          <span class="heading">terms and Condition </span>
          <textarea
            placeholder="Say Hello"
            rows="10"
            cols="30"
            id="message"
            name="message"
            class="textarea"
            value={textData}
            onChange={onTextChange}
          ></textarea>
          <div class="button-container">
            <div class="about-button-container">
              <div id="reset-btn" class="about-button">
                <button style={{ background: 'none', border: 'none', color: 'white' }} onClick={handleClick}>
                  Post Your Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default TermsAndCondition;
