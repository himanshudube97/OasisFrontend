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
};

export const summarizeText = async({text, length, format}) =>{
    try {
        let url= `https://api.cohere.ai/v1/summarize`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${import.meta.env.VITE_ONEAPI_API_KEY}`
              },
        }
        const postData = {
            text: text,
            length: "medium",
            format: "bullets",
            extractiveness: "low",
            temperature: 0.3
          }
          const {data} = await axios.post(url, postData, config);
          return data.summary
    } catch (error) {
        console.log(error, "error summarizing text");
        return;
    }
}