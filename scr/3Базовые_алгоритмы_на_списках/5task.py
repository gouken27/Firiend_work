# Задание: найти наименьший элемент кратный 5, если нет — сообщить

numbers = list(map(int, input("Введите последовательность чисел: ").split()))

multiples_of_5 = [x for x in numbers if x % 5 == 0]

if multiples_of_5:
    print(f"Наименьший элемент, кратный 5: {min(multiples_of_5)}")
else:
    print("В последовательности нет элементов, кратных 5")