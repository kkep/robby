export enum Directions {
  NORTH = 1, // Север
  EAST = 2,  // Восток
  SOUTH = 3, // Юг
  WEST = 4   // Запад
}

export enum Fields{
  WALKABLE = '.', // Robby may walk on this
  BLOCKED = '#', // Robby must not walk on this
  START = 'S', // Robby is starting here, he may also walk here
  TARGET = 'T' // The target cell, Robby has to reach
}

export enum Commands{
  TURN_RIGHT = 'r', // turn right by 90°
  TURN_LEFT = 'l', // turn left by 90°
  MOVE_FORWARDS = 'f' // move one field forwards into current direction
}
