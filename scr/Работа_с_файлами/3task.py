# Задание: найти длину самой длинной подцепочки из одинаковых символов

with open(r"scr\Работа_с_файлами\txt_файлы\111_k8-91.txt", encoding="utf8") as f:
    text = f.read()

max_len = 1
current_len = 1

for i in range(1, len(text)):
    if text[i] == text[i - 1]:
        current_len += 1
    else:
        if current_len > max_len:
            max_len = current_len
        current_len = 1

print(f"Длина самой длинной подцепочки: {max_len}")