# Задание: Реализуйте логику, чтобы кружок следовал не за мышью, а до точки в которую кликнули мышью (используйте событие <Button-1>). По достижении точки кружок должен прикратить свое движение.

from tkinter import *
import math

root = Tk()
root.title("Я приложение =)")

canvas = Canvas(root, width=600, height=400, bg="white")
canvas.pack()

data = {
    "counter": 0,
    "mouse": (0, 0),
    "circle_location": (300, 200),
    "circle_velocity": (0, 0),
    "speed": 1,
}

r = 20
main_circle = canvas.create_oval(data['circle_location'][0]-r, data['circle_location'][1]-r, data['circle_location'][0]+r, data['circle_location'][1]+r, fill="#ffa500", outline="black", width=3)
arrow = canvas.create_line(0, 0, 0, 0, width=3, fill="black")

red_circles = []

def on_motion(event):
    data['mouse'] = (event.x, event.y)

def on_right_mouse_click(event):
    red_r = r / 2
    circle_id = canvas.create_oval(event.x-red_r, event.y-red_r, event.x+red_r, event.y+red_r, fill="red", outline="black", width=3)
    red_circles.append(circle_id)

def update():
    cx, cy = data['circle_location']
    c_vx, c_vy = data['circle_velocity']
    mx, my = data['mouse']

    vx = mx - cx
    vy = my - cy
    length = math.sqrt(vx ** 2 + vy ** 2)
    if length != 0:
        vx /= length
        vy /= length

    c_vx += vx * data['speed']
    c_vy += vy * data['speed']

    c_vx -= c_vx * 0.2
    c_vy -= c_vy * 0.2

    cx += c_vx
    cy += c_vy

    data['circle_velocity'] = (c_vx, c_vy)
    data['circle_location'] = (cx, cy)

    canvas.coords(main_circle, cx-r, cy-r, cx+r, cy+r)

    
    angle = math.atan2(my - cy, mx - cx)
    arrow_len = r
    ax = cx + arrow_len * math.cos(angle)
    ay = cy + arrow_len * math.sin(angle)
    canvas.coords(arrow, cx, cy, ax, ay)

    to_delete = []
    for red_id in red_circles:
        red_coords = canvas.coords(red_id)
        if (red_coords[0] < cx + r and red_coords[2] > cx - r and red_coords[1] < cy + r and red_coords[3] > cy - r):
            to_delete.append(red_id)

    for red_id in to_delete:
        canvas.delete(red_id)
        red_circles.remove(red_id)

    root.after(20, update)

canvas.bind('<Motion>', on_motion)
canvas.bind('<Button-3>', on_right_mouse_click)

update()

root.mainloop()