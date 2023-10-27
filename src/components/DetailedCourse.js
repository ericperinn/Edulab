import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, where, query, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function DetailedCourse() {
  const { id } = useParams();

  const db = getFirestore();
  const cursoCollection = collection(db, 'eventos');
  const courseDoc = doc(db, 'eventos', id);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseSnapshot = await getDoc(courseDoc);

      if (courseSnapshot.exists()) {
        const courseData = courseSnapshot.data();
        setCourse(courseData);
      } else {
        console.log('O curso não existe.');
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Renderiza o componente DetailedCourse apenas se o curso estiver carregado
  if (course) {
    return (
      <div className="detailed-course">
        <h2>{course.name}</h2>
        <p>Descrição: {course.description}</p>
        <p>Local: {course.location}</p>
        <p>Horário: {course.time}</p>
        <p>Convidado: {course.guestName}</p>
      </div>
    );
  } else {
    return <div>Carregando...</div>;
  }
}

export default DetailedCourse;
