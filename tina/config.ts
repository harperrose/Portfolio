import { defineConfig } from "tinacms";

const capabilityOptions = [
  "Product Design",
  "Digital Design",
  "Testing and Optimization",
  "Branding & Visual",
  "Web Development",
];

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId:
    process.env.TINA_PUBLIC_CLIENT_ID ||
    process.env.VITE_TINA_CLIENT_ID ||
    null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site Settings",
        path: "content/site",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "infoHeroTitle",
            label: "Info Page Hero Title",
            required: true,
          },
          {
            type: "image",
            name: "infoHeroImage",
            label: "Info Page Hero Image",
          },
          {
            type: "string",
            name: "homeIntroTitle",
            label: "Home Page Intro Title",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "homeBackgroundImage",
            label: "Home Page Background Image",
          },
          {
            type: "string",
            name: "contactHeading",
            label: "Contact Section Heading",
          },
          {
            type: "string",
            name: "colophonText",
            label: "Colophon Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "colophonLinkText",
            label: "Colophon Link Text",
          },
          {
            type: "string",
            name: "colophonLinkUrl",
            label: "Colophon Link URL",
          },
          {
            type: "string",
            name: "copyrightText",
            label: "Copyright Text",
          },
          {
            type: "string",
            name: "arenaUrl",
            label: "Are.na Profile URL",
          },
          {
            type: "string",
            name: "contactSuccessMessage",
            label: "Contact Form Success Message",
          },
          {
            type: "object",
            name: "capabilities",
            label: "Navigation Capabilities",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "anchorId",
                label: "Info Page Section ID",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "service",
        label: "Services",
        path: "content/services",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Service Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Section ID (anchor)",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "object",
            name: "items",
            label: "Gallery Items",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "image",
                name: "image",
                label: "Preview Image",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "Link URL",
              },
              {
                type: "reference",
                name: "caseStudy",
                label: "Linked Case Study (optional)",
                collections: ["project"],
              },
            ],
          },
        ],
      },
      {
        name: "project",
        label: "Case Studies",
        path: "content/projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
            description: "Used in routes, e.g. project-hub-for-material-bank",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            type: "string",
            name: "quote",
            label: "Highlight Quote",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "summary",
            label: "Sidebar Summary",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "capabilities",
            label: "Capabilities",
            list: true,
            options: capabilityOptions,
          },
          {
            type: "number",
            name: "order",
            label: "Home Page Order",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Draft case studies are hidden from the site and return a 404.",
          },
          {
            type: "boolean",
            name: "hidden",
            label: "Hidden",
            description: "Hidden case studies are removed from navigation and the home scroll, but remain accessible by URL.",
          },
          {
            type: "reference",
            name: "nextProject",
            label: "Next Project",
            collections: ["project"],
          },
          {
            type: "object",
            name: "panels",
            label: "Content Panels",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Panel",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Tab Label",
                required: true,
              },
              {
                type: "object",
                name: "blocks",
                label: "Content Blocks",
                list: true,
                templates: [
                  {
                    name: "image",
                    label: "Image",
                    fields: [
                      {
                        type: "image",
                        name: "src",
                        label: "Image",
                        required: true,
                      },
                      { type: "string", name: "alt", label: "Alt Text" },
                    ],
                  },
                  {
                    name: "paragraph",
                    label: "Paragraph",
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Text",
                        ui: { component: "textarea" },
                        required: true,
                      },
                    ],
                  },
                  {
                    name: "doubleImage",
                    label: "Two Images",
                    fields: [
                      {
                        type: "image",
                        name: "left",
                        label: "Left Image",
                        required: true,
                      },
                      {
                        type: "image",
                        name: "right",
                        label: "Right Image",
                        required: true,
                      },
                    ],
                  },
                  {
                    name: "iframe",
                    label: "Embed",
                    fields: [
                      {
                        type: "string",
                        name: "src",
                        label: "Embed URL",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "height",
                        label: "Height",
                        description: "CSS height value, e.g. 60vh",
                      },
                    ],
                  },
                  {
                    name: "beforeAfter",
                    label: "Before / After Slider",
                    fields: [
                      {
                        type: "image",
                        name: "before",
                        label: "Before Image",
                        required: true,
                      },
                      {
                        type: "image",
                        name: "after",
                        label: "After Image",
                        required: true,
                      },
                      { type: "string", name: "alt", label: "Alt Text" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
