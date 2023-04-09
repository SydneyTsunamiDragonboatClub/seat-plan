import {Paddler} from '../types/Paddler';
import Seat from './Seat';
import { useEffect } from 'react'; 

type Paddlers = {
    paddlers: Paddler[]
    row: number
    updateBoatWeightFactor: (row: number, weightFactor: number[]) => void
}

const Row: React.FC<Paddlers> = ({paddlers, row, updateBoatWeightFactor}) => {
    const frontBackFactor = [
        6, 4.5, 3.5, 2.5, 1.5, 0.5, -0.5, -1.5, -2.5, -3.5, -4.5, -6
    ]

    const leftRightFactor = [
        0, 300, 330, 350, 350, 350, 350, 350, 350, 330, 300, 420
    ]

    const weightDiff = row === 11 ? -3 : paddlers[1].weight - paddlers[0].weight;
    const weightTotal = paddlers[1].weight + paddlers[0].weight
        + (row === 0 ? 14 : 0)
        + (row === 11 ? 7 : 0);

    const leftRightBaseFactor = 350;
    const leftRightWeightFactor = (weightDiff * (leftRightFactor[row]/leftRightBaseFactor));

    const frontBackBaseFactor = 6;
    const frontBackWeightFactor = (weightTotal * (frontBackFactor[row]/frontBackBaseFactor));

    let seatWidth = "w-64";
    // if (row < 4) {
    //     seatWidth = seatWidth - (4 * (3-row));
    // }

    useEffect(() => {
        updateBoatWeightFactor(row, [leftRightWeightFactor, frontBackWeightFactor])
    }, [leftRightWeightFactor, frontBackWeightFactor, row, updateBoatWeightFactor]);

    return (
        <div className='flex flex-row p-2 justify-center'>
            <div className={`flex bg-slate-400 ${seatWidth} justify-center `}>
                {paddlers.map((paddler: Paddler) => (
                    <>
                    {paddler.name !== "" && (
                            <Seat key={paddler.name} name={paddler.name} weight={paddler.weight} />
                        )
                    }
                    </>
                ))}
            </div>

            {/*<div className='p-2'>*/}
            {/*    Weight Difference: {weightDiff}*/}
            {/*</div>*/}
            {/*<div className='p-2'>*/}
            {/*    Weight Total: {weightTotal}*/}
            {/*</div>*/}
            {/*<div className='p-2'>*/}
            {/*    Left Right Weight factor: {leftRightWeightFactor.toFixed(3)}*/}
            {/*</div>*/}
            {/*<div className='p-2'>*/}
            {/*    Front Back Weight factor: {frontBackWeightFactor.toFixed(3)}*/}
            {/*</div>*/}
        </div>
    )
}

export default Row;