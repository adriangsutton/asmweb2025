# asmweb2025
New 2025 website for Adrian Sutton Music

## Git Installation

```bash
git clone git@github.com:jlewisbooth/adrian-sutton.git

cd adriansutton
```

## Installation

```bash
npm install
npm run dev
```

## General Information

Please refer to ./src/content.config.js to see what each data structure is for

- Works
- Recordings
- Media
- Events
- News
- Projects

This refers to the frontmatter variables you can set for each markdown file.

When adding an image to a works/recordings/media/projects page, it's easiest to add it to the `public` folder first (under the relevant folder), and then reference it in the markdown file.

For example:

```html
<img src="/public/works/image.jpg" alt="Image Description" />
```

## Tailwind

A lot of the website is styled with Tailwind. The main advantage of tailwind is that it makes it quicker to style the website using key class names.

For example, if you want to make a section with a background image, you can use the following Tailwind class:

```html
<div
  class="bg-cover bg-center h-screen w-full"
  style="background-image: url('/public/works/image.jpg');"
></div>
```

Or if you want to still a div container, you can use the following Tailwind class:

```html
<div class="bg-white rounded-lg p-4">
  <h1>Title</h1>
</div>
```

Each component has a `class` prop, which you can use to add Tailwind classes to the component. These class names can be found on the [Tailwind CSS documentation](https://v2.tailwindcss.com/docs).

## Works

Structure:

```js
{
  workNumber: z.string(),
  title: z.string(),
  shortDesc: z.string(),
  length: z.string(),
  forces: z.string(),
        tags: z.array(
          z.enum([
            "ensemble",
            "soloduo",
            "choral",
            "orchestral",
            "theatre",
            "publication",
          ]),
        ),
        compositionYear: z.string(),
        hire: z.optional(z.boolean()),
        audio: z.any(),
        pdf: z.any(),
        bannerImage: z.optional(image()),
        titleImage: z.optional(image()),
        recording: z.optional(z.string()),
        moreInfo: z.optional(z.boolean()),
  buy: z.optional(z.string()),
}
```

## Recordings

Structure:

```js
{
    title: z.string(),
    url: z.string(),
    description: z.string(),
    banner: z.optional(image()),
    cover: z.optional(image()),
    records: z.optional(
        z.array(
        z.object({
            title: z.string(),
            url: z.optional(z.string()),
        }),
        ),
    ),
}
```

## Media

Structure:

```js
{
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
}
```

## Events

Structure:

```js
{
        title: z.string(),
        date: z.date(),
        location: z.string(),
}
```

## News

Structure:

```js
{
        title: z.string(),
        date: z.date(),
        cover: image(),
}
```

## Projects

Structure:

```js
{
        title: z.string(),
        cover: image(),
}
```
