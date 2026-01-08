# check_database.py
import sqlite3
from datetime import datetime

def check_database():
    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        
        c.execute("SELECT COUNT(*) FROM users")
        total = c.fetchone()[0]
        
        print("\n" + "=" * 70)
        print(f"📊 DATABASE REPORT: users.db")
        print("=" * 70)
        print(f"👥 Total Registered Users: {total}\n")
        
        if total > 0:
            c.execute("SELECT id, name, email, created_at FROM users ORDER BY id")
            users = c.fetchall()
            
            print(f"{'ID':<5} {'Name':<25} {'Email':<30} {'Registration Date':<20}")
            print("-" * 80)
            
            for user in users:
                user_id = user[0]
                name = user[1]
                email = user[2]
                created = user[3] if user[3] else 'N/A'
                print(f"{user_id:<5} {name:<25} {email:<30} {created:<20}")
        else:
            print("❌ No users found in the database. Try signing up a new user first!")
        
        conn.close()
        print("\n" + "=" * 70)
        
    except sqlite3.OperationalError:
        print("❌ ERROR: The 'users' table does not exist. Make sure you have run 'app.py' at least once to create it.")
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

if __name__ == "__main__":
    check_database()