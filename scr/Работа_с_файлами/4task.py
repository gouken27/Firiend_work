# Задание: найти длину самой длинной подцепочки без указанного пользователем символа

char = input("Введите символ (A-F): ").upper()

max_len = 0
current_len = 0

with open(r"scr\Работа_с_файлами\txt_файлы\112_k7a-4.txt", encoding="utf8") as f:
    text = f.read()

for c in text:
    if c == char:
        if current_len > max_len:
            max_len = current_len
        current_len = 0
    else:
        current_len += 1

if current_len > max_len:
    max_len = current_len

print(f"Максимальная длина подцепочки без '{char}': {max_len}")