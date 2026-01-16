const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mineia.com' },
    update: {},
    create: {
      email: 'admin@mineia.com',
      name: 'Admin MINEIA',
      password: hashedPassword,
    },
  });

  // Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Workspace de Demonstração',
      memberships: {
        create: {
          userId: admin.id,
          role: 'OWNER',
        },
      },
      settings: {
        create: {
          dryRun: true,
          geographyJson: ['São Paulo', 'Rio de Janeiro'],
          keywordsJson: ['único dono', 'urgente'],
        },
      },
      apiKeys: {
        create: {
          hashedKey: 'min_live_demo_123456',
          name: 'N8N Default Key',
        },
      },
    },
  });

  // Create some leads
  await prisma.lead.createMany({
    data: [
      {
        leadHash: 'ad_001',
        workspaceId: workspace.id,
        source: 'OLX',
        title: 'Toyota Corolla 2022',
        price: 120000,
        city: 'São Paulo',
        state: 'SP',
        status: 'P0',
        priority: 'P0',
        contactability: 'WHATSAPP_FOUND',
        contactValue: '11999999999',
      },
      {
        leadHash: 'ad_002',
        workspaceId: workspace.id,
        source: 'Webmotors',
        title: 'Honda Civic 2020',
        price: 95000,
        city: 'Rio de Janeiro',
        state: 'RJ',
        status: 'P1',
        priority: 'P1',
        contactability: 'PLATFORM_CHAT_ONLY',
      },
    ],
  });

  console.log('Seed concluído com sucesso!');
  console.log('Login: admin@mineia.com / Senha: admin123');
  console.log('API Key de demonstração: min_live_demo_123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
