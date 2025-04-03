import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  news: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/news" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        date: z.date(),
        cover: image(),
      }),
  }),
  events: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/events" }),
    schema: () =>
      z.object({
        title: z.string(),
        date: z.date(),
        location: z.string(),
      }),
  }),
  projects: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/projects" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        cover: image(),
      }),
  }),
  media: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/media" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        cover: image(),
        coverAlt: z.string(),
        tags: z.array(
          z.enum([
            "performances",
            "portraits",
            "album-artwork",
            "production-stills",
          ]),
        ),
        attribution: z.optional(z.string()),
      }),
  }),
  recordings: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/recordings" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        url: z.string(),
        audioUrl: z.string(),
        cover: z.optional(image()),
        sectionSortOrder: z.number(),
        metadata: z.optional(
          z.array(
            z.object({
              title: z.string(),
              description: z.string(),
            }),
          ),
        ),
      }),
  }),
  works: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/works" }),
    schema: ({ image }) =>
      z.object({
        workNumber: z.string(),
        title: z.string(),
        shortDesc: z.string(),
        length: z.string(),
        forces: z.string(),
        sectionSortOrder: z.number(),
        tags: z.array(
          z.enum(["orchestral", "ensemble", "soloduo", "choral", "theatre"]),
        ),
        compositionYear: z.string(),
        hire: z.optional(z.boolean()),
        audio: z.any(),
        pdf: z.any(),
        buyPDF: z.optional(z.string()),
        bannerImage: z.optional(image()),
        titleImage: z.optional(image()),
        recording: z.optional(z.string()),
        moreInfo: z.optional(z.boolean()),
        buy: z.optional(z.string()),
      }),
  }),
};
