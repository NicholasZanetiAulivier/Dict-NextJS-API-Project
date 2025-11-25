/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import { Container } from "react-bootstrap";

export default async function WordPage({ params }: { params: Promise<{ word: string }> }) {
    const word = (await params).word;

    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { method: 'GET' }).then(async (res) => {
        return await res.json();
    });

    if (!word) {
        notFound();
    }

    if (!data) {
        notFound();
    }

    return (
        <Container>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any 
                data.map((word: any, index: number) => {
                    return (
                        < div key={index}>
                            <Container>
                                <h1 className="fw-bolder">{word.word}</h1>
                                <h3 className="text-black-50">Phonetics: {word.phonetic}</h3>
                                {
                                    word.origin ?
                                        <>
                                            <h6>Origins</h6>
                                            <h6 className="text-black-50">{word.origin}</h6>
                                        </> :
                                        null
                                }
                                <h4 className="fw-bold">Meanings</h4>
                                {
                                    word.meanings.map((m: any, i: any) => {
                                        return (
                                            <div key={i}>
                                                <h5>{m.partOfSpeech}</h5>
                                                <div className="d-flex flex-wrap gap-4">
                                                    {
                                                        m.definitions.map((def: any, ind: number) => {
                                                            return (
                                                                <div className="card p-1 text-center " style={{ width: '16rem' }} key={ind}>
                                                                    <div className="card-header fw-bolder">{def.definition}</div>
                                                                    {
                                                                        def.synonyms || def.antonyms || def.example ?
                                                                            <>
                                                                                <div className="card-title text-info fw-bold">{def.synonyms.map((s: any, inde: number) => (<div key={inde}>{s}</div>))}</div>
                                                                                <div className="card-title text-danger fw-bold">{def.antonyms.map((s: any, inde: number) => (<div key={inde}>{s}</div>))}</div>
                                                                                <div className="card-subtitle fw-bold">{def.example}</div>
                                                                            </> : null
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Container>
                            <hr />
                        </div >
                    );
                })
            }
        </Container >
    );
}