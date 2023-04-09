import initialData from '../initialData';
import Boat from "../components/Boat";

type BoatData = {
    paddlers: any,
    board: any,
    drummer: string[],
    leftOrder: string[],
    rightOrder: string[],
    sweep: string[],
}

export function buildData() {
    let data : BoatData = {
        board: {},
        drummer: [],
        leftOrder: [],
        rightOrder: [],
        sweep: [],
        ...initialData
    };

    let keys = Object.keys(data.paddlers);
    Object.entries(data.paddlers).forEach(([key, value]) => {
        data.paddlers = {
            ...data.paddlers,
            [key]: {
                ...value || null,
                id: key
            }
        }
    });

    // set board
    data.board = {
        ...data.board,
        main: {
            id: 'main',
            paddlerIds: keys.sort()
        },
        drummer: {
            id: 'drummer',
            paddlerIds: []
        },
        sweep: {
            id: 'sweep',
            paddlerIds: []
        },
    };

    for (let i = 1; i < 11; i++) {
        data.board = {
            ...data.board,
            [`left-${i}`]: {
                id: `left-${i}`,
                paddlerIds: []
            },
            [`right-${i}`]: {
                id: `right-${i}`,
                paddlerIds: []
            },
        }
        data.leftOrder.push(`left-${i}`);
        data.rightOrder.push(`right-${i}`);
    }
    data.drummer.push('drummer');
    data.sweep.push('sweep');

    return data;
}