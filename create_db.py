# create_db.py
import sqlite3

print("Creating database...")

conn = sqlite3.connect('users.db')
c = conn.cursor()

# Create users table
c.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')

conn.commit()
print("✅ Database table created successfully!")

# Check if it worked
c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
if c.fetchone():
    print("✅ Users table exists!")
else:
    print("❌ Failed to create table")

conn.close()