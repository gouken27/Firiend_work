# Задание: Добавить измение цвета фона

import tkinter as tk
from tkinter import*

root = tk.Tk()
root.title("Я приложение =)")

initial_bg = "#f4d9a7"
night_bg = "#191970"

# Создаём Canvas
c = tk.Canvas(root, width=900, height=400, bg=initial_bg)
c.pack()

# Функция смешивания цветов
def blend_colors(color1, color2, blend=0.5):
    color1 = color1[1:]
    color2 = color2[1:]
    red = int((int(color1[:2], 16) * (1 - blend) + int(color2[:2], 16) * blend))
    green = int((int(color1[2:4], 16) * (1 - blend) + int(color2[4:6], 16) * blend))
    blue = int((int(color1[4:6], 16) * (1 - blend) + int(color2[4:6], 16) * blend))

    zpad = lambda x: x if len(x) == 2 else '0' + x
    return "#" + zpad(hex(red)[2:]) + zpad(hex(green)[2:]) + zpad(hex(blue)[2:])

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
def draw_sun(x, y, sun_color):
    c.create_oval(280 + x, 50 + y, 340 + x, 110 + y, fill="white", outline=sun_color, width=12)

def draw_all(offset=0):
    c.delete("all")  
    blend_factor = offset / 600

    water_color = blend_colors("#ffce7a", "#1e90ff", blend_factor)
    sun_color = blend_colors("#ffa500", "#ff4500", blend_factor)
    sky_color = blend_colors(initial_bg, night_bg, blend_factor)

    c.config(bg=sky_color) 

    # Рисуем три кораблика
    draw_object(0, 0)
    draw_object(270, 20)
    draw_object(540, 0)

    # Вода с динамическим цветом
    c.create_rectangle(0, 350, 900, 400, fill=water_color, outline="")

    # Солнце с анимацией и цветом
    draw_sun(offset, offset * 0.5, sun_color)


def draw_on_scale_change(value):
    value = int(value)
    draw_all(value)

# Ползунок
slider = Scale(root, from_=0, to=600, orient=tk.HORIZONTAL, command=draw_on_scale_change)
slider.pack(fill=BOTH, expand=True, pady=10)

# Начальный рисунок
draw_all()

root.mainloop()