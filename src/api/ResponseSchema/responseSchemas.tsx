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
  name: z.string().optional(),
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

export const serieReferenceSchema = z.object({
  seriesId: z.number(),
  name: z.string().optional(),
});

export const charactersListResponseSchema = z.object({
  characterId: z.number(),
  fullName: z.string(),
  series: z.array(serieReferenceSchema).optional(),
  rpgSystemName: z.string(),
  isPublished: z.boolean(),
});

export const charactersResponseSchema = buildListEndpointSchema(
  charactersListResponseSchema
);

export const itemsReferenseSchema = z.object({
  itemId: z.number(),
  name: z.string(),
});

export const characterDetailsResponseSchema = z.object({
  characterId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  imagePath: z.string().optional(),
  age: z.number().optional(),
  description: z.string().optional(),
  series: serieReferenceSchema.optional(),
  rpgSystem: rpgSystemReferenceSchema,
  isPublished: z.boolean(),
  tags: z.array(tagsResponseSchema),
  items: z.array(itemsReferenseSchema),
});

export const rpgSystemsResponseSchema = z.object({
  rpgSystemId: z.number(),
  name: z.string().optional(),
  isPublished: z.boolean(),
});

export const RpgSystemsListResponseSchema = buildListEndpointSchema(
  rpgSystemsResponseSchema
);

export const ItemsReferenceListResponseSchema =
  buildListEndpointSchema(itemsReferenseSchema);

export const TagsReferenceListResponseSchema =
  buildListEndpointSchema(tagsResponseSchema);

export const storyReferenceResponseSchema = z.object({
  storyId: z.number(),
  name: z.string(),
});

export const rpgSystemDetailsResponseSchema = z.object({
  rpgSystemId: z.number(),
  name: z.string(),
  description: z.string(),
  imagePath: z.string().optional(),
  isPublished: z.boolean(),
  tags: z.array(tagsResponseSchema),
  characters: z.array(characterReferenceSchema),
  series: z.array(serieReferenceSchema),
});

export const serieDetailsResponseSchema = z.object({
  seriesId: z.number(),
  name: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  tags: z.array(tagsResponseSchema).optional(),
  players: z.array(playerReferenceSchema).optional(),
  characters: z.array(characterReferenceSchema).optional(),
  rpgSystem: rpgSystemReferenceSchema.optional(),
  youtubePlaylistId: z.string(),
  gameMaster: playerReferenceSchema.optional(),
});

export const itemResponseSchema = z.object({
  itemId: z.number(),
  name: z.string(),
  isPublished: z.boolean(),
});

export const ItemsResponseSchema = buildListEndpointSchema(itemResponseSchema);

export const itemDetailsResponseSchema = z.object({
  itemId: z.number(),
  name: z.string(),
  description: z.string(),
  imagePath: z.string().optional(),
  characters: z.array(characterReferenceSchema),
  ownerName: z.string().optional(),
  tags: z.array(tagsResponseSchema),
  isPublished: z.boolean(),
});

export const tagResponseSchema = z.object({
  tagId: z.number(),
  name: z.string(),
  isPublished: z.boolean(),
});

export const TagsListResponseSchema =
  buildListEndpointSchema(tagResponseSchema);

export const EventResponseSchema = z.object({
  eventId: z.number(),
  name: z.string(),
  description: z.string().optional(),
  isPublished: z.boolean(),
  eventUrl: z.string().optional(),
  date: z.string().optional(),
  imagePath: z.string().optional(),
});

export const EventsListResponseSchema =
  buildListEndpointSchema(EventResponseSchema);

export const locationReferenceResponseSchema = z.object({
  locationId: z.number().optional(),
  name: z.string().optional(),
});

export const eventDetailsResponseSchema = z.object({
  eventId: z.number(),
  name: z.string(),
  description: z.string().optional(),
  isPublished: z.boolean(),
  eventUrl: z.string().optional(),
  date: z.string().optional(),
  imagePath: z.string().optional(),
  location: locationReferenceResponseSchema,
  tags: z.array(tagsResponseSchema),
});

export const locationResponseSchema = z.object({
  locationId: z.number(),
  name: z.string(),
  isPublished: z.boolean(),
  address: z.string().optional(),
  city: z.string().optional(),
  locationUrl: z.string().optional(),
});

export const locationsListResponseSchema = buildListEndpointSchema(
  locationResponseSchema
);

export const eventReferenceResponseSchema = z.object({
  eventId: z.number(),
  name: z.string(),
});

export const locationDetailsResponseSchema = z.object({
  locationId: z.number(),
  name: z.string(),
  isPublished: z.boolean(),
  address: z.string().optional(),
  city: z.string().optional(),
  locationURL: z.string().optional(),
  events: z.array(eventReferenceResponseSchema),
});

export const AdventureResponseSchema = z.object({
  adventureId: z.number(),
  title: z.string(),
  isPublished: z.boolean(),
});

export const adventuresListResponseSchema = buildListEndpointSchema(
  AdventureResponseSchema
);

export const adventureDetailsResponseSchema = z.object({
  adventureId: z.number(),
  title: z.string(),
  description: z.string().optional(),
  series: serieReferenceSchema.optional(),
  rpgSystem: rpgSystemReferenceSchema.optional(),
  tags: z.array(tagsResponseSchema).optional(),
  characters: z.array(characterReferenceSchema).optional(),
  isPublished: z.boolean(),
});

export type AdventureDetailsResponseSchema = z.infer<
  typeof adventureDetailsResponseSchema
>;

export type LocationDetailsResponseSchema = z.infer<
  typeof locationDetailsResponseSchema
>;

export type EventDetailsResponseSchema = z.infer<
  typeof eventDetailsResponseSchema
>;

export type ItemDetailsResponseSchema = z.infer<
  typeof itemDetailsResponseSchema
>;

export type SerieDetailsResponseSchema = z.infer<
  typeof serieDetailsResponseSchema
>;

export type RpgSystemDetailsResponseSchema = z.infer<
  typeof rpgSystemDetailsResponseSchema
>;

export type CharacterDetailsResponseSchema = z.infer<
  typeof characterDetailsResponseSchema
>;

export type SeriesResponseSchema = z.infer<typeof seriesResponseSchema>;

export type PlayerDetailsResponseSchema = z.infer<
  typeof playerDetailsResponseSchema
>;

export type PlayerResponseSchema = z.infer<typeof playersResponseSchema>;
export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;
