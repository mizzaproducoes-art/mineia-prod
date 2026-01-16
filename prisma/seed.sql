-- Seed SQL for MINEIA v1
-- Admin User (Password: admin123, hashed)
INSERT INTO "User" (id, email, name, password, "createdAt", "updatedAt") 
VALUES ('user_admin_001', 'admin@mineia.com', 'Admin MINEIA', '$2b$10$7f8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Workspace
INSERT INTO "Workspace" (id, name, "createdAt", "updatedAt") 
VALUES ('ws_demo_001', 'Workspace de Demonstração', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Membership
INSERT INTO "Membership" (id, "userId", "workspaceId", role) 
VALUES ('mem_001', 'user_admin_001', 'ws_demo_001', 'OWNER')
ON CONFLICT (id) DO NOTHING;

-- Settings
INSERT INTO "WorkspaceSettings" (id, "workspaceId", "dryRun", "geographyJson", "keywordsJson") 
VALUES ('set_001', 'ws_demo_001', true, '["São Paulo", "Rio de Janeiro"]', '["único dono", "urgente"]')
ON CONFLICT (id) DO NOTHING;

-- API Key
INSERT INTO "WorkspaceApiKey" (id, "workspaceId", "hashedKey", name, "createdAt") 
VALUES ('key_001', 'ws_demo_001', 'min_live_demo_123456', 'N8N Default Key', NOW())
ON CONFLICT (id) DO NOTHING;

-- Leads
INSERT INTO "Lead" (id, "leadHash", "workspaceId", source, title, price, city, state, status, priority, contactability, "contactValue", "createdAt", "updatedAt") 
VALUES 
('lead_001', 'ad_001', 'ws_demo_001', 'OLX', 'Toyota Corolla 2022', 120000, 'São Paulo', 'SP', 'P0', 'P0', 'WHATSAPP_FOUND', '11999999999', NOW(), NOW()),
('lead_002', 'ad_002', 'ws_demo_001', 'Webmotors', 'Honda Civic 2020', 95000, 'Rio de Janeiro', 'RJ', 'P1', 'P1', 'PLATFORM_CHAT_ONLY', NULL, NOW(), NOW())
ON CONFLICT ("workspaceId", "leadHash") DO NOTHING;
