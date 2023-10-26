import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/NavBar.css';
import '../styles/mainpage.css';
import BgMainPage from './BgMainPage.js';
import NavBar from './NavBar.js';

function MainPageAdmin() {
  const [courses, setCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', guestName: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const coursesToDisplay = courses.slice(
    currentSlide * coursesPerPage,
    (currentSlide + 1) * coursesPerPage
  );

  useEffect(() => {
    const fetchCourses = async () => {
      const db = getFirestore();
      const cursosCollection = collection(db, 'eventos');

      const cursosSnapshot = await getDocs(cursosCollection);
      const cursosData = cursosSnapshot.docs.map((doc) => doc.data());
      setCourses(cursosData);
    };

    fetchCourses();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const openCreateCoursePopup = () => {
    setIsCreatingCourse(true);
  };

  const closeCreateCoursePopup = () => {
    setIsCreatingCourse(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `course-images/${file.name}`);
      
      try {
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setImageURL(imageUrl);
      } catch (error) {
        console.error('Error uploading or retrieving image URL:', error);
      }
    }
  };

  const handleCreateCourse = async () => {
    const courseData = { ...newCourse, image: imageURL };
  
    setCreatedCourses([...createdCourses, courseData]);
  
    const db = getFirestore();
    const cursosCollection = collection(db, 'eventos');
  
    try {
      const docRef = await addDoc(cursosCollection, courseData);
      console.log('Novo curso adicionado com ID: ', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar o curso: ', error);
    }
  
    // Clear the new course data and image URL after adding
    setNewCourse({ name: '', guestName: '' });
    setImageURL(null);
  
    closeCreateCoursePopup();
  };

  return (
    <div className="mainpage-container">
      <BgMainPage />
      <NavBar />
      <h2 className="categories-title">Categorias</h2>
      <hr className="categories-hr" />
      <div className="curso-images">
        {coursesToDisplay.map((course, index) => (
          <div key={index} className="course-container">
            <img src={course.image} alt={course.name} />
            <p className="course-name">{course.name}</p>
            <p className="course-description">{course.description}</p>
          </div>
        ))}
        <button className="add-course-button" onClick={openCreateCoursePopup}>
          Adicionar Curso
        </button>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
          >
            &#8592;
          </button>
          <button
            className="pagination-button"
            onClick={handleNextSlide}
            disabled={currentSlide === totalPages - 1}
          >
            &#8594;
          </button>
        </div>
      )}
      {isCreatingCourse && (
        <div className="create-course-popup">
          <div className="create-course-content">
            <h3>Adicionar Curso</h3>
            <input
              type="text"
              placeholder="Nome do Curso"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            />
            <input
              type="file"
              onChange={handleImageUpload}
            />
            <input
              type="text"
              placeholder="Nome do Convidado"
              value={newCourse.guestName}
              onChange={(e) => setNewCourse({ ...newCourse, guestName: e.target.value })}
            />
            <button onClick={handleCreateCourse}>Criar Curso</button>
            <button onClick={closeCreateCoursePopup}>Cancelar</button>
          </div>
        </div>
      )}
      <div className="created-courses-list">
        <h3>Cursos Criados</h3>
        <ul>
          {createdCourses.map((course, index) => (
            <li key={index}>{course.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPageAdmin;