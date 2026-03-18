# Задача 1: разработка компонента

## 📖 Описание задачи
1) Функция получает данные из всех JSON-источников и предоставляет единый массив пользователей с суммарной оценкой по задачам и разбивкой по проектам.  
2) В каждом проекте пользователя собран список его задач.  

3) Поля результата
- `name` — имя пользователя  
- `total_estimate` — суммарная оценка по всем задачам  
- `projects_estimates` — массив проектов пользователя:
  - `name` — название проекта  
  - `total_estimate` — суммарная оценка задач проекта  
  - `tasks` — массив задач проекта  

### Источники данных
- [users.json](https://jetlend.ru/media/files/hr/frontend/users.json)  
- [projects.json](https://jetlend.ru/media/files/hr/frontend/projects.json)  
- [tasks.json](https://jetlend.ru/media/files/hr/frontend/tasks.json)  

### Пример результата
```json
[
  {
    "name": "Мария Иванова",
    "total_estimate": 35,
    "projects_estimates": [
      {
        "name": "Alpha Development",
        "total_estimate": 25,
        "tasks": [
          { "id": 1, "userId": 1, "projectId": 1, "estimate": 10 },
          { "id": 2, "userId": 1, "projectId": 1, "estimate": 15 }
        ]
      }
    ]
  }
]
```

## 🚀 Установка и запуск
**Локально**
1. Клонируйте репозиторий:
git clone https://github.com/HelenVirtanen/JetLend
2. Установите зависимости:
``` 
npm i
```

3. Запустите приложение:
```
npm run dev
```
   
Приложение будет доступно по адресу http://localhost:5173