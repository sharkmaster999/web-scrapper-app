CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT,
  summary TEXT,
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);
