import React, { useState } from 'react';
import '../styles/NavBar.css';
import '../styles/mainpage.css';
import BgMainPage from './BgMainPage.js';
import NavBar from './NavBar.js';
import teste1 from '../images/teste1.png';
import teste2 from '../images/teste2.png';
import teste3 from '../images/teste3.png';
import teste4 from '../images/teste4.png';


function MainPage() {
	const courses = [
		{
			id: 1,
			name: 'Curso 1',
			image: teste1,
			description: 'Descrição do Curso 1',
		},
		{
			id: 2,
			name: 'Curso 2',
			image: teste4,
			description: 'Nessa quarta-feira, teremos mais uma edição do Grandes Temas, dessa vez ao vivo em nosso Instagram A convidada da semana Nicolle Loureiro é Community Manager CX/UX Writing atuando na área de Relações Públicas e Internacional A transmissão acontece 09 de agosto, às 19h AM, não percam #stem #tecnologia #uea #conhecimento #amazonia #esg',
		},
		{
			id: 3,
			name: 'Curso 3',
			image: teste1,
			description: 'Descrição do Curso 4  ',
		},
		{
			id: 4,
			name: 'Curso 4',
			image: teste2,
			description: 'Descrição do Curso 4',
		},
		{
			id: 5,
			name: 'Curso 5',
			image: teste3,
			description: 'Descrição do Curso 5',
		},
		{
			id: 6,
			name: 'Curso 6',
			image: teste2,
			description: 'Descrição do Curso 6',
		},
		{
			id: 7,
			name: 'Curso 7',
			image: teste1,
			description: 'Descrição do Curso 7',
		},
	];
	

  const [currentSlide, setCurrentSlide] = useState(0);

  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const coursesToDisplay = courses.slice(
    currentSlide * coursesPerPage,
    (currentSlide + 1) * coursesPerPage
  );

  return (
    <div className="mainpage-container">
      <BgMainPage />
      <NavBar />
      <h2 className="categories-title">Categorias</h2>
      <hr className="categories-hr" />
      <div className="curso-images">
        {coursesToDisplay.map((course) => (
          <div key={course.id} className="course-container">
					<img src={course.image} alt={course.name} />
					<p className="course-name">{course.name}</p>
					<p className="course-description">{course.description}</p>
				</div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
          >
            &#8592; {/* Seta para a esquerda */}
          </button>
          <button
            className="pagination-button"
            onClick={handleNextSlide}
            disabled={currentSlide === totalPages - 1}
          >
            &#8594; {/* Seta para a direita */}
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
