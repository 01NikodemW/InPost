export type Parcel = {
    id: string,
    name: string,
    weight: number,
    deliveryStatus: number,
    dateOfSent: Number,
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
