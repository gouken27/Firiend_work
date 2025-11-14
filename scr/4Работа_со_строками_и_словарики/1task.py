# Задание: Подсчитать количество гласных, согласных и цифр в слове.

phrase = input("Введите слово или фразу: ")

vowels = 0
consonants = 0
digits = 0

for char in phrase.lower():
    if char in 'ауоыэяюёие':
        vowels += 1
    elif char in 'бвгджзйклмнпрстфхцчшщ':
        consonants += 1
    elif char.isdigit():
        digits += 1

print(f"Гласных: {vowels}")
print(f"Согласных: {consonants}")
print(f"Цифр: {digits}")