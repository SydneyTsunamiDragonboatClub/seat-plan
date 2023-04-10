import  {Draggable} from 'react-beautiful-dnd';

type PaddlerProps = {
    paddler: any,
    index: number
}

const Paddler: React.FC<PaddlerProps> = ({paddler, index}) => {

    return (
        <Draggable draggableId={paddler.id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`border border-solid border-black 
                    rounded-md p-px px-2 transition-all
                    ${snapshot.isDragging ? "bg-slate-300" : "bg-white"}
                    `}>
                    {`${paddler.id} (${paddler.weight})`}
                </div>
            )}
        </Draggable>
    )
}

export default Paddler;