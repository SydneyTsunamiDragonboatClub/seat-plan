// import paddler from "../components/Paddler";

export function calculateFrontBackBalance(board: any, paddlers: any) {
    if (board === null) {
        return {frontHeavy: false, value: 0, alert: false};
    }

    const frontBackFactor = [
        6, 4.5, 3.5, 2.5, 1.5, 0.5, -0.5, -1.5, -2.5, -3.5, -4.5, -6
    ];

    let value: number = 0;
    for (let i = 0, l = frontBackFactor.length; i < l; i++) {
        let weight = 0;
        if (i === 0) {
            const drummer = board['drummer'].paddlerIds[0];
            weight = drummer ? paddlers[drummer].weight : 0;

            // add 14kg drum weight on drummer
            weight += 14;
        } else if (i === l - 1) {
            const sweep = board['sweep'].paddlerIds[0];
            weight = sweep ? paddlers[sweep].weight : 0;

            // add 7 for oar's weight
            weight += 7;
        } else {
            const leftPaddler = board[`left-${i}`].paddlerIds[0];
            const rightPaddler = board[`right-${i}`].paddlerIds[0];

            const leftPaddlerWeight = leftPaddler ? paddlers[leftPaddler].weight : 0;
            const rightPaddlerWeight = rightPaddler ? paddlers[rightPaddler].weight : 0;

            weight = rightPaddlerWeight + leftPaddlerWeight;
        }
        value += (frontBackFactor[i] / 6) * (weight);
    }

    // positive is front heavy, alert if > 15 or < -25
    return {
        frontHeavy: value > 0,
        value: value.toFixed(1),
        alert: value > 15 || value < -25
    };
}

export function calculateLeftRightBalance(board: any, paddlers: any) {
    if (board === null) {
        return {frontHeavy: false, value: 0, alert: false};
    }

    const leftRightFactor = [
        0, 300, 330, 350, 350, 350, 350, 350, 350, 330, 300, 420
    ];

    // get left right weight factor
    let value = 0, menCount = 0, womenCount = 0;
    for (let i = 1, l = leftRightFactor.length - 1; i < l; i++) {
        const leftPaddler = board[`left-${i}`].paddlerIds[0];
        const rightPaddler = board[`right-${i}`].paddlerIds[0];

        menCount += leftPaddler && paddlers[leftPaddler].gender === 'M' ? 1 : 0;
        menCount += rightPaddler && paddlers[rightPaddler].gender === 'M' ? 1 : 0;

        womenCount += leftPaddler && paddlers[leftPaddler].gender === 'F' ? 1 : 0;
        womenCount += rightPaddler && paddlers[rightPaddler].gender === 'F' ? 1 : 0;

        const leftPaddlerWeight = leftPaddler ? paddlers[leftPaddler].weight : 0;
        const rightPaddlerWeight = rightPaddler ? paddlers[rightPaddler].weight : 0;

        value += (leftRightFactor[i] / 350) * (rightPaddlerWeight - leftPaddlerWeight);
    }

    // sweeps weight
    value += 1.2 * (-3)

    // right heavy if greater than zero, alert if unsigned value is > 5
    return {
        rightHeavy: value > 0,
        value: value.toFixed(1),
        alert: Math.abs(value) > 5,
        menCount,
        womenCount
    };
}