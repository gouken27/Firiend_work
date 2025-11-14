#Задаание: Добавить Scale для управления индивидуальным пололжением каждого коробля на форме
import tkinter as tk
from tkinter import*

root = tk.Tk()
root.title("Я приложение =)")

initial_bg = "#f4d9a7"
night_bg = "#191970"

c = tk.Canvas(root, width=900, height=400, bg=initial_bg)
c.pack()

def blend_colors(color1, color2, blend=0.5):
    color1 = color1[1:]
    color2 = color2[1:]
    red = int((int(color1[:2], 16) * (1 - blend) + int(color2[:2], 16) * blend))
    green = int((int(color1[2:4], 16) * (1 - blend) + int(color2[4:6], 16) * blend))
    blue = int((int(color1[4:6], 16) * (1 - blend) + int(color2[4:6], 16) * blend))
    zpad = lambda x: x if len(x) == 2 else '0' + x
    return "#" + zpad(hex(red)[2:]) + zpad(hex(green)[2:]) + zpad(hex(blue)[2:])

ship1_offset = tk.IntVar(value=0)
ship2_offset = tk.IntVar(value=0)
ship3_offset = tk.IntVar(value=0)

def draw_object(x, y):
    c.create_polygon(225 + x, 295 + y, 195 + x, 210 + y, 270 + x, 160 + y, fill="#f67824")
    c.create_polygon(195 + x, 205 + y, 270 + x, 155 + y, 225 + x, 70 + y, fill="#62b999")
    c.create_polygon(125 + x, 350 + y, 125 + x, 300 + y, 75 + x, 300 + y, fill="#f67824", outline="")
    c.create_rectangle(130 + x, 350 + y, 180 + x, 300 + y, fill="#62b999", outline="")
    c.create_polygon(185 + x, 350 + y, 185 + x, 300 + y, 235 + x, 350 + y, fill="#513f35", outline="")
    c.create_polygon(190 + x, 300 + y, 240 + x, 300 + y, 290 + x, 350 + y, 240 + x, 350 + y, fill="#b63e3f", outline="")
    c.create_polygon(245 + x, 300 + y, 295 + x, 350 + y, 345 + x, 300 + y, fill="#f67824", outline="")

def draw_sun(x, y, sun_color):
    c.create_oval(280 + x, 50 + y, 340 + x, 110 + y, fill="white", outline=sun_color, width=12)

def draw_all(offset=0):
    c.delete("all")  
    blend_factor = offset / 600

    water_color = blend_colors("#ffce7a", "#1e90ff", blend_factor)
    sun_color = blend_colors("#ffa500", "#ff4500", blend_factor)
    sky_color = blend_colors(initial_bg, night_bg, blend_factor)

    c.config(bg=sky_color) 

    draw_object(0 + ship1_offset.get(), 0)
    draw_object(270 + ship2_offset.get(), 20)
    draw_object(540 + ship3_offset.get(), 0)

    c.create_rectangle(0, 350, 900, 400, fill=water_color, outline="")
    draw_sun(offset, offset * 0.5, sun_color)

def draw_on_scale_change(value):
    value = int(value)
    draw_all(value)

def update_ship1(v): ship1_offset.set(int(v)); draw_all(slider.get())
def update_ship2(v): ship2_offset.set(int(v)); draw_all(slider.get())
def update_ship3(v): ship3_offset.set(int(v)); draw_all(slider.get())

slider = Scale(root, from_=0, to=600, orient=tk.HORIZONTAL, command=draw_on_scale_change)
slider.pack(fill=BOTH, expand=True, pady=5)

frame = tk.Frame(root)
frame.pack(pady=5)

s1 = Scale(frame, from_=-200, to=200, orient=tk.HORIZONTAL, length=200, variable=ship1_offset, command=update_ship1)
s2 = Scale(frame, from_=-200, to=200, orient=tk.HORIZONTAL, length=200, variable=ship2_offset, command=update_ship2)
s3 = Scale(frame, from_=-200, to=200, orient=tk.HORIZONTAL, length=200, variable=ship3_offset, command=update_ship3)

s1.pack(side=tk.LEFT, padx=5)
s2.pack(side=tk.LEFT, padx=5)
s3.pack(side=tk.LEFT, padx=5)

draw_all()
root.mainloop()