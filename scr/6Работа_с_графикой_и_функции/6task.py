#Задание: Реализовать микро приложение, в котором тыкая левой кнопкой мыши добавляются кружочки, а правой удаляются

from tkinter import *

root = Tk()
root.title("Я приложение =)")

canvas = Canvas(root, width=600, height=400, bg="white")
canvas.pack()

circles = []

def on_left_mouse_click(event):
    r = 20
    circle_id = canvas.create_oval(event.x-r, event.y-r, event.x+r, event.y+r, fill="#ffa500", outline="black", width=1)
    circles.append(circle_id)

def on_right_mouse_click(event):
    overlapping = canvas.find_overlapping(event.x-1, event.y-1, event.x+1, event.y+1)
    for item in overlapping:
        if item in circles:
            canvas.delete(item)
            circles.remove(item)
            break

canvas.bind('<Button-1>', on_left_mouse_click)
canvas.bind('<Button-3>', on_right_mouse_click)

root.mainloop()