# Задание: подсчитать сколько раз каждая буква встречается в тексте, используя словарь

text = input("Введите текст: ")

counts = {}

for char in text:
    counts.setdefault(char, 0)
    counts[char] += 1

for char, count in counts.items():
    print(f"Буква '{char}' встречается {count} раз")