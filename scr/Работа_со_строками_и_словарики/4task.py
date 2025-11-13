# Задание: удалить из текста все гласные

text = input("Введите текст: ")

vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
result = ""

for char in text:
    if char not in vowels:
        result += char

print(result)