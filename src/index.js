//Подключаем библиотеку React
import React from 'react';
//Подключаем библиотеку React DOM
import ReactDOM from 'react-dom';
//Подключаем css Index
import './index.css';
//Подключаем Главный компонент App.js
import App from './components/app';
//Пример использования class constructor
// import Test from './components/test'; 
//Измеряет производительность
import reportWebVitals from './reportWebVitals';

//Подключаем рект к div id = root
ReactDOM.render(
  // Подключаем строгий режим
  <React.StrictMode>
    {/* Выводим компонент App */}
    <App/>,
  </React.StrictMode>,
  document.getElementById('root')
);

// Если вы хотите начать измерять производительность в своем приложении, передайте функцию
// для регистрации результатов (например: reportWebVitals (console.log))
// или отправить в конечную точку аналитики. Узнать больше: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
