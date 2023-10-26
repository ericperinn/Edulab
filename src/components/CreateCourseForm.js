import React, { useState } from 'react';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {storage} from '/firebase'

function CreateCourseForm({ onSubmit, onCancel }) {
  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [progress, setProgress] = useState(0    );




  const handleSubmit = (e) => {
    e.preventDefault();
    // Envie os dados para a função onSubmit

    const file = e.target[0]?.files[0]
    if (!file) return;

    const storageRef = ref(storage, 'images/${file.name}')
    const uploadTask = uploadBytesResumable(storageRef, file)

uploadTask.on(
    "state_changed",
    snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
    },
    error => {
        alert(error)
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
            setImgURL(url)
        })
    }
)

    onSubmit({
      courseName,
      courseImage,
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
          type="text"
          placeholder="URL da Imagem do Curso"
          value={courseImage}
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
      {!imgURL && <progress value={progress} max="100"/>}
      {!imgURL && <img src={imgURL} alt="imagem"/>}
    </div>
  );
}

export default CreateCourseForm;
