import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableSequence

from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS


load_dotenv() 
groq_key = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    groq_api_key = groq_key,
    model="llama-3.3-70b-versatile", 
    temperature=0.7
)

prompt = PromptTemplate(
    input_variables=["location", "days"],
    template="""
You are an expert travel planner.

You are supposed to extract the location and number of days from the user input text.
Extract the location and number of days from the following text: {text}

Ignore any typing mistakes.

Create a detailed, structured itinerary for the extracted location for the extracted number of days.

Include:
- Day-wise plan
- Time slots for major activities
- Local food recommendations

Format as:
Day 1:
Day 2:
...
"""
)

chain = RunnableSequence(
   prompt | llm | StrOutputParser()
)

def main():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)

    class Itinerary(Resource):
        def post(self):
            data = request.get_json()     # Read JSON body
            text = data.get("text")

            output = chain.invoke({
                "text": text
            })
            
            return {"itinerary": output}, 200
        
    api.add_resource(Itinerary, "/itinerary")

    app.run(debug=True)
        

if __name__ == "__main__":
    main()
