class ChatUrlConfig {
  public get getAllContacts() {
    return '/client/chat/contacts';
  }

  public getDirect(id) {
    return '/client/chat/messages/' + id;
  }

  public get sendMessage() {
    return '/client/chat/messages';
  }
}

export const CHAT_API = new ChatUrlConfig();
