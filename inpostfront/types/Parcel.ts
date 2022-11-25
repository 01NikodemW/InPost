export type Parcel = {
    id: string,
    name: string,
    weight: number,
    receiver: {
        name: string,
        id: string,
    },
    sender: {
        name: string,
        id: string,
    },
    sourceLocker: {
        name: string,
        id: string,
    },
    destinationLocker: {
        name: string,
        id: string,
    },

}
