import { useState } from "react";

type CreateRaceCategoryType = {
    categories: string[],
    addCategory: (category: string) => void,
    updateCategoryModal: (flag: boolean) => void
}

const CreateRaceCategory: React.FC<CreateRaceCategoryType> = ({ categories, addCategory, updateCategoryModal }) => {
    const [distance, setDistance] = useState<number>(0);
    const [numberOfRaces, setNumberOfRaces] = useState<number>(3);
    const [ageCategory, setAgeCategory] = useState<string>("");
    const [raceType, setRaceType] = useState<string>("");

    return (
        <>
            <div
                className={`
                            justify-center items-center flex overflow-x-hidden overflow-y-auto 
                            fixed inset-0 z-50 outline-none focus:outline-none
                            `}>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <form onSubmit={
                            (e: React.SyntheticEvent) => {
                                e.preventDefault();
                                let categoryName = `${ageCategory} - ${raceType} - ${distance}`;
                                addCategory(categoryName);
                                updateCategoryModal(false);
                            }
                        }>
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-xl font-semibold">
                                    Create Race Category
                                </h3>
                                <button
                                    className={`
                                            p-1 ml-auto bg-transparent border-0 text-black opacity-5 
                                            float-right text-3xl leading-none font-semibold outline-none 
                                            focus:outline-none
                                            `} onClick={() => updateCategoryModal(false)}>
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        X
                                    </span>
                                </button>
                            </div>

                            <div className="relative p-6 flex-auto space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ageCategory">
                                        Age Category
                                    </label>

                                    <select id="ageCategory"
                                        className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                                    focus:border-blue-500 block w-full p-2.5
                                                `}
                                        onChange={(e) => setAgeCategory(e.target.value)}
                                        value={ageCategory}
                                        required>
                                        <option value="">Choose a category</option>
                                        <option value="Premier">Premier</option>
                                        <option value="Senior A">Senior A</option>
                                        <option value="Senior B">Senior B</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="raceType">
                                        Race type
                                    </label>

                                    <select id="raceType"
                                        className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                                    focus:border-blue-500 block w-full p-2.5
                                                `}
                                        onChange={(e) => setRaceType(e.target.value)}
                                        value={raceType}
                                        required>
                                        <option value="">Choose a category</option>
                                        <option value="Mixed">Mixed</option>
                                        <option value="Women">Women</option>
                                        <option value="Open">Open</option>
                                    </select>
                                </div>
                                <div className={`flex space-x-2`}>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">
                                            Distance (meters)
                                        </label>
                                        <input id="distance" type="text"
                                            className={`
                                                        shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                                        leading-tight focus:outline-none focus:shadow-outline
                                                    `}
                                            placeholder="Distance"
                                            value={distance}
                                            onChange={(e) => setDistance(parseInt(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                                            Number of races
                                        </label>
                                        <input id="numberOfRaces" type="text"
                                            className={`
                                                        shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                                        leading-tight focus:outline-none focus:shadow-outline
                                                    `}
                                            placeholder="Number of races"
                                            value={numberOfRaces}
                                            onChange={(e) => setNumberOfRaces(parseInt(e.target.value))}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => updateCategoryModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default CreateRaceCategory;

