// Grid layout -> https://github.com/STRML/react-grid-layout
export default class LayoutObject {
    i = "0"
    x = 0
    y = 0
    w = 2
    h = 2

    constructor(i, x, y, w, h) {
        this.i = i || this.i
        this.x = x || this.x
        this.y = y || this.y
        this.w = w || this.w
        this.h = h || this.h
    }
}