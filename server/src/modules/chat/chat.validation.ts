import { string, z } from "zod";

// create_private_chat_schema
export const create_private_chat_schema = z.object({
    body: z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        chatType: z.string()
    })
})

// export type
export type CreatePrivateChatDto = z.infer<typeof create_private_chat_schema>["body"];
