# Задание: Удалить из текста все гласные

vowels = 'аеёиоуыэюя'

text = "варкалось, хливкие шорьки пырялись по наве"

result = ''
for char in text:
    if char.lower() not in vowels:
        result += char

print(result)