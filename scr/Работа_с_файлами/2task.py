# Задание: найти количество строк, где буква S встречается столько же раз, сколько X

with open(r"scr\Работа_с_файлами\txt_файлы\109_text2.txt", encoding="utf8") as f:
    lines = f.readlines()

count = 0

for line in lines:
    s_count = line.count('S')
    x_count = line.count('X')
    if s_count == x_count:
        count += 1

print(f"Количество строк, где S и X встречаются одинаково: {count}")