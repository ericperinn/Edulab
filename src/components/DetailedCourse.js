import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, setDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import '../styles/CoursePage.css';
import cursoImage from '../images/cursoImage.jpg';


function DetailedCourse() {
    const { id } = useParams();
    console.log("Course ID from URL:", id);
    const [course, setCourse] = useState(null);
    const [imageURL, setImageURL] = useState(''); // Adicione um estado para a URL da imagem
    const [isEnrolled, setIsEnrolled] = useState(false);
  
    useEffect(() => {
      console.log("Inside useEffect. ID:", id);
      const fetchCourseDetails = async () => {
        console.log("Inside fetchCourseDetails. ID:", id);
        const db = getFirestore();
        const courseDoc = doc(db, 'eventos', id);
  
        try {
          const courseSnapshot = await getDoc(courseDoc);
          if (courseSnapshot.exists()) {
            setCourse(courseSnapshot.data());
            setImageURL(courseSnapshot.data().image); // Atualize a URL da imagem
          } else {
            console.log('O curso não existe.');
          }
        } catch (error) {
          console.error('Erro ao buscar o curso: ', error);
        }
      };
  
      fetchCourseDetails();
    }, [id]);

const handleEnroll = async () => {
    const db = getFirestore();
    const courseId = id; // ID do curso
    const userId = 'seu_id_de_usuario'; // Substitua pelo ID do usuário autenticado
    const cursoRef = doc(db, 'eventos', courseId);
    const alunosInscritosRef = collection(cursoRef, 'alunosInscritos');

    try {
      // Verifique se o aluno já está inscrito no curso
      const alunoSnapshot = await getDoc(doc(alunosInscritosRef, userId));

      if (!alunoSnapshot.exists()) {
        // Se o aluno não estiver inscrito, insira os dados do aluno na subcoleção
        await setDoc(doc(alunosInscritosRef, userId), { userId });
        setIsEnrolled(true); // Atualize o estado para indicar que o aluno está inscrito
        console.log('Aluno inscrito com sucesso.');
      } else {
        console.log('O aluno já está inscrito neste curso.');
      }
    } catch (error) {
      console.error('Erro ao inscrever o aluno: ', error);
    }
  };


  
    if (course) {
      return (
        <div className="course-page-container">
          <NavBar />
          <div className="course-content">
            <div className="course-info">
              <h2 className="course-title">{course.name}</h2>
              <p className="course-details">
                <span>Professor: {course.guestName}</span><br />
                <span>Local: {course.location}</span><br />
                <span>Horário: {course.time}</span><br />
              </p>
              <p className="course-description">
              {course.description}
            </p>
            {isEnrolled ? (
              <p>Você já está inscrito neste curso.</p>
            ) : (
              <button className="enroll-button" onClick={handleEnroll}>
                Inscrever-se
              </button>
            )}
            </div>
            <div className="course-divider"></div>
            <div className="course-image-container">
              <img src={imageURL} alt="Course" className="course-image" /> {/* Exiba a imagem com a URL do curso */}
            </div>
          </div>
        </div>
      );

    } else {
      return <div>Carregando...</div>;
    }
  }
  
  export default DetailedCourse;