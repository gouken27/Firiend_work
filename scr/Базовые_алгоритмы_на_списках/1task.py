# Задание: создать список чисел, запросить число, вывести списки меньше и больше

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("Ваш список чисел:", numbers)

n = int(input("Введите число: "))

less = []
greater = []

for x in numbers:
    if x < n:
        less.append(x)
    elif x > n:
        greater.append(x)

print(f"Числа меньше {n}: {less}")
print(f"Числа больше {n}: {greater}")