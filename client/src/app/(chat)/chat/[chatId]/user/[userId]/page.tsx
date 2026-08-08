const Chat = async ({
    params
}: {
    params: Promise<{ chatId: string, userId: string }>
}) => {
    const { chatId, userId } = await params;
    console.log(chatId)
    console.log(userId);
  return (
    <div>page</div>
  )
}

export default Chat
