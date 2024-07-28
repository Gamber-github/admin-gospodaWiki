import { z, ZodSchema } from "zod";

export const emptySchema = z.object({}).strict();

const buildListEndpointSchema = <T extends ZodSchema>(item: T) =>
  z.object({
    items: z.array(item),
    totalItemCount: z.number(),
    pageNumber: z.number(),
    pageSize: z.number(),
  });

export const authenticateResponseSchema = z.object({
  token: z.string(),
});

export const userResponseSchema = z.object({
  userName: z.string(),
  email: z.string(),
});

export const playersResponseSchema = z.object({
  playerId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  isPublished: z.boolean(),
});

export const playersListResponseSchema = buildListEndpointSchema(
  playersResponseSchema
);

export const playerDetailsResponseSchema = z.object({
  playerId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().optional(),
  about: z.string().optional(),
  image: z.string().optional(),
  series: z.array(z.object({ seriesId: z.number(), name: z.string() })),
  isPublished: z.boolean(),
});

export const playerReferenceSchema = z.object({
  playerId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});

export const characterReferenceSchema = z.object({
  characterId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});

export const rpgSystemReferenceSchema = z.object({
  rpgSystemId: z.number(),
  name: z.string(),
});

export const tagsResponseSchema = z.object({
  tagId: z.number(),
  name: z.string(),
});

export const seriesResponseSchema = z.object({
  seriesId: z.number(),
  name: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  tags: z.array(tagsResponseSchema),
  players: z.array(playerReferenceSchema),
  characters: z.array(characterReferenceSchema),
  rpgSystem: rpgSystemReferenceSchema.optional(),
});

export const seriesListResponseSchema =
  buildListEndpointSchema(seriesResponseSchema);

export type SeriesResponseSchema = z.infer<typeof seriesResponseSchema>;

export type PlayerDetailsResponseSchema = z.infer<
  typeof playerDetailsResponseSchema
>;

export type PlayerResponseSchema = z.infer<typeof playersResponseSchema>;
export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;
