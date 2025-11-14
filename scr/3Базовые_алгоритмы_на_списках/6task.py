# Задание: найти наибольшую цифру числа без использования строк

n = int(input("Введите число: "))
max_digit = 0
temp = abs(n)

while temp > 0:
    digit = temp % 10
    if digit > max_digit:
        max_digit = digit
    temp //= 10

print(f"Наибольшая цифра в числе {n}: {max_digit}")