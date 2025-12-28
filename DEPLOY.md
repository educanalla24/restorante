# 🚀 Desplegar en Render - Guía Rápida

## Pasos Rápidos

### 1. Sube tu código a GitHub/GitLab/Bitbucket

```bash
git add .
git commit -m "Sistema de pedidos para restaurante"
git push
```

### 2. En Render.com

1. Ve a https://dashboard.render.com
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio
4. Configura:
   - **Name**: `restorante-pedidos` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (o el plan que prefieras)

### 3. Variables de Entorno

En la sección **Environment**, agrega:

- **SUPABASE_URL**: Tu URL de Supabase (ej: `https://xxxxx.supabase.co`)
- **SUPABASE_SERVICE_ROLE_KEY**: Tu service_role key de Supabase
- **NODE_ENV**: `production`
- **PORT**: Render lo configura automáticamente, pero puedes dejarlo vacío

**⚠️ Importante**: Usa el `service_role` key, NO el `anon` key. El service_role key tiene permisos completos y bypassa RLS (Row Level Security).

### 4. Crear Tablas en Supabase

Antes de hacer el deploy, asegúrate de que las tablas estén creadas en Supabase:

1. Ve a tu proyecto en Supabase
2. Ve a **SQL Editor**
3. Ejecuta el script SQL del README.md para crear las tablas

### 5. Deploy

Click en **"Create Web Service"** y espera a que termine el build y deploy.

## ⚠️ Importante

- Render proporciona HTTPS automáticamente
- El servicio gratuito se "duerme" después de 15 minutos de inactividad
- Para producción, considera usar un plan de pago para evitar el "sleep"
- Las variables de entorno son seguras y no se exponen al cliente

## 📱 URL

Tu app estará en: `https://restorante-pedidos.onrender.com` (o el nombre que hayas elegido)

### URLs importantes:

- **Principal**: `https://tu-app.onrender.com`
- **Cliente (Mesa 1)**: `https://tu-app.onrender.com/mesa?mesa=1`
- **Admin**: `https://tu-app.onrender.com/admin`

## 🔗 Generar QR Codes para las Mesas

Puedes usar cualquier generador de QR online o crear los QR codes con el siguiente formato:

- URL para Mesa 1: `https://tu-app.onrender.com/mesa?mesa=1`
- URL para Mesa 2: `https://tu-app.onrender.com/mesa?mesa=2`
- etc.

Recomendaciones:
- Usa un servicio como [QR Code Generator](https://www.qr-code-generator.com/)
- Imprime los QR codes y pégalos en cada mesa
- Asegúrate de que los QR codes sean lo suficientemente grandes para escanear fácilmente

## 📝 Notas Adicionales

- El primer deploy puede tardar varios minutos
- Si hay errores, revisa los logs en Render Dashboard
- Los cambios en el código requieren un nuevo deploy (automático si tienes auto-deploy activado)

¡Listo! 🎉
