export class wsResponseDto{

    header?: wsResponseHeaderDto

    body: any
}

export class wsResponseHeaderDto{
    id?: string
    stat?: number
}