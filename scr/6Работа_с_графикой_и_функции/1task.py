# Задание: нарисовать кораблик как на изображении

import tkinter as tk

root = tk.Tk()
root.title("Я приложение =)")

c = tk.Canvas(root, width = 400, height = 400, bg="#f4d9a7")
c.pack()

# Вода (фон снизу)
c.create_rectangle(0, 350, 400, 400, fill="#ffce7a", outline="")

# Парус — два треугольника
c.create_polygon(225 , 295, 195 , 210, 270 , 160, fill="#f67824")
c.create_polygon(195 , 205, 270 , 155, 225 , 70, fill="#62b999")

# Детали на лодке
c.create_polygon(125 , 350, 125 , 300, 75 , 300, fill="#f67824", outline="")
c.create_rectangle(130 , 350, 180 , 300, fill="#62b999", outline="")
c.create_polygon(185 , 350, 185 , 300, 235 , 350, fill="#513f35", outline="")
c.create_polygon(190 , 300, 240 , 300, 290 , 350, 240 , 350, fill="#b63e3f", outline="")
c.create_polygon(245 , 300, 295 , 350, 345 , 300, fill="#f67824", outline="")

# Солнце
c.create_oval(280, 50, 340, 110, fill="white", outline="#ffa500", width=12)

root.mainloop()