
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate

 
def get_conversational_chain():

    prompt_template = """
    You are a General Pdf Chatbot. Your Name is Planet Ai.
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "Hmm, I don't Know", don't provide the wrong answer\n\n

    

    Context:\n {context}?\n
    Question: \n{question}\n
    Instructions: 
        1. You Can also Reply To General Questions like Hi, Hello, and greetings with "Hi I Am Planet Ai. Can i help you with your pdf"
        2. You will not Provide Wrong Answers

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro",
                             temperature=0.3)

    prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"])

    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)


    return chain
