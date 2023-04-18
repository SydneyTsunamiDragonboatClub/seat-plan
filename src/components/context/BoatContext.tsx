import { ReactNode, createContext, useState } from "react";
import { PaddlerType } from "../../types/PaddlerType";
import { RaceType } from "../../types/RaceType";

const BoatContext = createContext({
    paddlers: null,
    raceCategories: {},
    selectedRace: {},
    setPaddlers: (paddlers: any) => { },
    selectRace: (name: string) => { },
    updatePaddler: (paddler: any) => { },
    createRaceCategory: (name: string) => { },
    updateRaceCategory: (destination: any, source: any, id: string) => { },
});

export default BoatContext;

type Props = {
    children: ReactNode
}

export const BoatContextProvider: React.FC<Props> = ({ children }) => {
    const [paddlers, setPaddlers] = useState<any>(null);
    const [raceCategories, setRaceCategories] = useState<any>({});
    const [selectedRace, setSelectedRace] = useState<any>(null);

    const handleUpdatePaddler = (paddler: PaddlerType) => {
        setPaddlers({
            ...paddlers,
            [paddler.id as string]: paddler
        });
    }

    const handleRaceCategory = (name: string) => {
        let race: RaceType = {
            category: name,
            sourcePaddlers: Object.values(paddlers),
            setup: {}
        }
        if (name in raceCategories) {
            console.log("Category already exists");
        } else {
            setRaceCategories({
                ...raceCategories,
                [name]: race
            });
            setSelectedRace(race);
        }
    }

    const handleUpdateRace = (destination: any, source: any, id: string) => {
        let race: RaceType = selectedRace;
        let paddler = race.sourcePaddlers.find(p => p.id === id);
        let index = race.sourcePaddlers.indexOf(paddler as PaddlerType);

        race.setup = {
            ...race.setup,
            sourcePaddlers: race.sourcePaddlers.splice(index, 1),
            [destination.droppableId]: paddler
        }

        console.log(race);
        setRaceCategories({
            ...raceCategories,
            [race.category]: race
        });
        setSelectedRace(race);
    }

    const handleRaceSelection = (name: string) => {
        setSelectedRace(Object.values(raceCategories).find((cat) => (cat as RaceType).category === name));
    }

    return (
        <BoatContext.Provider
            value={{
                paddlers,
                raceCategories,
                selectedRace,
                setPaddlers: setPaddlers,
                selectRace: handleRaceSelection,
                updatePaddler: handleUpdatePaddler,
                createRaceCategory: handleRaceCategory,
                updateRaceCategory: handleUpdateRace
            }}
        >
            {children}
        </BoatContext.Provider>
    )
}
