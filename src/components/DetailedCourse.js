import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, setDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import '../styles/CoursePage.css';

import { AuthContext } from '../Context/auth.js';

function DetailedCourse() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const userId = user ? user.uid : null; 
  const [course, setCourse] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);


  useEffect(() => {
    const fetchCourseDetails = async () => {
      const db = getFirestore();
      const courseDoc = doc(db, 'eventos', id);

      try {
        const courseSnapshot = await getDoc(courseDoc);
        if (courseSnapshot.exists()) {
          setCourse(courseSnapshot.data());
          setImageURL(courseSnapshot.data().image);
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
  const courseId = id;

  if (userId) {
    const cursoRef = doc(db, 'eventos', courseId);
    const alunosInscritosRef = collection(cursoRef, 'alunosInscritos');
    const usuarioRef = doc(db, 'usuarios', userId);

    try {
      const alunoSnapshot = await getDoc(doc(alunosInscritosRef, userId));

      if (!alunoSnapshot.exists()) {
        await setDoc(doc(alunosInscritosRef, userId), { userId });
        setIsEnrolled(true);


        const alunoData = await getDoc(usuarioRef);
        const cursosInscritos = alunoData.data().cursosInscritos;
        cursosInscritos.push(courseId);
        await setDoc(usuarioRef, {
          cursosInscritos,
        });

        console.log('Aluno inscrito com sucesso. ID: ', userId);
      } else {
        console.log('O aluno já está inscrito neste curso.');
      }
    } catch (error) {
      console.log('Erro ao inscrever o aluno: ', error);
    }
  } else {
    console.log('Usuário não autenticado. Não é possível se inscrever.');
  }
};


  console.log('User ID:', userId); // Adicione este console.log para verificar o valor de userId
  console.log('user: ', user)
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
            <img src={imageURL} alt="Course" className="course-image" />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Carregando...</div>;
  }
}

export default DetailedCourse;
