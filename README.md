# 🍷 Tech Liquor Store

**Tech Liquor Store** es un e-commerce desarrollado para la venta de licores, combinando un **frontend moderno** con Next.js y TypeScript, y un **backend robusto** construido con Express.js, TypeScript, TypeORM y PostgreSQL.

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js** (con TypeScript) para el desarrollo de interfaces rápidas y optimizadas.
- **React** para la construcción de componentes reutilizables.
- **TailwindCSS** para estilos.

### Backend
- **Express.js** para la API REST.
- **TypeScript** para tipado estático y mantenibilidad.
- **TypeORM** como ORM para interactuar con PostgreSQL.
- **PostgreSQL** como base de datos relacional.

## ⚙️ Características Principaless
- Autenticación con JWT.
- Gestión de usuarios y productos.
- Conexión segura con PostgreSQL.
- API modular y escalable.
- Interfaz optimizada para e-commerce.

## 📂 Estructura del Proyecto
```
tech-liquor-store/
├── server/               # Código del servidor (Express.js, TypeORM)
│   ├── src/              # Lógica del backend (controladores, servicios, entidades)
│   ├── .env.example      # Ejemplo de variables de entorno
│   └── ...
├── client/               # Código del cliente (Next.js)
│   ├── src/              # Páginas y componentes de Next.js
│   ├── .env.example      # Ejemplo de variables de entorno
│   └── ...
└── README.md             # Documentación del proyecto
```
## 📦 Instalación y Uso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/DarlinMunoz/tech-liquor-store.git
cd tech-liquor-store
```

### 2️⃣ Configurar variables de entorno

Crea un archivo .env en server/ y client/ siguiendo el formato de .env.example.

### 3️⃣ Instalar dependencias

# Frontend
```bash
cd client
npm install
```

# Backend
```bash
cd ../server
npm install
```

### 4️⃣ Ejecutar el proyecto

# Frontend
```bash
npm run dev
```

# Backend
```bash
npm run dev
```

## 🛠 Autor

Darlin Muñoz – DevCoreX


---

💡 Este proyecto forma parte de un e-commerce para licorerías, buscando ofrecer una experiencia de compra rápida, segura y moderna.
