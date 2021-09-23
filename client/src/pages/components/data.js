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
  { contacts: "Steve", tag: ["buiness,mom's friend"], category: "business" },
  {
    contacts: "Tony Stark",
    tag: ["buiness,dad's friend"],
    category: "personal",
  },
  { contacts: "Robert", tag: ["buiness,lol"], category: "business" },
  { contacts: "Anna", tag: ["buiness,who"], category: "personal" },
  { contacts: "Strange", tag: ["buiness,magic man"], category: "personal" },
  { contacts: "Peter", tag: ["buiness,spider boi"], category: "business" },
  { contacts: "Scarlet", tag: ["buiness,scary woman"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "business" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
  { contacts: "Hulk", tag: ["buiness,mom's friend"], category: "personal" },
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
