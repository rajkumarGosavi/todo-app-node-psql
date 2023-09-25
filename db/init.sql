CREATE DATABASE IF NOT EXISTS todo;    

\c todo;        

CREATE TABLE tasks(
"task_id" SERIAL PRIMARY KEY,
"title" TEXT NOT NULL,
"description" TEXT,
"status" VARCHAR(30) NOT NULL DEFAULT 'open',
"is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
"created_at" TIMESTAMP NOT NULL,
"updated_at" TIMESTAMP NOT NULL
);    
