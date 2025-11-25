"use client"

import { setUnFavorite } from "@/app/explore/components/serverutils"
import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"
import { StarFill } from "react-bootstrap-icons"

export default function Byebut({ word }: { word: string }) {
    const router = useRouter();
    return <Button onClick={() => { setUnFavorite(word); router.refresh() }}><StarFill color="yelow" /></Button>
}