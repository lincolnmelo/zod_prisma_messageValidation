import MessageRepository from '../repositories/MessageRepository'
import HttpRequest from './HttpRequestService'
import type { Request } from 'express'
import { IDefaultRequestMessage } from './interfaces/request/IDefaultRequestMessage'
import { IDefaultResponseMessage } from './interfaces/response/IDefaultResponseMessage'
import { IMessageParse } from './interfaces/request/IMessageParse'

const messageRepository = new MessageRepository()
const httpRequest = new HttpRequest()

export default class MessageService {
  private messageRepository: MessageRepository
  private httpRequest: HttpRequest
  private defaultRequestMessage: IDefaultRequestMessage
  private defaultResponseMessage: IDefaultResponseMessage
  constructor() {
    this.messageRepository = messageRepository
  }
  async getAll(req: Request) {
    const messages: IMessageParse[] = await this.messageRepository.getAll()

    if (messages.length > 0) {

      messages.map(elem => {
        elem.messaging = JSON.parse(elem.messaging)
      })

      return messages
    } else {
      return { message: 'Não há dados!' }
    }
  }

  async create(req: Request) {
    this.defaultRequestMessage = { ...req.body }

    const mensageReceivedParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultRequestMessage.messaging), 0)

    await this.messageRepository.create(mensageReceivedParse)

    if (this.defaultRequestMessage.messaging[0].message) {
      console.log(`\n[ATENÇÃO]: Tipo de requisição -> Mensagem: ${this.defaultRequestMessage.messaging[0].message.text}`)
      console.log('[ATENÇÃO]: Nesse momento realizariamos a callback para a api da meta para enviar a mensagem!!!')
      console.log('[ATENÇÃO]: Retornando o objeto tratado no response, apenas para consulta!')

      if (this.defaultRequestMessage.messaging[0].message.text == ('Olá')) {
        this.defaultResponseMessage = {
          recipient: {
            id: this.defaultRequestMessage.id
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'Olá! O que você gostaria de fazer a seguir?',
                buttons: [
                  {
                    type: 'postback',
                    title: 'Começar',
                    payload: 'GO_START'
                  },
                  {
                    type: 'postback',
                    title: 'Suporte',
                    payload: 'GO_SUPPORT'
                  },
                  {
                    type: 'postback',
                    title: 'Ajuda',
                    payload: 'GO_HELP'
                  },
                ]
              }
            }
          },
        }
        //await this.httpRequest.post(this.defaultRequestMessage)

        const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)

        await this.messageRepository.create(mensageSendParse)

        return this.defaultResponseMessage
      } else {
        this.defaultResponseMessage = {
          recipient: {
            id: this.defaultRequestMessage.id
          },
          message: {
            text: 'Desculpe mas meu vocabulario ainda é pequeno, no momento eu só entendo a palavra: Olá'
          }
        }

        //await this.httpRequest.post(this.defaultRequestMessage)

        const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)

        await this.messageRepository.create(mensageSendParse)

        return this.defaultResponseMessage
      }
    } else if (this.defaultRequestMessage.messaging[0].postback) {
      console.log(`\n[ATENÇÃO]: Tipo de requisição -> postback: ${this.defaultRequestMessage.messaging[0].postback.payload}`)
      console.log('[ATENÇÃO]: Nesse momento realizariamos a callback para a api da meta para enviar a mensagem!!!')
      console.log('[ATENÇÃO]: Retornando o objeto tratado no response, apenas para consulta!')

      const { payload } = this.defaultRequestMessage.messaging[0].postback

      this.defaultResponseMessage = {
        recipient: {
          id: this.defaultRequestMessage.id
        },
        message: {
          text: ''
        }
      }

      if (payload == 'GO_START') {
        this.defaultResponseMessage.message.text = 'OK! vou te encaminhar para o início!'
        const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)
        await this.messageRepository.create(mensageSendParse)
        //await this.httpRequest.post(this.defaultRequestMessage)

        return this.defaultResponseMessage
      } else if (payload == 'GO_SUPPORT') {
        this.defaultResponseMessage.message.text = 'OK! vou te encaminhar para o suporte!'
        const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)
        await this.messageRepository.create(mensageSendParse)
        //await this.httpRequest.post(this.defaultRequestMessage)

        return this.defaultResponseMessage
      } else if (payload == 'GO_HELP') {
        this.defaultResponseMessage.message.text = 'OK! vou verificar se existe um atendente disponível!'
        const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)
        await this.messageRepository.create(mensageSendParse)
        //await this.httpRequest.post(this.defaultRequestMessage)

        return this.defaultResponseMessage
      } else {
        this.defaultResponseMessage = {
          recipient: {
            id: this.defaultRequestMessage.id
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'Desculpe! eu não  entendi, poderia escolher uma das opções abaixo?',
                buttons: [
                  {
                    type: 'postback',
                    title: 'Começar',
                    payload: 'GO_START'
                  },
                  {
                    type: 'postback',
                    title: 'Suporte',
                    payload: 'GO_SUPPORT'
                  },
                  {
                    type: 'postback',
                    title: 'Ajuda',
                    payload: 'GO_HELP'
                  },
                ]
              }
            }
          },
        }
        //await this.httpRequest.post(this.defaultRequestMessage)
        const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)
        await this.messageRepository.create(mensageSendParse)

        return this.defaultResponseMessage
      }
    } else {
      this.defaultResponseMessage = {
        recipient: {
          id: this.defaultRequestMessage.id
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'Desculpe! eu não entendi, poderia escolher uma das opções abaixo?',
              buttons: [
                {
                  type: 'postback',
                  title: 'Começar',
                  payload: 'GO_START'
                },
                {
                  type: 'postback',
                  title: 'Suporte',
                  payload: 'GO_SUPPORT'
                },
                {
                  type: 'postback',
                  title: 'Ajuda',
                  payload: 'GO_HELP'
                },
              ]
            }
          }
        },
      }
      //await this.httpRequest.post(this.defaultRequestMessage)

      const mensageSendParse = this.formatMessageSendDB(this.defaultRequestMessage.id, this.defaultRequestMessage.time, JSON.stringify(this.defaultResponseMessage), 1)
      await this.messageRepository.create(mensageSendParse)

      return this.defaultResponseMessage
    }
  }

  formatMessageSendDB = (idPage: string, time: number, messaging: string, receivedSend: number) => {
    const mensageParse: IMessageParse = {
      idPage: idPage,
      time: time,
      messaging: receivedSend == 0 ? messaging : `[${messaging}]`,
      receivedSend: receivedSend
    }
    return mensageParse
  }
}