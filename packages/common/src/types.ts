export interface JoinLeaveMessageType {
  type: "JOIN" | "LEAVE";
  roomId: string;
}

export interface ChatMessageType {
  type: "CHAT";
  roomId: string;
  message: string;
}

export type ParsedSocketMessage = JoinLeaveMessageType | ChatMessageType;
