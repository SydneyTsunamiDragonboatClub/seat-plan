import {Paddler} from '../types/Paddler';

const Seat: React.FC<Paddler> = ({name, weight}) => {
    return (
        <div className='p-2 text-white'>
            <p>{name} ({weight})</p>
        </div>
    )
}

export default  Seat;