import { Vector3 } from "three";

export type Building = {
    ownerName: string;
    message: string;
    position: Vector3,
    height: number,
    color: string;
}  