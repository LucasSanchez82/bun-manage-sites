import { z } from "zod";

const postNginxStatusSchema = z.object({
    status: z.enum(["start", "stop", "restart", "reload", "force-reload"]),
})

export {postNginxStatusSchema}