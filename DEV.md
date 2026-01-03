# 🛠️ Guía de Desarrollo Local

## ✅ Servidor Corriendo

El servidor está configurado para desarrollo local con **auto-reload** usando `nodemon`.

### 🚀 Iniciar el Servidor

```bash
npm run dev
```

Esto iniciará el servidor en modo desarrollo que se recarga automáticamente cuando haces cambios.

### 📍 URLs Locales

Una vez que el servidor esté corriendo, accede a:

- **Página Principal**: http://localhost:3000
- **Cliente (Mesa 1)**: http://localhost:3000/mesa?mesa=1
- **Cliente (Mesa 2)**: http://localhost:3000/mesa?mesa=2
- **Panel Admin**: http://localhost:3000/admin

### 🔄 Auto-Reload

Con `npm run dev`, el servidor se recarga automáticamente cuando:
- Modificas archivos `.js` (server.js, mesa.js, admin.js)
- Cambias archivos HTML o CSS
- Actualizas cualquier archivo del proyecto

**No necesitas reiniciar el servidor manualmente** - solo guarda los archivos y los cambios se aplicarán automáticamente.

### 🛑 Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo.

### 📝 Flujo de Trabajo

1. **Desarrolla localmente**: Haz cambios en los archivos
2. **Prueba en el navegador**: Los cambios se reflejan automáticamente
3. **Cuando estés listo**: Dime "subir a GitHub" y lo subo
4. **Render se actualiza**: Automáticamente si tienes auto-deploy activado

### ⚙️ Configuración

- **Puerto**: 3000 (por defecto)
- **Supabase**: Ya configurado con tus credenciales
- **Base de datos**: Asegúrate de haber ejecutado el SQL schema en Supabase

### 🐛 Troubleshooting

**El servidor no inicia:**
- Verifica que el puerto 3000 no esté en uso
- Revisa que las dependencias estén instaladas: `npm install`

**No veo los cambios:**
- Refresca el navegador (Ctrl+R o Cmd+R)
- Verifica la consola del navegador para errores (F12)

**Error de conexión a Supabase:**
- Verifica que las credenciales estén correctas en `server.js`
- Asegúrate de que las tablas existan en Supabase

### 📦 Comandos Útiles

```bash
# Iniciar servidor en desarrollo (auto-reload)
npm run dev

# Iniciar servidor en producción
npm start

# Ver logs del servidor
# Los logs aparecen en la terminal donde corre el servidor
```

---

**¡Listo para desarrollar!** 🎉

