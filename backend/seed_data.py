import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, Base
from models.professional import Professional
from models.user import User

def seed_database():
    db = SessionLocal()
    
    try:
        existing_pros = db.query(Professional).count()
        
        if existing_pros == 0:
            print("Seeding professionals...")
            professionals = [
                Professional(
                    name="Dr. Sarah Johnson",
                    specialization="Anxiety and Stress Management",
                    bio="Licensed therapist with 10+ years experience in cognitive behavioral therapy and stress reduction techniques.",
                    rate=120.00
                ),
                Professional(
                    name="Dr. Michael Chen",
                    specialization="Workplace Stress Counselor",
                    bio="Specializes in work-related stress, burnout prevention, and career counseling.",
                    rate=100.00
                ),
                Professional(
                    name="Dr. Emily Rodriguez",
                    specialization="Relationship and Family Therapy",
                    bio="Expert in interpersonal relationships, family dynamics, and communication skills.",
                    rate=110.00
                ),
                Professional(
                    name="Dr. James Wilson",
                    specialization="Financial Stress Counselor",
                    bio="Helps individuals cope with financial anxiety and develop healthy money mindsets.",
                    rate=95.00
                ),
                Professional(
                    name="Dr. Lisa Martinez",
                    specialization="Mindfulness and Meditation",
                    bio="Certified mindfulness instructor focusing on meditation, breathing exercises, and holistic wellness.",
                    rate=90.00
                )
            ]
            
            for pro in professionals:
                db.add(pro)
            
            db.commit()
            print(f"Added {len(professionals)} professionals to the database.")
        else:
            print(f"Database already has {existing_pros} professionals. Skipping seed.")
        
        print("Seed data complete!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
