# Задание: Добавть Scale для управления положением солнца на форме

import tkinter as tk
from tkinter import*

root = tk.Tk()
root.title("Я приложение =)")

# Создаём Canvas
c = tk.Canvas(root, width=900, height=400, bg="#f4d9a7")
c.pack()

def draw_object(x, y):
    # Парус — два треугольника
    c.create_polygon(225 + x, 295 + y, 195 + x, 210 + y, 270 + x, 160 + y, fill="#f67824")
    c.create_polygon(195 + x, 205 + y, 270 + x, 155 + y, 225 + x, 70 + y, fill="#62b999")

    # Детали на лодке
    c.create_polygon(125 + x, 350 + y, 125 + x, 300 + y, 75 + x, 300 + y, fill="#f67824", outline="")
    c.create_rectangle(130 + x, 350 + y, 180 + x, 300 + y, fill="#62b999", outline="")
    c.create_polygon(185 + x, 350 + y, 185 + x, 300 + y, 235 + x, 350 + y, fill="#513f35", outline="")
    c.create_polygon(190 + x, 300 + y, 240 + x, 300 + y, 290 + x, 350 + y, 240 + x, 350 + y, fill="#b63e3f", outline="")
    c.create_polygon(245 + x, 300 + y, 295 + x, 350 + y, 345 + x, 300 + y, fill="#f67824", outline="")

# Солнце
def draw_sun(x, y):
    c.create_oval(280 + x, 50 + y, 340 + x, 110 + y, fill="white", outline="#ffa500", width=12)

def draw_all(offset=0):
    c.delete("all")  

    # Рисуем три кораблика
    draw_object(0, 0)
    draw_object(270, 20)
    draw_object(540, 0)

    # Вода (фон снизу)
    c.create_rectangle(0, 350, 900, 400, fill="#ffce7a", outline="")

    # Солнце с анимацией
    draw_sun(0 + offset, 0 + offset*0.5)

def draw_on_scale_change(value):
    value = int(value)
    draw_all(value)

# Ползунок
slider = Scale(root, from_=0, to=600, orient=tk.HORIZONTAL, command=draw_on_scale_change)
slider.pack(fill=BOTH, expand=True, pady=10)

# Начальный рисунок
draw_all()

root.mainloop()