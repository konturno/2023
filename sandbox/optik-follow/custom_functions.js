export function map(value, low1, high1, low2, high2){
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

export function random(max, min) {
  return Math.random() * (max - min + 1) + min;
  // return Math.floor(Math.random() * (max - min + 1) + min)
}

export function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

export function shift(arr, direction, n) {
  var times = n > arr.length ? n % arr.length : n;
  return arr.concat(arr.splice(0, (direction > 0 ? arr.length - times : times)));
}