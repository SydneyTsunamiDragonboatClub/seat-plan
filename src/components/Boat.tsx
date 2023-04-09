import {Paddler} from '../types/Paddler';
import Row from './Row';
import { useState } from 'react';

const Boat = () => {
    const [leftRightBalance, setLeftRightBalance] = useState(0);
    const [frontBackBalance, setFrontBackBalance] = useState(0);
    const [boatWeightFactor, setBoatWeightFactor] = useState( [
        [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0],
    ]);

    const updateWeightFactor = (index: number, weightFactors: number[]) => {
       let _boatWeightFactor = boatWeightFactor;
       _boatWeightFactor[index] = weightFactors;
       setBoatWeightFactor(_boatWeightFactor);

       setLeftRightBalance(_boatWeightFactor.map(item => item[0]).reduce((sum, current) => sum + current, 0));
        setFrontBackBalance(_boatWeightFactor.map(item => item[1]).reduce((sum, current) => sum + current, 0));
    }
    
    const paddlers = [
        [{ name: "Alice", weight: 58 }, { name: "", weight: 0 }],
        [{ name: "Lianna", weight: 71 }, { name: "Aiza", weight: 64 }],
        [{ name: "Deb", weight: 64 }, { name: "Phoebe", weight: 60 }],
        [{ name: "Sean", weight: 70 }, { name: "George", weight: 80 }],
        [{ name: "Nic", weight: 80 }, { name: "Paul", weight: 91 }],
        [{ name: "Rod", weight: 77 }, { name: "Andrea", weight: 65 }],
        [{ name: "Leah", weight: 73 }, { name: "Helen", weight: 55 }],
        [{ name: "Andrew", weight: 77 }, { name: "Detlef", weight: 90 }],
        [{ name: "Amanda", weight: 70 }, { name: "Sue", weight: 63 }],
        [{ name: "Simon", weight: 64 }, { name: "Kiran", weight: 95 }],
        [{ name: "Alison", weight: 74 }, { name: "Joc", weight: 58 }],
        [{ name: "SJ", weight: 62 }, { name: "", weight: 0 }],
    ]

    return (
        <div className='flex flex-col max-w-full content-center'>
            <div>Left Right Balance: {leftRightBalance}</div>
            <div>Front Back Balance: {frontBackBalance}</div>
            <div className='flex flex-col content-center'>
            {/*{paddlers.map((rowPaddlers: Paddler[], index) => (*/}
            {/*    <Row key={index} paddlers={rowPaddlers} row={index} updateBoatWeightFactor={updateWeightFactor}/>*/}
            {/*))*/}
            {/*}*/}
            </div>
        </div>
    );
}

export default Boat;