# Draw on Sphere Read Me

The inspiration for this effort is from this effort: https://optikstudies.com created by Wang Yen Chi / Chris Wang. The particular reference is here: https://github.com/konturno/2023/tree/main/sandbox/draw-on-sphere

* https://twitter.com/wangyenchi


## 2022-12-19

https://konturno.github.io/2023/sandbox/draw-on-sphere/2022-12-19/draw-lines-slithering.html

First a number of lines are drawn. Every screen refresh, the lines are replaced a new set of lines with new coordinates

Fading is handles by an array of RGB shades applied to a material with colors by vertex.

Fading and updating of the vertices is going OK, but there is still much thought needed to be given to displacing the vertices in an elegant a manner as Wang Yen Chi is doing. Part of the issue may be because of thinking in latitude and longitude. I will return to phi and theta in the next update.

Also I need to figure out how to avoid going over the poles,


## 2022-12-18

https://konturno.github.io/2023/sandbox/draw-on-sphere/2022-12-18/draw-line-lat-lon.html

Every 500 ms iteration a new line is added and the oldest line is removed.

Every animation frame, the opacity of one of the lines is reduced - eventually making the lin invisible

A sort of heartbeat feeling is achieved, complex moire effects. Work-in-progress


## 2022-12-16

https://konturno.github.io/2023/sandbox/draw-on-sphere/2022-12-16/draw-on-grid.html


## 2022-12-15

https://konturno.github.io/2023/sandbox/draw-on-sphere/2022-12-15/draw-on-sphere-2.html

