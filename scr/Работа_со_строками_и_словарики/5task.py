# Задание: найти самое популярное слово в тексте с использованием регулярных выражений

import re

text = input("Введите текст: ")

words = re.split(r'\W+', text)
words = [word for word in words if word]  # убираем пустые строки

counts = {}

for word in words:
    counts.setdefault(word, 0)
    counts[word] += 1

if counts:
    most_popular = list(counts.keys())[0]
    for word in counts:
        if counts[word] > counts[most_popular]:
            most_popular = word
    print(f"Самое популярное слово: '{most_popular}' (встречается {counts[most_popular]} раз)")