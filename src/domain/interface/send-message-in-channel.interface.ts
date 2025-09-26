export abstract class ISendMessageInChannel {
  abstract sendMessageInChannel(
    channelName: string,
    message: string,
  ): Promise<boolean>;

  abstract sendErrorMessagesInInternalChannel(
    message: string,
  ): Promise<boolean>;
}
