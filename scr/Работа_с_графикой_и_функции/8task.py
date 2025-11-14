from tkinter import *

root = Tk()
root.title("Я приложение =)")

data = {
    "counter": 0,
    "mouse": (250, 100),
    "circle_size": 20,
    "center": (250, 100),
    "max_size": 100,
    "min_size": 10,
    "prev_mouse": (250, 100)
}

def update():
    x, y = data['mouse']
    center_x, center_y = data['center']
    
    distance_to_center = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
    max_distance = ((250 ** 2) + (100 ** 2)) ** 0.5
    normalized_distance = distance_to_center / max_distance
    
    size_range = data['max_size'] - data['min_size']
    data['circle_size'] = data['min_size'] + normalized_distance * size_range
    
    if data['counter'] > 0:
        prev_x, prev_y = data['prev_mouse']
        delta_x = x - prev_x
        
        if abs(delta_x) > 1:
            data['circle_size'] += abs(delta_x) * 0.5
            if data['circle_size'] > data['max_size']:
                data['circle_size'] = data['max_size']
    
    data['prev_mouse'] = (x, y)

def interpolate_color(color1, color2, factor):
    r1, g1, b1 = int(color1[1:3], 16), int(color1[3:5], 16), int(color1[5:7], 16)
    r2, g2, b2 = int(color2[1:3], 16), int(color2[3:5], 16), int(color2[5:7], 16)
    
    r = int(r1 + (r2 - r1) * factor)
    g = int(g1 + (g2 - g1) * factor)
    b = int(b1 + (b2 - b1) * factor)
    
    return f"#{r:02x}{g:02x}{b:02x}"

def draw_all():
    x, y = data['mouse']
    center_x, center_y = data['center']
    size = data['circle_size']
    
    distance_to_center = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
    max_distance = ((250 ** 2) + (100 ** 2)) ** 0.5
    normalized_distance = distance_to_center / max_distance
    
    orange_color = "#FFA500"
    pink_color = "#FFC0CB"
    
    circle_color = interpolate_color(pink_color, orange_color, normalized_distance)
    bg_color = interpolate_color(orange_color, pink_color, normalized_distance)
    
    canvas.configure(bg=bg_color)
    
    canvas.create_oval(
        x - size/2,
        y - size/2,
        x + size/2,
        y + size/2,
        fill=circle_color,
        outline="black",
        width=2
    )

def on_tick():
    update()
    canvas.delete("all")
    draw_all()
    data['counter'] += 1
    root.after(33, on_tick)

def on_mouse_move(event):
    data["mouse"] = (event.x, event.y)

canvas = Canvas(root, width=500, height=200, bg="white")
canvas.pack()
canvas.bind("<Motion>", on_mouse_move)
on_tick()
root.mainloop()