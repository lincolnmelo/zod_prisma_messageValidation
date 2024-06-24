export interface IDefaultResponseMessage {
    recipient: {
        id: string
    },
    message: {
        text?: string,
        attachment?: IMessageAttachmentResponseService
    }
}

export interface IMessageAttachmentResponseService {
    type: string,
    payload: {
        template_type: string,
        text: string,
        buttons: IMessageButtonsResponseService[]
    }
}

export interface IMessageButtonsResponseService {
    type: string,
    title: string,
    payload: string
}
