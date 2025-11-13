text = "варкалось, хливкие шорьки пырялись по наве"

words = text.split()
result_words = []

for word in words:
    # Убираем знаки препинания для подсчета букв
    clean_word = ''.join(char for char in word if char.isalpha())
    
    replacement = str(len(clean_word)) * len(clean_word)
    
    result_words.append(replacement)

result = ' '.join(result_words)
print(result)