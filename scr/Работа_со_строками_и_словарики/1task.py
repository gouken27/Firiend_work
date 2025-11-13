# Задание: подсчитать гласные, согласные и цифры в слове/фразе

text = input("Введите слово или фразу: ")

vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
consonants = "бвгджзйклмнпрстфхцчшщБВГДЖЗЙКЛМНПРСТФХЦЧШЩ"
digits = "0123456789"

v_count = 0
c_count = 0
d_count = 0

for char in text:
    if char in vowels:
        v_count += 1
    elif char in consonants:
        c_count += 1
    elif char in digits:
        d_count += 1

print(f"Гласных: {v_count}")
print(f"Согласных: {c_count}")
print(f"Цифр: {d_count}")