export interface IDefaultRequestMessage {
    id: string,
    time: number,
    messaging: [
        {
            sender: {
                id: string
            },
            recipient: {
                id: number
            },
            timestamp: number,
            message?: IMessageService,
            postback?: IPostbackService
        }
    ]
}

export interface IMessageService {
    mid: string,
    text: string
}

export interface IPostbackService {
    mid: string,
    payload: string
}
