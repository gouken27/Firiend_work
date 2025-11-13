# Задание: Запросить у пользователя какое-нибудь слово или фразу. 
# Подсчитать количество гласных, согласных и цифр в слове.

phrase = input("Введите слово или фразу: ")

counts = {
    'гласные': 0,
    'согласные': 0,
    'цифры': 0
}

vowels = 'ауоыэяюёие'
consonants = 'бвгджзйклмнпрстфхцчшщ'

for char in phrase.lower():
    if char in vowels:
        counts['гласные'] += 1
    elif char in consonants:
        counts['согласные'] += 1
    elif char.isdigit():
        counts['цифры'] += 1

print(f"Гласных: {counts['гласные']}")
print(f"Согласных: {counts['согласные']}")
print(f"Цифр: {counts['цифры']}")