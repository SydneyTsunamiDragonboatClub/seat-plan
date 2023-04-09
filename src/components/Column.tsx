import Paddler from './Paddler';
import {Droppable} from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

type ColumnProps = {
   column: any,
    paddlers: any
}
const Column: React.FC<ColumnProps> = ({column, paddlers}) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        }
    }, []);
    
    if (!enabled) {
        return null;
    }

    return (
        <div className={`m-0.5 border-solid border border-black 
            ${column.id !== "main" ? "" : "mr-8"}
            rounded-sm w-40 flex flex-col`}>
            <Droppable droppableId={column.id} >
                {(provided, snapshot) => (
                    <div
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                        className={`p-2 transition-all 
                           ${column.id !== "main" ? "h-12" : "flex flex-col gap-2"}
                           ${snapshot.isDraggingOver ? "bg-slate-600" : "bg-white"}
                        `}
                    >
                        {paddlers.map((paddler:any, index:number) => (
                            <Paddler key={paddler.id} paddler={paddler} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column;