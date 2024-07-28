# backend/api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from transformers import pipeline
import random
import string
import nltk

# Download necessary NLTK data
nltk.download('averaged_perceptron_tagger')

# Initialize the text generation pipeline
generator = pipeline('text-generation', model='gpt2')

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
        genre = request.data.get('genre', 'default_genre')
        
        # Generate words based on genre using the Hugging Face model
        generated_texts = generator(genre, max_length=5, num_return_sequences=100)
        generated_words = []
        for text in generated_texts:
            words = text['generated_text'].split()
            for word in words:
                # Filter grammatically correct words
                if is_grammatically_correct(word) and len(generated_words) < 10:
                    generated_words.append(word)

        if len(generated_words) < 10:
            return Response({'error': 'Not enough grammatically correct words generated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Simple encoding logic (replace with your encoding algorithm)
        encoded = '-'.join(random.sample(generated_words, 3))
        
        return Response({'encoded': encoded}, status=status.HTTP_200_OK)

class DecodeView(APIView):
    def post(self, request, *args, **kwargs):
        encoded = request.data.get('encoded')
        
        # Simple decoding logic (replace with your decoding algorithm)
        decoded = 'decoded_string'
        
        return Response({'decoded': decoded}, status=status.HTTP_200_OK)
