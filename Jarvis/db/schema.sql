CREATE TABLE IF NOT EXISTS keywords (
  id SERIAL PRIMARY KEY NOT NULL,
  word VARCHAR (100) NOT NULL,
  func VARCHAR(50),
  numCorrect INT DEFAULT 0,
  numTotal INT DEFAULT 0,
  errRate DECIMAL (5,2) DEFAULT 0,
  replacement VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS word_index ON keywords (word, func)

-- psql -d jarvis -a -f db/schema.sql