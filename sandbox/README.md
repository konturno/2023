# Sandbox Read Me

One strong inspiration for this effort is from this effort: https://optikstudies.com created by Wang Yen Chi / Chris Wang. The particular reference is here: https://optikstudies.com/case_studies?series=0048

* https://twitter.com/wangyenchi

Another linear inspiration is @dashdotdotdashdotdot

* https://optikstudies.com/three/
* https://optikstudies.com/about_bg/index.html
* https://optikstudies.com/projects/case_studies/0048/index.html


## 2023-01-01

<!--@@@
<div class=iframe-resize ><iframe src=https://konturno.github.io/2023/sandbox/draw-spline-slither/ height=100% width=100% ></iframe></div>
_"2023-01-01-draw-spline-slither" in a resizable window_
@@@-->



## Full Screen: [2023-01-01-draw-spline-slither]( https://konturno.github.io/2023/sandbox/draw-spline-slither/ )

Test for Instagram

Title: 2023-01-01-draw-spline-slither

The underlying geometry is a [Catmull–Rom spline]( https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline ) - which is a way of drawing very smooth curvey lines with very precise controls that people who are not rocket scientists can sometimes wrangle into some kind of control.

And that's what's happening in the video here. Yours truly is making those lines behave in the way he told them to behave!

Unlike the previous slither, I now feel that I have a good technical mastery over over the motion of the lines. On the other hand the previous piece has more of a jellyfish or manta ray vibe about that is quite soothing.

You may also notice that the video loops quite well there is little noticeable jump between the last frame and the first frame.

The question is - now that I know how to do it: Can I make something worthy of ongoing interest and engagement? Can we go beyond the craft and find some art here?

The script is plain and simple JavaScript calling the Three.js WebGL library hosted at https://Threes.org

View the work here:
https://konturno.github.io/2023/sandbox/draw-spline-slither/
Source code here:
https://github.com/konturno/2023/tree/main/sandbox/draw-spline-slither

#threejs #3dart #mathart #algorithmicart #webgl #motiongraphics #motiondesign


## 2022-12-25

Title: 2022-12-25 ~ Draw Helix Segments

The underlying geometry is a helix (3D spiral) wrapped around a torus (doughnut) with a vertical exaggeration.

25 lines comprising 600 tiny segments with width are created that use the helix as a path. The lines  are spaced apart at just the right distance so that the start and end points have exactly the same height. The positions of the lines are updated 60 times a second.

The effect is quite pleasing as it is. It's going to to be interesting to see if I can improve it in any way.

BTW, the video is still not a "perfect loop". There is a jump when the video restarts at the beginning. I'm still working om this.

The script is plain and simple JavaScript calling the Three.js library hosted at https://Threes.org

Check out the source code here: https://konturno.github.io/2023/sandbox/draw-helix-segments/2022-12-25/draw-helix-segments.html


#threejs #3dart #mathart #algorithmicart #webgl #motiongraphics #motiondesign


## 2022-12-24

Text for Instagram post

Title: 2022-12-23 ~ Draw Helix Segments

The underlying geometry is a helix (3D spiral) wrapped around a torus (doughnut) with a vertical exaggeration.

A number of lines are created that use the helix as a path. They are spaced apart at just the right distance so that the start and end points have exactly the same height.

The effect is quite nice and relaxing, but the effect is not yet as "interesting" as the inspiration: https://optikstudies.com/case_studies?series=0048

In terms of capturing a video from the running program, you want to capture a "perfect loop" where the last frame and the first frame are close enough so that when automatic replay is on there is no screen jerking and you feel that the progression is continuous. The current video is nearly there (but not quite).

The script is plain and simple JavaScript calling the Three.js library hosted at https://Threes.org

Check out the source code here: https://konturno.github.io/2023/sandbox/draw-helix-segments/2022-12-23/draw-helix-segments.html



## 2022-12-20

https://konturno.github.io/2023/sandbox/draw-on-sphere/2022-12-20/draw-lines-slithering.html

Updated the CCapture script and added it here to allow the slithering script to record and save a video. Recorded the first video and saved it to WEBM and MP4.

Text for Instagram post

Title: 2022-12-20 ~ Draw Lines Slithering

At long last, I'm back at the digital drawing board.

The idea is to draw any number of parallel lines "slithering" around a sphere (or ultimately any object) in a pleasing manner. The lines can be any length and the tails slowly fade out as the front tip moves forward.

Further iterations may include

1. Improved control over the paths taken by the lines
2. Making a perfect loop so that there is no visual jump between the last frame and the first frame when videos replay automatically

Inspired by this effort https://optikstudies.com/case_studies?series=0048 by Wang Yen Chi / Chris Wang and as always by: @dashdotdotdashdotdot

The script is plain and simple JavaScript calling the Three.js library hosted at https://Threes.org

Check out the source code here: https://konturno.github.io/2023/sandbox/draw-on-sphere/2022-12-20/draw-lines-slithering.html


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


***

<center title="Hello! Click me to go up to the top" ><a class=aDingbat href=javascript:window.scrollTo(0,0);> ❦ </a></center>
