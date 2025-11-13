# Задание: Используя словарик подсчитать сколько раз каждая буква встречается в тексте

text = input("Введите текст: ")

letter_count = {}

for char in text:
    if char.isalpha():
        char_lower = char.lower()
        if char_lower in letter_count:
            letter_count[char_lower] += 1
        else:
            letter_count[char_lower] = 1

for letter, count in letter_count.items():
    print(f"{letter}: {count}")