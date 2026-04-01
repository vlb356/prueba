# Komanda Ryžys (Functional app-style landing)

Estado actual: versión funcional con secciones conectadas y acciones interactivas reales.

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Qué funciona ahora

- Hero con botones funcionales (`Start free trial`, `Watch demo`) que hacen scroll a secciones.
- Venues con búsqueda y botón de reserva.
- Bookings list actualizada en tiempo real al reservar.
- Community con join de eventos.
- Leagues/Tournaments con:
  - filtros por estado,
  - creación de torneo,
  - registro de equipo,
  - fixtures (toggle played),
  - standings y bracket,
  - persistencia localStorage.
- Pricing con selección de plan.
- CTA final con formulario funcional + feedback por toast.

## Troubleshooting

Si tras un merge te aparecen imports en mitad de `src/App.jsx`:

```bash
npm run fix:app
```
