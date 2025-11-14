# Задание: частотный анализ — % каждой буквы

with open(r"scr\Работа_с_файлами\txt_файлы\102_text.txt", encoding="utf8") as f:
    text = f.read()

letters = [c.upper() for c in text if c.isalpha()]
total = len(letters) or print("Нет букв.") or exit()

for c in sorted(set(letters)):
    print(f"{c}: {letters.count(c) / total * 100:.2f}%")