# Equeue Service

Сервис электронной очереди с Vue.js фронтендом и Go бэкендом.

## 🚀 Быстрый старт

### Предварительные требования

- Docker
- Docker Compose

### Запуск проекта

1. Клонируйте репозиторий:
```bash
git clone <your-repo-url>
cd Equeue-service
```

2. Запустите проект:
```bash
cd Docker/dev
docker-compose up --build
```

После запуска вы увидите в консоли:
```
[+] Running 3 containers
 ✔ Container equeue-service-mysql-1    Started
 ✔ Container equeue-service-backend-1  Started
 ✔ Container equeue-service-frontend-1 Started

Фронтенд доступен по адресу: http://localhost:5173
Бэкенд доступен по адресу:  http://localhost:8080
MySQL доступна по адресу:    localhost:3306

```

## 🛠 Разработка

### Фронтенд (Vue.js)
- Работает на порту 5173
- Hot-reload активен
- Исходный код в директории `src/`
- Для добавления зависимостей используйте:
```bash
docker-compose exec frontend npm install <package-name>
```

### Бэкенд (Go)
- Работает на порту 8080
- Исходный код в директории `backend/`
- Для добавления зависимостей используйте:
```bash
docker-compose exec backend go get <package-name>
```

### База данных (MySQL)
- Порт: 3306
- База данных: equeue_db
- Пользователь: equeue_user
- Пароль: equeue_password

Для подключения к базе данных используйте любой MySQL-клиент с указанными выше параметрами.

## 🔧 Конфигурация

### Переменные окружения

#### Фронтенд
- `NODE_ENV` - окружение Node.js
- `VITE_API_URL` - URL бэкенд API

#### Бэкенд
- `DB_HOST` - хост MySQL
- `DB_USER` - пользователь MySQL
- `DB_PASSWORD` - пароль MySQL
- `DB_NAME` - имя базы данных
- `DB_PORT` - порт MySQL

## 📝 Логирование

- Логи фронтенда и бэкенда доступны через `docker-compose logs`
- Для просмотра логов конкретного сервиса:
```bash
docker-compose logs frontend  # логи фронтенда
docker-compose logs backend   # логи бэкенда
docker-compose logs mysql    # логи базы данных
```