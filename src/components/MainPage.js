import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/NavBar.css';
import '../styles/mainpage.css';
import BgMainPage from './BgMainPage.js';
import NavBar from './NavBar.js';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Config/firebase';



function MainPage() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    guestName: '',
    description: '',
    location: '',
    time: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const coursesToDisplay = courses.slice(
    currentSlide * coursesPerPage,
    (currentSlide + 1) * coursesPerPage
  );

  useEffect(() => {
    const fetchCourses = async () => {
      // Seu código para buscar cursos aqui
    };

    fetchCourses();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return unsubscribe;
  }, [navigate]);

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
    // Seu código para upload de imagem aqui
  };

  const handleCreateCourse = async () => {
    // Seu código para criar um novo curso aqui
  };

  return (
    <div className="mainpage-container">
      <BgMainPage />
      <NavBar />
      <h2 className="categories-title">Categorias</h2>
      <hr className="categories-hr" />

      {user ? (
        <div className="curso-images">
          {coursesToDisplay.map((course, index) => (
            <div key={index} className="course-container">
              <img className="course-imagein" src={course.image} alt={course.name} />
              <h3 className="course-name">{course.name}</h3>
              <p className="course-description">{course.description}</p>
              <p className="course-location">{course.location}</p>
              <p className="course-time">{course.time}</p>
              <Link to={`/course/${course.courseId}`}>Visualizar Curso</Link>
            </div>
          ))}
          <button className="add-course-button" onClick={openCreateCoursePopup}>
            Adicionar Curso
          </button>
        </div>
      ) : null}

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
            <input type="file" onChange={handleImageUpload} />
            <input
              type="text"
              placeholder="Nome do Convidado"
              value={newCourse.guestName}
              onChange={(e) => setNewCourse({ ...newCourse, guestName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descrição do Curso"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Local do Curso"
              value={newCourse.location}
              onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Horário do Curso"
              value={newCourse.time}
              onChange={(e) => setNewCourse({ ...newCourse, time: e.target.value })}
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

export default MainPage;