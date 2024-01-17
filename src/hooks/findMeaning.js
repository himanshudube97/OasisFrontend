import axios from "axios";


export const findMeaning = async (word) => {
    try {
        let url = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${import.meta.env.VITE_WORD_API_KEY}`;
        const { data } = await axios.get(url);
        console.log(data[0],"data")
        if (data && data[0]) {
            return { def: data[0].shortdef, fl: data[0].fl, noResult: null }
        }
        return { noResult: "sorry.. couldn't find the meaning" }


    } catch (error) {
        console.log(error, "word meaning error");
        return;
    }
}