from collections import Counter

# Получаем текст от пользователя
print("Введите текст (для завершения ввода введите пустую строку):")
text_lines = []
while True:
    line = input()
    if line == "":
        break
    text_lines.append(line)

# Обрабатываем каждую строку
for i, line in enumerate(text_lines, 1):
    if line.strip():  # Проверяем, что строка не пустая
        # Считаем буквы (игнорируем пробелы и знаки препинания)
        letters_only = [char.lower() for char in line if char.isalpha()]
        
        if letters_only:
            # Используем Counter для подсчета
            counter = Counter(letters_only)
            # Находим букву с максимальным количеством вхождений
            most_common_letter, count = counter.most_common(1)[0]
            
            print(f"Строка {i}: '{line}'")
            print(f"  Наиболее частая буква: '{most_common_letter}' (встречается {count} раз)")
        else:
            print(f"Строка {i}: '{line}'")
            print(f"  В строке нет букв")
    else:
        print(f"Строка {i}: пустая")
    print()