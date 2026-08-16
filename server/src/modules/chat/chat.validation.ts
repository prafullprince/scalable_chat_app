import { z } from "zod";

// create_private_chat_schema
export const create_private_chat_schema = z.object({
    body: z.object({
        toUserEmail: z.email(),
        chatType: z.string()
    })
})

export const fetch_chat_details_schema = z.object({
    body: z.object({
        chatId: z.string(),
        before: z.string().nullable()
    })
})

// export type
export type CreatePrivateChatDto = z.infer<typeof create_private_chat_schema>["body"];
export type FetchChatDetailsDto = z.infer<typeof fetch_chat_details_schema>["body"];
