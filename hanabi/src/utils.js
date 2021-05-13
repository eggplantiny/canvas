export function distance2Point (p1x, p1y, p2x, p2y) {
    return Math.sqrt((p2x - p1x) * (p2x - p1x) + (p2y - p1y) * (p2y - p1y))
}

export function isPointInRadius (px, py, rx, ry, r) {
    return px >= rx - r && px <= rx + r && py >= ry - r && py <= ry + r
}