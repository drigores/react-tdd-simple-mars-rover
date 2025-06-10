import React, { useEffect, useState } from 'react';

type MarsRoverProps= {
    commands:string
    entryPoint?: string
}
type Coordinate = {
    x:string,
    y:string,
    direction: string
}
enum Direction {
    NORTH = "N",
    SOUTH = "S",
    EAST = "E",
    WEST = "W"
}
enum Position {
    LEFT = "L",
    RIGHT = "R"
}
enum Commands {
    MOVE = "M",
    LEFT = Position.LEFT,
    RIGHT = Position.RIGHT
}

const MarsRover = ({commands, entryPoint= "0:0:N"}:MarsRoverProps)=> { 
    const [output, setOutput] = useState<string>(entryPoint);

    const gameLoop = (commands:string)=>{
        let bufferedOutput = output;
        for(let command of commands){
            if(isCommandAMove(command)){
                 bufferedOutput = move(extractCoordinates(bufferedOutput));
                setOutput(bufferedOutput);
            }
            else if(isCommandADirection(command)) {
                bufferedOutput = changeDirection(command, bufferedOutput);
                setOutput(bufferedOutput);
            }
        }
    }

    useEffect(()=>{
       gameLoop(commands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commands] );

  return (
    <div>
        <p>MarsRover</p>
        <p>{commands}</p>
        <p>{output}</p>
    </div>
  );
}

    const move = ({x, y, direction}: Coordinate)=>{
         if(shouldWrapArround({x, y, direction})) return wrapArround({x, y, direction});
         else if(direction === Direction.NORTH) return getPointByCoordenate({x:x, y:`${parseInt(y)+1}`, direction: direction});
         else if(direction === Direction.SOUTH) return getPointByCoordenate({x:x, y:`${parseInt(y)-1}`, direction: direction});
         else if(direction === Direction.WEST)  return getPointByCoordenate({x:`${parseInt(x)-1}`, y:y, direction: direction}); 
         else if(direction === Direction.EAST)  return getPointByCoordenate({x:`${parseInt(x)+1}`, y:y, direction: direction});
         throw new Error("Error on moving");
    }

    const [MIN_SIZE, MAX_SIZE] = ["0","9"];

   const shouldWrapArround = ({x, y, direction}:Coordinate) =>{
        if(direction === Direction.NORTH && y=== MAX_SIZE) return true;
        if(direction === Direction.SOUTH && y === MIN_SIZE) return true;
        if(direction === Direction.WEST && x === MIN_SIZE) return true;
        if(direction === Direction.EAST && x === MAX_SIZE) return true;
        return false;
    }

    const wrapArround = ({x, y, direction}:Coordinate)=>{
        if(direction === Direction.NORTH && y === MAX_SIZE) return getPointByCoordenate({x:x,y:MIN_SIZE,direction:direction}); 
        if(direction === Direction.SOUTH && y === MIN_SIZE) return getPointByCoordenate({x:x,y:MAX_SIZE,direction:direction});
        if(direction === Direction.WEST && x === MIN_SIZE) return getPointByCoordenate({x:MAX_SIZE,y:y,direction:direction});
        if(direction === Direction.EAST && x === MAX_SIZE) return getPointByCoordenate({x:MIN_SIZE,y:y,direction:direction});
        return getPointByCoordenate({x, y, direction});
    }
    
    
    const getDirection =(position:string, point: any)=>{
        const coordinate = extractCoordinates(point);
        if(position === Position.RIGHT && coordinate.direction === Direction.NORTH ) return Direction.EAST;
        else if(position === Position.RIGHT && coordinate.direction === Direction.EAST ) return Direction.SOUTH;
        else if(position === Position.RIGHT && coordinate.direction === Direction.SOUTH ) return  Direction.EAST;
        else if(position === Position.RIGHT && coordinate.direction === Direction.WEST ) return Direction.NORTH ;
        
        else if(position === Position.LEFT && coordinate.direction === Direction.NORTH) return Direction.WEST;
        else if(position === Position.LEFT && coordinate.direction === Direction.EAST) return Direction.NORTH;
        else if(position === Position.LEFT && coordinate.direction === Direction.SOUTH) return Direction.WEST;
        else if(position === Position.LEFT && coordinate.direction === Direction.WEST) return Direction.SOUTH;
    }

    const extractCoordinates = (point:string): Coordinate=>{
        const x = point.split(":")[0];
        const y = point.split(":")[1];
        const direction = point.split(":")[2];
        const coordinate = {x:x,y:y,direction:direction} as Coordinate;
        return coordinate;
    }

    const changeDirection = (command: string, point: any)=>{
        const coordinate = extractCoordinates(point);
         return `${coordinate.x}:${coordinate.y}:${getDirection(command, point)}`;
    }
    const isCommandAMove = (character: string)=>{ return character === Commands.MOVE}
    const isCommandADirection = (character: string)=>{ return character === Position.LEFT || character === Position.RIGHT }
    const getPointByCoordenate = ({x,y,direction}: Coordinate)=>{
        return `${x}:${y}:${direction}` ;
    } 

export default MarsRover;
