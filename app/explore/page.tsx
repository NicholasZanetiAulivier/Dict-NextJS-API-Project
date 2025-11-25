import { Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import WordsTable from "./components/Words";

export default function AnkiHome() {

    return (
        <Container>
            <Row className="pt-2">
                <h1 className="fw-bold">List of English Words</h1>
                <h4 className="pt-3 mb-3">Welcome to the english word encyclopedia. The following are a list of english words. Though it probably doesn&apos;t include
                    all words, it probably contains at least 90% of them.
                </h4>
                <h5 className="text-black-50">Click on the <StarFill color="yellow" /> icon to put the word into your favourites list</h5>
                <h5 className="text-black-50">Click on the word to read its definition</h5>
            </Row>
            <Row className="mt-3">
                <WordsTable />
            </Row>
        </Container>
    );
}