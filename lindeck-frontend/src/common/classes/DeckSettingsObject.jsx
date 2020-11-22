import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";
import {v4 as uuidv4} from "uuid";

export default class DeckSettingsObject {
    name
    description
    _cols
    _height
    privacy

    constructor(props = {}) {
        this.name = props.name
        this.description = props.description
        this.cols = props.cols
        this.height = props.height
        this.privacy = props.privacy
    }

    set cols(cols) {
        this._cols = parseInt(cols)
    }

    set height(height) {
        this._height = parseInt(height)
    }

    get cols() {
        return this._cols
    }

    get height() {
        return this._height
    }
}