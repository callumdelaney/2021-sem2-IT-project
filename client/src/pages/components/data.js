import { useState } from "react";

const text =
  "Batman[a] is a superhero who appears in American comic books\
              (2016–present) and Robert Pattinson in The Batman (2022). Kevin\
              Conroy, Jason OMara, and Will Arnett, among others, have provided\
              the characters voice. Batman[a] is a superhero who appears in\
              American comic books published by DC Comics. Batman was created by\
              artist Bob Kane and writer Bill Finger, and debuted in the 27th\
              issue of the comic book Detective Comics on March 30, 1939. In the\
              DC Universe continuity, Batman is the alias of Bruce Wayne, a\
              wealthy American playboy, philanthropist, and industrialist who\
              resides in Gotham City. Batmans origin story features him\
              swearing vengeance against criminals after witnessing the murder\
              of his parents Thomas and Martha; he trains himself physically and\
              intellectually, crafts a bat-inspired persona, and monitors the\
              Gotham streets at night. Kane, Finger, and other creators\
              accompanied Batman with supporting characters, including his\
              sidekick Robin; allies Alfred Pennyworth, James Gordon, and\
              Catwoman; and foes such as the Penguin, the Riddler, Two-Face, and\
              his archenemy, the Joker. Kane conceived Batman in early 1939 to\
              capitalize on the popularity of DCs Superman; although Kane\
              frequently claimed sole creation credit, Finger substantially\
              developed the concept from a generic superhero into something more\
              bat-like. The character received his own spin-off publication,\
              Batman, in 1940. Batman was originally introduced as a ruthless\
              vigilante who frequently killed or maimed criminals, but evolved\
              into a character with a stringent moral code and strong sense of\
              justice. Unlike most superheroes, Batman does not possess any\
              superpowers, instead relying on his intellect, fighting skills,\
              and wealth. The 1960s Batman television series used a camp\
              aesthetic, which continued to be associated with the character for\
              years after the show ended. Various creators worked to return the\
              character to his darker roots in the 1970s and 1980s, culminating\
              with the 1986 miniseries The Dark Knight Returns by Frank Miller.\
              DC has featured Batman in many comic books, including comics\
              published under its imprints such as Vertigo and Black Label. The\
              longest-running Batman comic, Detective Comics, is the\
              longest-running comic book in the United States. Batman is\
              frequently depicted alongside other DC superheroes, such as\
              Superman and Wonder Woman, as a member of organizations such as\
              the Justice League and the Outsiders. In addition to Bruce Wayne,\
              other characters have taken on the Batman persona on different\
              occasions, such as Jean-Paul Valley / Azrael in the 1993–1994\
              Knightfall story arc; Dick Grayson, the first Robin, from 2009\
              to 2011; and Jace Fox, son of Waynes ally Lucius, as of 2021.[4]\
              DC has also published comics featuring alternate versions of\
              Batman, including the incarnation seen in The Dark Knight Returns\
              and its successors, the incarnation from the Flashpoint (2011)\
              event, and numerous interpretations from Elseworlds stories. One\
              of the most iconic characters in popular culture, Batman has been\
              listed among the greatest comic book superheroes and fictional\
              characters ever created. He is one of the most commercially\
              successful superheroes, and his likeness has been licensed and\
              featured in various media and merchandise sold around the world;\
              this includes toy lines such as Lego Batman and video games like\
              the Batman: Arkham series. Batman has been adapted in live-action\
              and animated incarnations, including the 1960s Batman television\
              series played by Adam West and in films by Michael Keaton in\
              Batman (1989) and Batman Returns (1992), Val Kilmer in Batman\
              Forever (1995), Christian Bale in The Dark Knight Trilogy\
              (2005–2012), Ben Affleck in the DC Extended Universe\
              (2016–present) and Robert Pattinson in The Batman (2022). Kevin\
              Conroy, Jason OMara, and Will Arnett, among others, have provided\
              the characters voice.\
              (2016–present) and Robert Pattinson in The Batman (2022). Kevin\
              Conroy, Jason OMara, and Will Arnett, among others, have provided\
              the characters voice. Batman[a] is a superhero who appears in\
              American comic books published by DC Comics. Batman was created by\
              artist Bob Kane and writer Bill Finger, and debuted in the 27th\
              issue of the comic book Detective Comics on March 30, 1939. In the\
              DC Universe continuity, Batman is the alias of Bruce Wayne, a\
              wealthy American playboy, philanthropist, and industrialist who\
              resides in Gotham City. Batmans origin story features him\
              swearing vengeance against criminals after witnessing the murder\
              of his parents Thomas and Martha; he trains himself physically and\
              intellectually, crafts a bat-inspired persona, and monitors the\
              Gotham streets at night. Kane, Finger, and other creators\
              accompanied Batman with supporting characters, including his\
              sidekick Robin; allies Alfred Pennyworth, James Gordon, and\
              Catwoman; and foes such as the Penguin, the Riddler, Two-Face, and\
              his archenemy, the Joker. Kane conceived Batman in early 1939 to\
              capitalize on the popularity of DCs Superman; although Kane\
              frequently claimed sole creation credit, Finger substantially\
              developed the concept from a generic superhero into something more\
              bat-like. The character received his own spin-off publication,\
              Batman, in 1940. Batman was originally introduced as a ruthless\
              vigilante who frequently killed or maimed criminals, but evolved\
              into a character with a stringent moral code and strong sense of\
              justice. Unlike most superheroes, Batman does not possess any\
              superpowers, instead relying on his intellect, fighting skills,\
              and wealth. The 1960s Batman television series used a camp\
              aesthetic, which continued to be associated with the character for\
              years after the show ended. Various creators worked to return the\
              character to his darker roots in the 1970s and 1980s, culminating\
              with the 1986 miniseries The Dark Knight Returns by Frank Miller.\
              DC has featured Batman in many comic books, including comics\
              published under its imprints such as Vertigo and Black Label. The\
              longest-running Batman comic, Detective Comics, is the\
              longest-running comic book in the United States. Batman is\
              frequently depicted alongside other DC superheroes, such as\
              Superman and Wonder Woman, as a member of organizations such as\
              the Justice League and the Outsiders. In addition to Bruce Wayne,\
              other characters have taken on the Batman persona on different\
              occasions, such as Jean-Paul Valley / Azrael in the 1993–1994\
              Knightfall story arc; Dick Grayson, the first Robin, from 2009\
              to 2011; and Jace Fox, son of Waynes ally Lucius, as of 2021.[4]\
              DC has also published comics featuring alternate versions of\
              Batman, including the incarnation seen in The Dark Knight Returns\
              and its successors, the incarnation from the Flashpoint (2011)\
              event, and numerous interpretations from Elseworlds stories. One\
              of the most iconic characters in popular culture, Batman has been\
              listed among the greatest comic book superheroes and fictional\
              characters ever created. He is one of the most commercially\
              successful superheroes, and his likeness has been licensed and\
              featured in various media and merchandise sold around the world;\
              this includes toy lines such as Lego Batman and video games like\
              the Batman: Arkham series. Batman has been adapted in live-action\
              and animated incarnations, including the 1960s Batman television\
              series played by Adam West and in films by Michael Keaton in\
              Batman (1989) and Batman Returns (1992), Val Kilmer in Batman\
              Forever (1995), Christian Bale in The Dark Knight Trilogy\
              (2005–2012), Ben Affleck in the DC Extended Universe\
              (2016–present) and Robert Pattinson in The Batman (2022). Kevin\
              Conroy, Jason OMara, and Will Arnett, among others, have provided\
              the characters voice.";

const tableData = [
  {
    id: "1",
    contacts: "Steve Rogers Junior",
    tag: ["buiness,mom's friend"],
    category: "business",
    phoneNumber: "04010102",
    email: "xqweqwe@gmail.com",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Chris_Evans_SDCC_2010_2.jpg/1024px-Chris_Evans_SDCC_2010_2.jpg",
    notes:
      "Mauris consectetur, metus sit amet tempus gravida, dui dolor commodo arcu, a auctor lectus erat et leo. Mauris cursus egestas neque vitae tincidunt. Phasellus facilisis mauris et mi elementum, a tincidunt est congue. Duis mattis, nulla quis egestas auctor, ex lorem hendrerit ante, nec consectetur dui enim in est. Quisque enim dui, faucibus sed elementum nec, euismod eu lorem. Donec maximus odio ac enim efficitur, ac malesuada urna viverra. Nam et pulvinar ipsum. Maecenas at congue quam, ac ultricies mi. Praesent hendrerit ipsum non libero venenatis, quis eleifend arcu vestibulum.\
      Mauris consectetur, metus sit amet tempus gravida, dui dolor commodo arcu, a auctor lectus erat et leo. Mauris cursus egestas neque vitae tincidunt. Phasellus facilisis mauris et mi elementum, a tincidunt est congue. Duis mattis, nulla quis egestas auctor, ex lorem hendrerit ante, nec consectetur dui enim in est. Quisque enim dui, faucibus sed elementum nec, euismod eu lorem. Donec maximus odio ac enim efficitur, ac malesuada urna viverra. Nam et pulvinar ipsum. Maecenas at congue quam, ac ultricies mi. Praesent hendrerit ipsum non libero venenatis, quis eleifend arcu vestibulum.",
  },

  {
    id: "2",
    contacts: "Tony Stark",
    tag: ["buiness,dad's friend"],
    category: "personal",
    phoneNumber: "04010102",
    email: "xqweqwe@gmail.com",
    photo:
      "https://i.pinimg.com/564x/db/38/29/db382916e20ffe546ff6e5ae6a1b0de0.jpg",
    notes:
      "Mauris consectetur, metus sit amet tempus gravida, dui dolor commodo arcu, a auctor lectus erat et leo. Mauris cursus egestas neque vitae tincidunt. Phasellus facilisis mauris et mi elementum, a tincidunt est congue. Duis mattis, nulla quis egestas auctor, ex lorem hendrerit ante, nec consectetur dui enim in est. Quisque enim dui, faucibus sed elementum nec, euismod eu lorem. Donec maximus odio ac enim efficitur, ac malesuada urna viverra. Nam et pulvinar ipsum. Maecenas at congue quam, ac ultricies mi. Praesent hendrerit ipsum non libero venenatis, quis eleifend arcu vestibulum.",
  },
  {
    id: "3",
    contacts: "Robert",
    tag: ["buiness,lol"],
    category: "business",
    phone: "04010102",
    email: "xqweqwe@gmail.com",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mattis lacus. Quisque risus lacus, lobortis sit amet convallis in, ullamcorper non augue. Etiam mollis turpis et diam sagittis, id malesuada lacus aliquam. Suspendisse tempor condimentum felis eget tristique. Fusce in pulvinar odio. Donec rutrum nunc ut erat rhoncus sagittis sit amet ac augue. Pellentesque eu arcu tempor turpis mattis sagittis id ut tellus. Cras finibus odio ac facilisis convallis. Nullam in dapibus nibh, eget suscipit mauris.",
  },
  { id: "4", contacts: "Anna", tag: ["buiness,who"], category: "personal" },
  {
    id: "5",
    contacts: "Strange",
    tag: ["buiness,magic man"],
    category: "personal",
    photo:
      "https://am24.mediaite.com/tms/cnt/uploads/2021/08/doctor-strange-spider-man-no-way-home.jpg",
  },
  {
    id: "6",
    contacts: "Peter",
    tag: ["buiness,spider boi"],
    category: "business",
    photo:
      "https://drive.google.com/file/d/1UU_ybmsKFitP4Z4C65r0HCjhAzgjEAfZ/view?usp=sharing",
  },
  {
    id: "7",
    contacts: "Scarlet",
    tag: ["buiness,scary woman"],
    category: "personal",
  },
  {
    id: "8",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "9",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "10",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "11",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "12",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "31",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "14",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "15",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "17",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "19",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "123",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "42",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "12334",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "4123",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "432",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "323",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "232323",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "424",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "business",
  },
  {
    id: "51",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  {
    id: "1232222",
    contacts: "Hulk",
    tag: ["buiness,mom's friend"],
    category: "personal",
  },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  // { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
];

var contactInfo = "da";
//{
//   firstName: undefined,
//   lastName: undefined,
//   email: undefined,
//   phoneNumber: undefined,
//   category: undefined,
//   notes: undefined,
//   photo: undefined,
// };

export { text, tableData, contactInfo };
