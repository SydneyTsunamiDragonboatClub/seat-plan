import { useContext, useState } from "react";
import { processFile } from "../utils/DataBuilder";
import BoatContext from "./context/BoatContext";
import Tabs from "./Tabs";
import { PaddlerType } from "../types/PaddlerType";

const ImportPlayers = () => {
    const [raceCategories, setRaceCategories] = useState<string[]>(["Player List", "Senior A - Mixed - 200"]);
    const boatContext = useContext(BoatContext);

    const changeHandler = async (event: React.FormEvent<HTMLInputElement>) => {
        const file = (event.currentTarget.files as FileList).item(0);
        const _paddlers = await processFile(file as File);
        boatContext.setPaddlers(_paddlers);
    }

    let paddlers = boatContext.paddlers;

    return (
        <>
            {!paddlers && (
                <div>
                    <div className={`flex p-4`}>
                        <input
                            type="file"
                            name="file"
                            accept=".csv"
                            onChange={changeHandler}
                        />
                    </div>
                </div>
            )}
            {paddlers && (
                <div className={`p-4`}>
                    <Tabs
                        categories={raceCategories}
                    />
                </div>
            )}
        </>
    );
}

export default ImportPlayers;