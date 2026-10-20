from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Order(Base):
    __tablename__ = "orders"

    id       = Column(Integer, primary_key=True, index=True)
    client   = Column(String, nullable=False)
    garment  = Column(String, nullable=False)
    status   = Column(String, nullable=False)
    due_date = Column(String, nullable=False)

class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    first_name    = Column(String, nullable=False)
    last_name     = Column(String, nullable=False)
    age           = Column(Integer, nullable=False)
    mobile_number = Column(String, nullable=False)
    created_at    = Column(DateTime(timezone=True), server_default=func.now())
    updated_at    = Column(DateTime(timezone=True), onupdate=func.now())
