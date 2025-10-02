# driver-soon

A NestJS (v10) TypeScript application.

## Quick start

```bash
npm install
npm run start:dev
```

## Scripts

- **build**: `npm run build`
- **start (dev/prod)**: `npm run start`, `npm run start:dev`, `npm run start:prod`
- **lint & format**: `npm run lint`, `npm run format`
- **tests**: `npm run test`, `npm run test:e2e`, `npm run test:cov`

## Project structure

- `src/`: application modules, services, and utilities
- `scripts/`: helper scripts (e.g., webhook utilities)
- `test/`: tests and Jest configuration

## Environment

Create a `.env` file at the project root if needed and supply any required keys for your environment. The app uses `@nestjs/config` for configuration.

## Requirements

- Node.js 18+ and npm

## Useful links

- NestJS docs: `https://docs.nestjs.com`

## License

UNLICENSED