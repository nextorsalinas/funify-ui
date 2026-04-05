---
name: product-strategist
description: Estrategia de negocio, modelo de monetización y visión de producto para Funifay Marketplace. Ayuda a alinear las decisiones técnicas con los objetivos de ingresos.
---

# Skill: Estrategia de Producto y Negocio (Funifay) 💎📈

Define el "Por Qué" y el "Cómo" genera valor Funifay. Esta skill debe ser consultada antes de implementar cualquier lógica de pagos, suscripciones o límites de inventario.

---

## 🎯 Público Objetivo (Target Audience)

1. **Clientes Consumidores:** Padres y abuelos que buscan organizar celebraciones para niños (cumpleaños, bautizos, etc.).
   - *Foco UX:* Seguridad, facilidad de uso, confianza en los proveedores.
2. **Proveedores de Servicios:** Agencias, animadores, decoradores y vendedores de productos para eventos.

---

## 💰 Modelo de Monetización (Freemium) 🕵️‍♂️✨🏗️🦾

Funifay opera bajo una estructura de dos niveles para los proveedores:

### 🏚️ Nivel: FREE (Gratis)
- **Límite de Inventario:** Máximo **10 productos o servicios** activos en la "marquesina" del marketplace.
- **Modelo de Comisión:**
  - Se cobra un **10% del total como "Anticipo o Reserva"**. ✨🏗️🦾
  - Este dinero **se queda en la plataforma** (Funifay).
  - El **90% restante** se paga directamente al proveedor a contraentrega (offline).
- *Objetivo Técnico:* Implementar contador de productos y cálculo automático de reserva en el Checkout.

### 💎 Nivel: PREMIUM (Suscripción Mensual)
- **Costo:** Pago recurrente mensual (Suscripción).
- **Inventario:** **Ilimitado**. 🕵️‍♂️✨🏗️🎬
- **Modelo de Pagos:**
  - Sin comisión de reserva (o reserva directa al proveedor).
  - Pago 100% contraentrega u otros acuerdos directos.
- *Objetivo Técnico:* Integrar control de suscripción (Stripe/PayPal) y desactivar comisiones para estos usuarios.

---

## 🏗️ Lógica de Transacción (Checkout Flow)

1. **Reserva (App):** El cliente paga el 10% en Funifay. Se genera un "Recibo de Reserva".
2. **Saldo (Offline):** El cliente paga el resto al proveedor el día del evento.
3. **Estado de Orden:**
   - `Reservado`: Pago del 10% exitoso.
   - `Completado`: Tras la entrega del servicio por parte del proveedor.

---

## 💡 Reglas de Oro para el Desarrollo
- **Confianza:** El proceso de reserva debe ser clarísimo para los abuelos; usar lenguaje sencillo. ✨🏗️🦾
- **Incentivo:** Promover la suscripción Premium a los proveedores que alcancen los 10 productos gratuitos.
- **Flexibilidad:** Aunque el foco son niños, la arquitectura debe permitir cualquier otra ocasión (baby showers, 15 años, etc.).

---
**Funifay: Creando momentos felices, construyendo un negocio sólido. 🥂🥣🦾**
