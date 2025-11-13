# Задание: запросить начальное значение и шаг, вывести первые 5 чисел с этим шагом

start = int(input("Введите начальное значение: "))
step = int(input("Введите шаг: "))

current = start
i = 0
while i < 5:
    print(f"i = {i} | {i+1} <= 4 == {i <= 4} | значение = {current}")
    current += step
    i += 1

print(f"цикл завершен \nМаксимальное значение i = {i}\n")

if i % 2 == 0:
    print(f"i = {i} четное")
else:
    print(f"i = {i} нечетное")