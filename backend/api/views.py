from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import openai
import random
import nltk

# Set up your OpenAI API key
openai.api_key = settings.OPENAI_KEY

# Download necessary NLTK data
nltk.download('averaged_perceptron_tagger')

# In-memory store for code mappings
code_mappings = {}

# List of example genres
genres = [
    "fantasy", "sci-fi", "romance", "thriller", "horror", "mystery", "drama",
    "action", "adventure", "comedy", "crime", "historical", "biography", "autobiography",
    "dystopian", "utopian", "magic", "occult", "paranormal", "post-apocalyptic",
    "steampunk", "cyberpunk", "epic", "mythology", "fairy tale", "fable", "legend",
    "urban", "western", "military", "political", "religious", "philosophical",
    "spiritual", "self-help", "guide", "manual", "handbook", "textbook",
    "reference", "encyclopedia", "dictionary", "atlas", "journal", "memoir",
    "satire", "tragedy", "comic", "travel"
]

# Function to check if the word is grammatically correct
def is_grammatically_correct(word):
    pos_tag = nltk.pos_tag([word])[0][1]
    return pos_tag in ['NN', 'NNS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'JJ', 'JJR', 'JJS', 'RB', 'RBR', 'RBS']

class EncodeView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code')
        code_mappings['code'] = code
        genre = request.data.get('genre', 'fantasy')  # default genre if none provided
        
        # Generate words based on genre using the OpenAI API
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # Use the latest GPT-3.5 model
                messages=[
                    {"role": "system", "content": f"Generate unique words for the genre {genre}."},
                    {"role": "user", "content": f"Generate unique words for the genre {genre}."}
                ],
                max_tokens=50,
                n=10,
                stop=None,
                temperature=0.7
            )
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        generated_texts = [choice['message']['content'] for choice in response['choices']]
        generated_words = set()
        
        for text in generated_texts:
            words = text.split()
            for word in words:
                # Filter grammatically correct words
                if is_grammatically_correct(word):
                    generated_words.add(word.lower())
                if len(generated_words) >= 10:
                    break
            if len(generated_words) >= 10:
                break

        if len(generated_words) < 10:
            return Response({'error': 'Not enough grammatically correct words generated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Convert the set to a list for sampling
        generated_words_list = list(generated_words)
        
        # Select 3 unique words from the generated list
        selected_words = random.sample(generated_words_list, 3)
        encoded = '-'.join(selected_words)
        
        # Store the mapping
        code_mappings[encoded] = code
        
        return Response({'encoded': encoded}, status=status.HTTP_200_OK)

class DecodeView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({'decoded': code_mappings.get('code')}, status=status.HTTP_200_OK)
