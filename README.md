# Komanda Ryžys (Baseline estable)

He dejado el proyecto en una versión **estable y funcional** para retomar desde aquí.

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

## Estado actual

- UI base de la landing funcionando.
- Componentes principales activos: Hero, How it works, Features, AI visuals, Venues, Community, Leagues y Pricing.
- Ligas/Torneos como módulo completo: filtros por estado, listado de ligas, inscripción de equipos, clasificación, calendario y bracket.
- Sin automatismos extra ni scripts de reparación, para evitar complejidad y errores de merge.

## Próximo paso recomendado

A partir de esta base estable, podemos reintroducir funcionalidades de app (estado, bookings, eventos, Supabase) en pasos pequeños y validados.


## Troubleshooting

Si sólo ves la vista tipo app con tabs inferiores (Discover/Bookings/Community/Profile), estás en una versión antigua o con conflictos sin resolver en `src/App.jsx`.
Asegúrate de quedarte con la versión que renderiza todas las secciones de la landing (Hero, Leagues, Venues, Community, Pricing).


Si te sale un error tipo `Unexpected token` en `App.jsx` por imports mezclados tras un merge:

```bash
npm run fix:app
```


Si `npm install` falla (403 / proxy), revisa y limpia proxy:

```bash
npm config get registry
npm config delete proxy
npm config delete https-proxy
# en Windows PowerShell:
Remove-Item Env:http_proxy -ErrorAction SilentlyContinue
Remove-Item Env:https_proxy -ErrorAction SilentlyContinue

npm cache clean --force
npm install
```
