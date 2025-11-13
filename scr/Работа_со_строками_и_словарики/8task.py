def transform_text(text):
    words = text.split()
    result = []
    
    for word in words:
        length = len(word)
        if length >= 3:  # только для слов из 3+ букв
            result.append(str(length) * length)
        else:
            result.append(word)  # короткие слова оставляем как есть
    
    return ' '.join(result)

# Пример использования
print("введите текст:")
text =  input()
print(transform_text(text))