import { createMedia } from "@artsy/fresnel";

const ExampleAppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1200,
    xl: 1201,
  },
});

export const mediaStyle = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
