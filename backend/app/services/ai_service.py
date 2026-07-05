import os
import json

from groq import Groq
from dotenv import load_dotenv

load_dotenv()


class AIService:

    def __init__(self):

        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

        self.model = os.getenv("GROQ_MODEL")

    def build_prompt(
        self,
        classification,
        confidence,
        persona,
        features,
        evidence,
        recommendations
    ):

        return f"""
    You are a Senior Ecommerce Business Analyst.

    A deterministic rule engine has already classified the shopper.

    IMPORTANT

    - Never change the classification.
    - Do NOT question the rule engine.
    - Your role is to explain the business implications.
    - Help the ecommerce marketing team decide what to do next.
    - Use the provided evidence, recommendations and behavioural features.
    - Respond ONLY with valid JSON.
    - Do not include markdown.
    - Keep every field under 80 words.

    Classification:
    {classification}

    Confidence:
    {confidence}

    Persona:
    {persona}

    Evidence:
    {evidence}

    Existing Recommendations:
    {recommendations}

    Behaviour Features:
    {json.dumps(features, indent=2)}

    Return ONLY this JSON:

    {{
        "customer_summary":"",
        "business_impact":"",
        "marketing_strategy":"",
        "next_best_action":"",
        "conversion_probability":"",
        "risk_level":""
    }}
    """

    def generate_insight(self, request):

        prompt = self.build_prompt(
            request.classification,
            request.confidence,
            request.persona,
            
            request.features,
            request.evidence,
            request.recommendations
        )

        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert Ecommerce Personalization Analyst."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
            response_format={"type": "json_object"}
        )

        response = completion.choices[0].message.content

        return json.loads(response)