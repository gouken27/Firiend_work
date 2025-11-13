# Задание: найти наибольший элемент и его позицию в списке

numbers = list(map(int, input("Введите последовательность чисел: ").split()))
print(f"Наибольший элемент в последовательности {numbers} это {max(numbers)}, его номер {numbers.index(max(numbers)) + 1}")