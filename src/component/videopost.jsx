import '../App.css';
import DropFileInput from './drop-file-input/DropFileInput';
import UploadButton from './upload-button/UploadButton';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from './firebase';
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

function VideoPost() {
  const [file, setFile] = useState(null);

  const onFileChange = (files) => {
    const currentFile = files[0];
    setFile(currentFile);
    console.log(files);
  };

  const uploadToDatabase = async (url) => {
    try {
      const docData = {
        uploadURL: url,
        username: "Admin",
      };

      // Use collection() and addDoc() to create a new document with a unique ID
      const videoCollectionRef = collection(db, "Video");
      const newVideoDocRef = await addDoc(videoCollectionRef, docData);

      console.log("Successfully updated DB with document ID:", newVideoDocRef.id);
    } catch (error) {
      console.error("Error updating DB:", error.message);
    }
  };

  const handleClick = () => {
    if (file === null) return;
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, (error) => {
      console.error("Error during upload:", error.message);
    }, () => {
      console.log("Upload success!!");
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        uploadToDatabase(downloadURL);
        console.log(downloadURL);
        setFile(null);
      }).catch((error) => {
        console.error("Error getting download URL:", error.message);
      });
    });
  };

  return (
    <div className="box">
      <h2 className="header">
        Add Video / Img to Post
      </h2>
      <DropFileInput
        onFileChange={(files) => onFileChange(files)}
      />
      <br></br>
      <UploadButton onClick={() => handleClick()}> </UploadButton>
    </div>
  );
}

export default VideoPost;
