import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableSequence


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

Create a detailed, structured {days}-day itinerary for {location}.

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
    print("\n=== LLaMA3 Travel Itinerary Generator ===\n")

    location = input("Enter location: ")
    days = input("Number of days: ")

    print("\nGenerating itinerary...\n")

    output = chain.invoke({
        "location": location,
        "days": days
    })

    print("=== Your Itinerary ===\n")
    print(output)
    print("\n=========================\n")

if __name__ == "__main__":
    main()
