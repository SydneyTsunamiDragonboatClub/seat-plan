import React, {useState} from 'react';
// import Boat from './components/Boat';
import Column from './components/Column';
import {DragDropContext} from 'react-beautiful-dnd';
import {buildBoat} from "./common/DataBuilder";
import {calculateLeftRightBalance, calculateFrontBackBalance} from "./common/WeightCalculator";

function App() {
    const [state, setState]: any = useState<any>({
        board: null,
        drummer: [],
        leftOrder: [],
        rightOrder: [],
        sweep: [],
        paddlers: {}
    });
    // const state:any = initialData;

    const leftRightBalance = calculateLeftRightBalance(state.board, state.paddlers);
    const frontBackBalance = calculateFrontBackBalance(state.board, state.paddlers);

    const onDragEnd = (result: any) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.board[source.droppableId];
        const finish = state.board[destination.droppableId];

        if (start === finish) {
            const newPaddlerIds = Array.from(start.paddlerIds);
            newPaddlerIds.splice(source.index, 1);
            newPaddlerIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                paddlerIds: newPaddlerIds.sort()
            }

            const newState = {
                ...state,
                board: {
                    ...state.board,
                    [newColumn.id]: newColumn
                }
            }
            setState(newState);
            return;
        }

        const startPaddlerIds = Array.from(start.paddlerIds);
        const finishPaddlerIds = Array.from(finish.paddlerIds);

        startPaddlerIds.splice(source.index, 1);
        if (destination.droppableId !== "main") {
            const replacedId = finishPaddlerIds.pop();
            // if source name is source, dont do anything
            // if source name is not source, put id back to source
            if (replacedId) {
                if (source.droppableId === "main") {
                    startPaddlerIds.splice(source.index, 0, replacedId);
                } else {
                    const newStart = {
                        ...start,
                        paddlerIds: startPaddlerIds.sort()
                    }

                    finishPaddlerIds.splice(destination.index, 0, draggableId);
                    const newFinish = {
                        ...finish,
                        paddlerIds: finishPaddlerIds.sort()
                    }

                    const main = state.board['main'];
                    const mainPaddlerIds = Array.from(main.paddlerIds);
                    mainPaddlerIds.splice(destination.index, 0, replacedId);
                    const newMain = {
                        ...main,
                        paddlerIds: mainPaddlerIds.sort()
                    }

                    const newState = {
                        ...state,
                        board: {
                            ...state.board,
                            main: newMain,
                            [newStart.id]: newStart,
                            [newFinish.id]: newFinish
                        }
                    };
                    setState(newState);
                    return;
                }
            }
        }


        const newStart = {
            ...start,
            paddlerIds: startPaddlerIds.sort()
        }

        finishPaddlerIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            paddlerIds: finishPaddlerIds.sort()
        }

        const newState = {
            ...state,
            board: {
                ...state.board,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        setState(newState);
    };

    const changeHandler = async (event: React.FormEvent<HTMLInputElement>) => {
        const file = (event.currentTarget.files as FileList).item(0);
        const boat = await buildBoat(file as File);
        setState(boat);
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={`flex-col gap-2`}>
                <div className={`flex p-4`}>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        onChange={changeHandler}
                        // style={{display: "block", margin: "10px auto"}}
                    />
                </div>
                <div className={'px-4 space-x-2 flex text-sm'}>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="prem" checked/>
                        <div
                            className="w-24 h-9 rounded-lg flex items-center justify-center text-slate-700 bg-slate-200 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                            Premier
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="sra"/>
                        <div
                            className="w-24 h-9 rounded-lg flex items-center justify-center text-slate-700 bg-slate-200 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                            Senior A
                        </div>
                    </label>
                </div>
                <div className={`flex p-4`}>
                    {state.board && <Column key={state.board['main'].id} column={state.board['main']}
                                            paddlers={state.board['main'].paddlerIds.map((paddlerId: string) => state.paddlers[paddlerId])}/>}
                    <div className={`flex-col`}>
                        <div className={`flex justify-center`}>
                            {state.drummer.map((columnId: string) => {
                                const column = state.board[columnId];
                                const paddlers = column.paddlerIds.map((paddlerId: string) => state.paddlers[paddlerId]);

                                return (
                                    <Column key={column.id} column={column} paddlers={paddlers}/>
                                )
                            })
                            }`
                        </div>
                        <div className={`flex`}>
                            <div className={`flex flex-col`}>
                                {state.leftOrder.map((columnId: string) => {
                                    const column = state.board[columnId];
                                    const paddlers = column.paddlerIds.map((paddlerId: string) => state.paddlers[paddlerId]);

                                    return (
                                        <Column key={column.id} column={column} paddlers={paddlers}/>
                                    )
                                })
                                }
                            </div>
                            <div className={`flex flex-col`}>
                                {state.rightOrder.map((columnId: string) => {
                                    const column = state.board[columnId];
                                    const paddlers = column.paddlerIds.map((paddlerId: string) => state.paddlers[paddlerId]);

                                    return (
                                        <Column key={column.id} column={column} paddlers={paddlers}/>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className={`flex justify-center`}>
                            {state.sweep.map((columnId: string) => {
                                const column = state.board[columnId];
                                const paddlers = column.paddlerIds.map((paddlerId: string) => state.paddlers[paddlerId]);

                                return (
                                    <Column key={column.id} column={column} paddlers={paddlers}/>
                                )
                            })
                            }`
                        </div>
                    </div>
                    <div className={`flex flex-col p-4 gap-2`}>
                        <div className={`flex gap-2`}>
                            <p>{leftRightBalance.value}</p>
                            <p className={`px-2 ${leftRightBalance.alert ? "bg-red-500 text-white" : ""}`}>
                                {leftRightBalance.rightHeavy ? "RIGHT HEAVY" : "LEFT HEAVY"}
                            </p>
                        </div>
                        <div className={`flex gap-2`}>
                            <p>{frontBackBalance.value}</p>
                            <p className={`px-2 ${frontBackBalance.alert ? "bg-red-500 text-white" : ""}`}>
                                {frontBackBalance.frontHeavy ? "FRONT HEAVY" : "BACK HEAVY"}
                            </p>
                        </div>
                        <div className={`flex-col gap-2`}>
                            <p>MEN: {leftRightBalance?.menCount || 0}</p>
                            <p>WOMEN: {leftRightBalance?.womenCount || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Boat/>*/}

        </DragDropContext>

    );
}

export default App;
