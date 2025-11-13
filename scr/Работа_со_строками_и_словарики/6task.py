text = """У лукоморья дуб зелёный;
Златая цепь на дубе том:
И днём и ночью кот учёный
Всё ходит по цепи кругом;
"""

# Разбиваем текст на строки
lines = text.split('\n')

# Находим строку с максимальным количеством слов
max_words_line = max(lines, key=lambda line: len(line.split()))

print(f"Строка с наибольшим количеством слов: '{max_words_line}'")
print(f"Количество слов: {len(max_words_line.split())}")