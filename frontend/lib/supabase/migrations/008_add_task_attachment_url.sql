-- Add attachment_url column to tasks table
-- Run this in Supabase SQL Editor

-- Add attachment_url column to tasks table
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS attachment_url TEXT;

-- Note: No index needed for attachment_url as it's not typically queried
