import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

function CreateCourseForm({ onSubmit, onCancel }) {
  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(newProgress);

        if (newProgress === 100) {
          setUploadingFile('Upload completo');
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgURL(url);
        });
      }
    );

    setUploadingFile(file.name);

    onSubmit({
      courseName,
      courseImage: imgURL,
      guestName,
    });
  };

  return (
    <div className="create-course-form">
      <h2>Criar um novo curso</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Curso"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCourseImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome do Convidado"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <button type="submit">Criar Curso</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
      {progress > 0 && (
        <div>
          <p>Enviando: {uploadingFile}</p>
          <progress value={progress} max="100" />
        </div>
      )}
      {imgURL && (
        <div>
          <p>Imagem enviada com sucesso!</p>
          <img src={imgURL} alt="imagem" />
        </div>
      )}
    </div>
  );
}

export default CreateCourseForm;
