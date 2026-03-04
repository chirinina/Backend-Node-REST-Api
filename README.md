# REST API Node.js

---

## Requisitos

Antes de ejecutar el proyecto asegúrate de tener instalado:

* Node.js (v18 o superior recomendado)
* npm
* MySQL **o** PostgreSQL (según tu configuración)

Verificar versiones:

```bash
node -v
npm -v
```

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/efrainchirinina123/REPO.git
cd REPO
```

Instala las dependencias:

```bash
npm install
```

---

##  Configuración de Base de Datos (MySQL / PostgreSQL)

Este proyecto soporta **MySQL** o **PostgreSQL** mediante variables de entorno.

### 1. Crear archivo `.env`

En la raíz del proyecto:

```env
DB_DIALECT=mysql      # mysql o postgres
DB_HOST=localhost
DB_PORT=3306          # 3306 para MySQL | 5432 para PostgreSQL
DB_NAME=nombre_db
DB_USER=usuario
DB_PASSWORD=tu_password
```

### 🔹 Para PostgreSQL

Si usas PostgreSQL cambia:

```env
DB_DIALECT=postgres
DB_PORT=5432
```

---

### 2. Crear la base de datos

**MySQL**

```sql
CREATE DATABASE nombre_db;
```

**PostgreSQL**

```sql
CREATE DATABASE nombre_db;
```

---

## Ejecutar en modo desarrollo

```bash
npm run start:dev
```

El servidor iniciará normalmente en:

```
http://localhost:3010
```

---

## 🧪 Scripts disponibles

```bash
npm run start:dev   # Ejecuta en modo desarrollo
npm run start       # Ejecuta en producción (si existe)
npm run build       # Compila el proyecto (si aplica)
```

---

## 📁 Estructura básica

```
src/
 ├── index.js
 ├── routes/
 ├── models/
 └── config/
```

---

## 📌 Notas

* Asegúrate de configurar correctamente el archivo `.env`.
* Verifica que la base de datos esté activa antes de iniciar.
* Compatible con **MySQL** y **PostgreSQL**.

---

