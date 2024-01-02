import '../../App.css';
import './textpost.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from '../firebase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
function TextPost() {
    const [textData, setTextData] = useState("");

    const onTextChange = (event) => {
        const newText = event.target.value;
        setTextData(newText);
    }

    const uploadToDatabase = () => {
        if (textData.trim() === "") {
            console.error("Text data is empty");
            return;
        }

        const PostRef = collection(db, "Post");

        addDoc(PostRef, { Post: textData })

            .then(() => {
                toast.success('Post is Saved to Data Base and Successfully Posted ! ', {

                    style: {
                        background: 'green',
                        color: 'white',
                    },
                });
                console.log("Successfully updated text information in the database");
                setTextData('')
            })
            .catch((error) => {
                toast.success('Post is faild to  post ! ', {

                    style: {
                        background: 'red',
                        color: 'white',
                    },
                });
                console.error("Error updating text information:", error.message);
            });
    };

    const handleClick = () => {
        uploadToDatabase();
    }

    return (
        <div className="box">



            <div className="form-container" style={{ margin: "auto" }}>
                <div className="form" >
                    <div className="form-group">
                        <label htmlFor="post">   <h2 className="header">
                            Hey Admin !  Post  Your  Toughts
                        </h2></label>

                    </div>
                    <div className="form-group">

                        <AccountCircle color='white' />
                        <TextField
                            id="input-with-sx"
                            label="Write Post"
                            variant="standard"
                            value={textData}
                            onChange={onTextChange}
                        />

                    </div>
                    <button class="Btn" onClick={handleClick}>Add Post
                        <svg class="svg" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                    </button>

                </div>
            </div>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px',
                    // height: '100vh', // Optionally set height to make the box take the full viewport height
                    '& > :not(style)': { m: 1 },
                }}
            >
                {/* <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="input-with-sx"
                        label="Write Post"
                        variant="standard"
                        value={textData}
                        onChange={onTextChange}
                    />
                </Box> */}
            </Box>

            <br />


        </div>
    );
}

export default TextPost;
