"use client"
import { Badge, Button, Form, Table } from "react-bootstrap";
import words from "an-array-of-english-words";
import { arrayToShuffled } from "array-shuffle";
import { useEffect, useState } from "react";
import { fetchLabels } from "./serverutils";

export default function WordsTable() {
    const [random, setRandom] = useState<boolean>(false);
    const [reversed, setReversed] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const [list, setList] = useState<Array<string>>(words);
    const [filtered, setFiltered] = useState<Array<string>>(words);
    const [filteredLables, setLabels] = useState<string[][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    console.log(filteredLables);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    async function getLabels(list: Array<string>) {
        setLoading(true);
        const arr = await fetchLabels(list);
        setLabels(arr);
        setLoading(false);
    }

    useEffect(
        () => {
            setList(list.toReversed());
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [reversed]
    )

    useEffect(
        () => {
            if (random) {
                setList(arrayToShuffled(words));
            } else {
                setList(reversed ? words.toReversed() : words);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [random]
    )

    useEffect(
        () => {
            setCurrentPage(1);
            setFiltered(list);
        },
        [list]
    )

    useEffect(
        () => {
            setFiltered(list.filter((w) => (new RegExp(search)).test(w)))
            console.log(filtered.slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage))
            getLabels(filtered.slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [search, list, currentPage]
    )

    useEffect(
        () => {
            getLabels(list.slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage));
        },
        []
    )

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <>
            <h4 className="col-auto my-auto">Sorting functions: </h4>
            <Button
                className='col-auto m-1'
                variant={reversed ? "primary" : "outline-secondary"}
                onClick={() => setReversed(!reversed)}
            >Reversed</Button>
            <Button
                className="col-auto m-1"
                variant={!random ? "primary" : "outline-secondary"}
                onClick={() => setRandom(!random)}
            >{!random ? "Alphabetical" : "Random"}</Button>
            <input className="col-auto m-1" type="text" id="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <h6>Currently showing an <span className="fw-bold">{reversed ? "reversed" : "ordered"}</span> list of <span className="fw-bold">{random ? "random words" : "alphabetically ordered words"}</span></h6>
            <Table className="mt-2" bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Word</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        currentItems.map((item: string, i: number) => {
                            return (
                                <tr key={indexOfFirstItem + i}>
                                    <td className="align-middle text-center">{indexOfFirstItem + 1 + i}</td>
                                    <td className="align-middle">{item}</td>
                                    <td className="align-middle">{!loading ? filteredLables[i] ? filteredLables[i].map((label, index) => {
                                        return (<Badge key={index}>{label}</Badge>)
                                    }) : <Badge>NotFound</Badge> : <Badge>Loading</Badge>}</td>
                                    <td><Button href={`/dict/${item}`}>Definition</Button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Form className="col-1 d-flex">
                <Button disabled={loading} onClick={() => setCurrentPage(!Number(currentPage - 1) ? 1 : currentPage - 1 < 1 ? 1 : currentPage - 1)}></Button>
                <Form.Control
                    className="col-1"
                    type="text"
                    value={currentPage == 0 ? "" : currentPage}
                    onChange={(e) => setCurrentPage(!Number(e.target.value) ? e.target.value == "" ? 0 : currentPage : Number(e.target.value) > totalPages ? totalPages - 1 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
                    id="pageNum"
                />
                <h4>/</h4>
                <Form.Control
                    className="col-1"
                    type="text"
                    value={totalPages}
                    id="pagetot"
                    disabled
                />
                <Button disabled={loading} onClick={() => setCurrentPage(!Number(currentPage + 1) ? currentPage == 0 ? 1 : currentPage + 1 : currentPage + 1 > totalPages ? totalPages : currentPage + 1)}></Button>
            </Form>
        </>
    );
}