CREATE TYPE web.company_link_type AS ENUM ('nomination system', 'product specifications', 'tariffs', 'terminal operations');

CREATE TABLE web.company_links (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) NOT NULL,
  type web.company_link_type NOT NULL,
  url VARCHAR NOT NULL
);
