-- Initialize schemas for each service
-- This script runs automatically when PostgreSQL container is first created

-- Schema for Backend (.NET API)
CREATE SCHEMA IF NOT EXISTS client;

-- Schema for Agent (Prisma)
CREATE SCHEMA IF NOT EXISTS agent;

-- Schema for Mastra memory
CREATE SCHEMA IF NOT EXISTS mastra;

-- Grant permissions
GRANT ALL ON SCHEMA client TO postgres;
GRANT ALL ON SCHEMA agent TO postgres;
GRANT ALL ON SCHEMA mastra TO postgres;
