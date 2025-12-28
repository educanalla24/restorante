# 🍽️ Sistema de Pedidos para Restaurante

Sistema de pedidos para restaurante donde los clientes pueden ordenar comida escaneando un código QR en su mesa. Los pedidos aparecen en tiempo real en el panel del administrador.

## ✨ Características

- 📱 **Sin login necesario**: Los clientes acceden directamente escaneando el QR de su mesa
- 🍽️ **Menú interactivo**: Los clientes pueden ver el menú y agregar items a su carrito
- 🛒 **Carrito de compras**: Gestión de cantidad y totales en tiempo real
- 📋 **Panel de administración**: El dueño puede ver todos los pedidos y cambiar su estado
- 🔄 **Actualización en tiempo real**: Los pedidos se actualizan automáticamente cada 5 segundos
- 📊 **Filtros por estado**: Filtra pedidos por pendiente, preparando, listo, entregado

## 🚀 Instalación Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a SQL Editor y ejecuta el siguiente script:

```sql
-- Tabla de items del menú
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    mesa_id VARCHAR(50) NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    notas TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_pedidos_mesa ON pedidos(mesa_id);
CREATE INDEX idx_pedidos_created ON pedidos(created_at DESC);
CREATE INDEX idx_menu_activo ON menu_items(activo);
```

4. Inserta algunos items de ejemplo en el menú:

```sql
INSERT INTO menu_items (nombre, descripcion, precio, categoria) VALUES
('Hamburguesa Clásica', 'Carne, lechuga, tomate, cebolla', 12.99, 'Platos Principales'),
('Pizza Margarita', 'Queso mozzarella y tomate', 15.99, 'Platos Principales'),
('Ensalada César', 'Lechuga, pollo, crutones, aderezo césar', 10.99, 'Ensaladas'),
('Coca Cola', 'Refresco 500ml', 2.99, 'Bebidas'),
('Agua Mineral', 'Agua 500ml', 1.99, 'Bebidas'),
('Tarta de Chocolate', 'Postre de chocolate con crema', 6.99, 'Postres');
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
PORT=3000
NODE_ENV=development
```

**Nota**: Puedes encontrar estas credenciales en tu proyecto de Supabase:
- Ve a Settings → API
- `SUPABASE_URL` es el "Project URL"
- `SUPABASE_SERVICE_ROLE_KEY` es el "service_role" key (secreto)

### 4. Iniciar el servidor

```bash
npm start
```

O en modo desarrollo (con auto-reload):

```bash
npm run dev
```

### 5. Acceder a la aplicación

- **Página principal**: http://localhost:3000
- **Cliente (Mesa 1)**: http://localhost:3000/mesa?mesa=1
- **Panel Admin**: http://localhost:3000/admin

## 📱 Uso

### Para Clientes

1. Escanea el código QR en tu mesa (o accede directamente a `/mesa?mesa=X` donde X es el número de mesa)
2. Explora el menú y agrega items a tu carrito
3. Ajusta las cantidades si es necesario
4. Agrega notas especiales si las tienes
5. Confirma tu pedido

### Para Administradores

1. Accede a `/admin`
2. Ve todos los pedidos en tiempo real
3. Filtra por estado si lo necesitas
4. Cambia el estado de los pedidos:
   - **Pendiente** → **Preparando**: Cuando empiezas a preparar el pedido
   - **Preparando** → **Listo**: Cuando el pedido está listo para entregar
   - **Listo** → **Entregado**: Cuando entregas el pedido al cliente
   - **Cancelar**: Para cancelar un pedido

## 🌐 Despliegue en Render

Ver el archivo `DEPLOY.md` para instrucciones detalladas.

## 📋 Estructura del Proyecto

```
restorante/
├── server.js              # Servidor Express con rutas API
├── package.json           # Dependencias del proyecto
├── public/
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos globales
│   ├── mesa/
│   │   ├── index.html     # Página del cliente
│   │   └── mesa.js        # Lógica del cliente
│   └── admin/
│       ├── index.html     # Panel de administración
│       └── admin.js        # Lógica del admin
└── README.md              # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Base de Datos**: Supabase (PostgreSQL)
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Deployment**: Render (configurado)

## 📝 Notas

- Los pedidos se actualizan automáticamente cada 5 segundos en el panel de admin
- No hay autenticación: cualquiera puede acceder a cualquier mesa o al panel admin
- Para producción, considera agregar autenticación y permisos
- Los QR codes deben apuntar a `/mesa?mesa=X` donde X es el número de mesa

## 🐛 Solución de Problemas

### Error: "Supabase no configurado"
- Verifica que las variables de entorno `SUPABASE_URL` y `SUPABASE_KEY` estén configuradas
- Asegúrate de usar el `service_role` key, no el `anon` key

### Error: "Error cargando menú"
- Verifica que la tabla `menu_items` exista en Supabase
- Asegúrate de que haya al menos un item con `activo = true`

### Los pedidos no aparecen
- Verifica que la tabla `pedidos` exista
- Revisa la consola del navegador para errores
- Verifica que el servidor esté corriendo

## 📄 Licencia

ISC
