# Задание: подсчитать гласные, согласные и цифры в слове/фразе, используя словарь и setdefault

text = input("Введите слово или фразу: ")

counts = {}

vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
consonants = "бвгджзйклмнпрстфхцчшщБВГДЖЗЙКЛМНПРСТФХЦЧШЩ"
digits = "0123456789"

for char in text:
    if char in vowels:
        counts.setdefault("гласные", 0)
        counts["гласные"] += 1
    elif char in consonants:
        counts.setdefault("согласные", 0)
        counts["согласные"] += 1
    elif char in digits:
        counts.setdefault("цифры", 0)
        counts["цифры"] += 1

print(f"Гласных: {counts.get('гласные', 0)}")
print(f"Согласных: {counts.get('согласные', 0)}")
print(f"Цифр: {counts.get('цифры', 0)}")