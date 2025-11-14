#Задаание: Реализовать микроигру в которой надо успеть тыкнуть по кружочку. При клике на кружочек фиксировать информацию об попаданиях счетчиком сслева сверху

from tkinter import *
import random

root = Tk()
root.title("Я приложение =)")

canvas = Canvas(root, width=600, height=400, bg="white")
canvas.pack()

score = 0
score_text = canvas.create_text(10, 20, text="Счетчик: 0", anchor="nw", font=("Arial", 16))

circles = []

def spawn_circle():
    global score
    if len(circles) < 5:
        x = random.randint(50, 550)
        y = random.randint(50, 350)
        r = 25
        circle_id = canvas.create_oval(x-r, y-r, x+r, y+r, fill="#ffa500", outline="black", width=1)
        circles.append(circle_id)
        canvas.after(1500, lambda: canvas.delete(circle_id) or circles[:] or circles[:] and circles.remove(circle_id))
    canvas.after(800, spawn_circle)

def on_mouse_click(event):
    global score
    overlapping = canvas.find_overlapping(event.x-1, event.y-1, event.x+1, event.y+1)
    for item in overlapping:
        if item in circles:
            canvas.delete(item)
            circles.remove(item)
            score += 1
            canvas.itemconfig(score_text, text=f"Счетчик: {score}")
            break

canvas.bind('<Button-1>', on_mouse_click)

spawn_circle()
root.mainloop()