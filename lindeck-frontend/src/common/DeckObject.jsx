import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";

export default class DeckObject {
    cards = [new CardObject()]
    layout = [new LayoutObject()]
    owner = "admin" // owner of deck
    name = "test"
    description = "test description"
    rowHeight = 100
    cols = 2
    uniqueId = 0

}