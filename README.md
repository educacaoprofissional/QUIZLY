# QUIZLY

Aplicação web educacional desenvolvida como projeto multidisciplinar. O protótipo apresenta uma experiência gamificada de preparação para vestibulares, com fases de interpretação de texto, gramática, figuras de linguagem, literatura e simulado.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## Executar no GitHub Codespaces

O projeto já possui configuração em `.devcontainer` para Node.js 22 e encaminhamento da porta 5173.

```bash
npm start
```

Se as dependências ainda não estiverem instaladas:

```bash
npm install
npm start
```

Depois abra a porta **5173** em **PORTS / PORTAS**.

## Build

```bash
npm run build
```

O Vite está configurado com caminhos relativos (`base: './'`) para facilitar uma futura publicação no GitHub Pages.
