"use server";

async function fetchLabels(list: string[]) {
    "use server"
    const arr: string[][] = [];
    for (const w of list) {
        const labels: string[] = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`, { method: 'GET' })
            .then(async (res) => {
                if (res.ok) {
                    const json = await res.json();
                    if (json) {
                        const l: string[] = [];
                        for (const i of json[0].meanings) {
                            if (!l.includes(i.partOfSpeech))
                                l.push(i.partOfSpeech);
                        }
                        return l;
                    } else {
                        return ["Not Found"];
                    }
                } else {
                    return ["Not Found"];
                }
            }).catch((e) => {
                return ["Not Found"];
            })
        arr.push(labels);
    }
    console.log(arr);
    return arr;
}

export { fetchLabels };