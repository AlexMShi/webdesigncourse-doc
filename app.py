
from fastapi import FastAPI
import random

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/price/{item_id}")
def house_price(item_id: int):
    return {"item_id": item_id, "price": random.randint(100000,500000)}

from pydantic import BaseModel #pydantic can create classes and they are for data validation

class House(BaseModel):
    bedrooms :int
    bathrooms: int
    sqmt_living : int

class Prediction(BaseModel):
    price : float

@app.post("/predict")
def house_price2(house: House)->Prediction:
    return Prediction(
        price=house.bedrooms * 50000 +
        house.bathrooms * 30000 +
        house.sqmt_living * 2000
    )