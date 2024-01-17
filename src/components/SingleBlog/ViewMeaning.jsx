import { useEffect, useState } from "react";
import { useBlogsStore } from "../../Zustand/store";
import { findMeaning } from "../../hooks/helperFunctions";
import Loader from "../Loader/Loader";
export const ViewMeaning = () => {
  const { selectedWord } = useBlogsStore((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [meaning, setMeaning] = useState({
    noResult: "",
    def: [],
    fl: "",
  });
  useEffect(() => {
    async function getMeaning() {
      setLoading(true);
      const { def, noResult, fl } = await findMeaning(selectedWord);
      setLoading(false);
      setMeaning({ def, noResult, fl });
    }
    if (selectedWord) {
      getMeaning(selectedWord);
    }
  }, [selectedWord]);
  if (!selectedWord) {
    return <p>Double tap a word to get its meaning</p>;
  }
  Loader;
  return (
    <div className="bg-white p-8 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Selected Word: {selectedWord}</h1>

      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="mb-4">
          {meaning.noResult && (
            <p className="text-gray-700 font-semibold">{meaning.noResult}</p>
          )}
          <p className="text-gray-700 font-semibold">Verb: {meaning.fl}</p>
          <p className="text-gray-700 font-semibold">Meanings:</p>
          <ul className="list-disc pl-6">
            {meaning?.def?.map((meaning, index) => (
              <li key={index} className="text-gray-700">
                {meaning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
