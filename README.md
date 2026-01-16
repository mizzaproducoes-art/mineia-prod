# MINEIA v1 - Lead Operations SaaS

MINEIA é uma plataforma multi-tenant para operação inteligente de leads, com integração nativa para n8n e foco em conformidade LGPD.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **NextAuth** (Google + Credentials)
- **Postgres**

## Setup Local

1. **Instalar Dependências**
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente**
   Copie o `.env.example` para `.env` e preencha as chaves:
   ```bash
   cp .env.example .env
   ```

3. **Subir Banco de Dados (Docker)**
   ```bash
   docker-compose up -d
   ```

4. **Migrations e Client Prisma**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Iniciar em Desenvolvimento**
   ```bash
   npm run dev
   ```

## Estrutura Multi-tenant
- Toda entidade possui `workspaceId`.
- Autenticação vincula o usuário ao seu Workspace.
- API Keys são limitadas ao escopo do Workspace.

## Regras LGPD
- **Templates**: Validam a palavra "PARAR" obrigatoriamente.
- **DNC List**: Bloqueia ações em leads cujos contatos estejam na lista de exclusão.
- **Logs**: Todas as ações críticas geram `LeadEvent`.

## APIs para n8n
- `POST /api/v1/leads/ingest`: Recebe array de leads.
- `POST /api/v1/leads/{id}/score`: Atualiza inteligência do lead.
- *Auth via Bearer Token (API Key do Workspace).*

## Licença
Privado - MINEIA Corp.
