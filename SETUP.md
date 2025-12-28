# 🚀 Configuración Rápida

## ✅ Credenciales Configuradas

Las credenciales de Supabase ya están configuradas en el código. Solo necesitas:

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear las tablas en Supabase

**IMPORTANTE**: Debes ejecutar el script SQL en Supabase antes de usar la aplicación.

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/suwxhntjjuyvjuhhhupe
2. Ve a **SQL Editor** (en el menú lateral)
3. Abre el archivo `supabase-schema.sql` de este proyecto
4. Copia y pega todo el contenido en el editor SQL
5. Click en **Run** (o presiona Ctrl+Enter)

Esto creará:
- La tabla `menu_items` con datos de ejemplo
- La tabla `pedidos`
- Los índices necesarios
- Los triggers para actualizar timestamps

### 3. Iniciar el servidor

```bash
npm start
```

O en modo desarrollo (con auto-reload):

```bash
npm run dev
```

### 4. Acceder a la aplicación

- **Página principal**: http://localhost:3000
- **Cliente (Mesa 1)**: http://localhost:3000/mesa?mesa=1
- **Cliente (Mesa 2)**: http://localhost:3000/mesa?mesa=2
- **Panel Admin**: http://localhost:3000/admin

## 🎯 Próximos Pasos

1. ✅ Ejecuta el SQL schema en Supabase
2. ✅ Instala dependencias: `npm install`
3. ✅ Inicia el servidor: `npm start`
4. ✅ Prueba la aplicación localmente
5. 📱 Genera QR codes para cada mesa (apuntando a `/mesa?mesa=X`)
6. 🌐 Despliega en Render cuando estés listo (ver DEPLOY.md)

## 🔍 Verificar que Funciona

1. Abre http://localhost:3000/mesa?mesa=1
2. Deberías ver el menú con items de ejemplo
3. Agrega algunos items al carrito
4. Confirma el pedido
5. Abre http://localhost:3000/admin en otra pestaña
6. Deberías ver el pedido que acabas de crear

## ⚠️ Si algo no funciona

- **Error "Error cargando menú"**: Asegúrate de haber ejecutado el SQL schema
- **Error de conexión**: Verifica que el servidor esté corriendo en el puerto 3000
- **Pedidos no aparecen**: Revisa la consola del navegador (F12) para ver errores

¡Listo para usar! 🎉

