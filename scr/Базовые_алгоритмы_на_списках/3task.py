# Задание: запросить последовательность чисел, вычислить произведение четных ненулевых элементов

numbers = list(map(int, input("Введите последовательность чисел: ").split()))
print(f"Исходный массив {numbers}")

product = 1
even_nonzero = []

for x in numbers:
    if x != 0 and x % 2 == 0:
        even_nonzero.append(x)
        product *= x

print(f"Список четных не нулевых элементов {even_nonzero}")
print(f"Их произведение равно {product}")