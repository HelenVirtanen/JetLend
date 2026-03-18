import { useEffect } from 'react';
import { fetchData } from './api/fetchData';
import { transformData } from './utils/transformData';
import './App.css'

function App() {
useEffect(() => {
    const loadData = async () => {
      try {
        const { users, projects, tasks } = await fetchData();

        console.log('✅ Пользователи:', users);
        console.log('✅ Проекты:', projects);
        console.log('✅ Задачи:', tasks);

        const result = transformData(users, projects, tasks);
        console.log('🚀 Итоговый результат:', result);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
      }
    };

    loadData();
  }, []);
  return (
    <h1>JetLend tasks</h1>
  )
}

export default App
