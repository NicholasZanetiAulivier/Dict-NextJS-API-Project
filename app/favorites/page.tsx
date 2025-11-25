"use server"
import { prisma } from "@/lib/prisma";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { fetchLabels, setUnFavorite } from "../explore/components/serverutils";
import { StarFill } from "react-bootstrap-icons";
import Byebut from "./components/byebut";

export default async function Favs() {
    await prisma.$connect()
    const data: { id: number, word: string }[] = await prisma.$queryRaw`SELECT * FROM favorite`;
    const labels = await fetchLabels(data.map((a, i) => a.word));

    return (
        <>
            <Container className="mt-3">
                <h1 className="fw-bold">FAVOURITE WORDS LIST</h1>
                <Table className="mt-5">
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
                            data.map((item: { id: number, word: string }, i: number) => {
                                return (
                                    <tr key={i + 1}>
                                        <td className="align-middle text-center">{i + 1}</td>
                                        <td className="align-middle">{item.word}</td>
                                        <td className="align-middle">{labels[i].map((label, index) => {
                                            return (<Badge key={index}>{label}</Badge>)
                                        })}</td>
                                        <td><Button href={`/explore/${item.word}`}>Definition</Button><Byebut word={item.word} /></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table >
            </Container>
        </>
    )
}