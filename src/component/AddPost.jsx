import '../App.css';
import DropFileInput from './drop-file-input/DropFileInput';
import UploadButton from './upload-button/UploadButton';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage, db } from './firebase';
import { doc, setDoc } from "firebase/firestore"
import { ToastContainer, toast } from 'react-toastify';

function Postss() {
    const [file, setFile] = useState(null)

    const onFileChange = (files) => {
        const currentFile = files[0]
        setFile(currentFile)
        console.log(files);
    }

    const uploadToDatabase = (url) => {
        let docData = {
            mostRecentUploadURL: url,
            username: "Admin"
        }
        const userRef = doc(db, "Video", docData.username)
        setDoc(userRef, docData, { merge: true }).then(() => {
            console.log("successfully updated DB")
        }).catch((error) => {
            console.log("errrror")
        })
    }

    const handleClick = () => {
        if (file === null) return;
        const fileRef = ref(storage, `videos/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, (error) => {
            console.log("error :(")
            toast.success('Post  is not  Saved to Data Base ', {

                style: {
                    background: 'green',
                    color: 'white',
                },
            });
        }, () => {
            console.log("success!!")
            toast.success('Post is Saved to Data Base and Successfully Posted ! ', {

                style: {
                    background: 'green',
                    color: 'white',
                },
            });
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                uploadToDatabase(downloadURL)
                console.log(downloadURL)
            })
        })
    }

    return (
        <>
            <ToastContainer />


            
            <div className="box">
                <h2 className="header">
                    Add Image to Post
                </h2>
                <DropFileInput
                    onFileChange={(files) => onFileChange(files)}
                />
                <br></br>
                <UploadButton onClick={() => handleClick()}> </UploadButton>
            </div>
        </>

    );
}
export default Postss