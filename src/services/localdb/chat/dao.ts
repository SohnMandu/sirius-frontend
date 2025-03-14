import { CreateChatDTO, CreateChatroomDTO } from "@localdb/chat/dto";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

export class ChatDAO {
  db: IndexedDB;

  constructor() {
    this.db = new IndexedDB();
  }

  async createChatroom(inputData: CreateChatroomDTO) {
    const connectionId = uuid4();
    const chatroom = { ...inputData, connectionId };
    await this.db.insertOrUpdate("chatrooms", chatroom);
  }

  async createChat(inputData: CreateChatDTO) {
    const chatId = uuid4();
    const chat = { ...inputData, chatId };
    await this.db.insertOrUpdate("chats", chat);
  }

  async deleteChat(chatId: string) {
    await this.db.delete("chats", chatId);
  }

  async findChat(chatId: string) {
    return this.db.fetchOne("chats", chatId);
  }

  async getAllChatrooms() {
    return this.db.fetchAll("chatrooms");
  }
}
