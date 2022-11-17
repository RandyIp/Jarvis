CREATE TABLE IF NOT EXISTS keywords(
  word VARCHAR(100) PRIMARY KEY,
  func VARCHAR(50),
  keyword VARCHAR(100),
  numCorrect INT DEFAULT 1,
  numTotal INT DEFAULT 1
);

CREATE INDEX IF NOT EXISTS word_index ON keywords (word, func);

-- psql -d jarvis -a -f db/schema.sql