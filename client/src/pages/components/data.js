const tableData = [
    {
        id: "1",
        firstName: "Steve",
        lastName: "Rogers Junior",
        tags: [
            {
                _id: 0,
                tagText: "dad",
                tagColour:
                    "#" + Math.floor(Math.random() * 200000).toString(16),
            },
            {
                _id: 1,
                tagText: "America",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
            {
                _id: 2,
                tagText: "AmericanHero",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
            {
                _id: 3,
                tagText: "Chris",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
            {
                _id: 4,
                tagText: "Evans",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
        phoneNumber: "04010102",
        email: "xqweqwe@gmail.com",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Chris_Evans_SDCC_2010_2.jpg/1024px-Chris_Evans_SDCC_2010_2.jpg",
        notes: "Mauris consectetur, metus sit amet tempus gravida, dui dolor commodo arcu, a auctor lectus erat et leo. Mauris cursus egestas neque vitae tincidunt. Phasellus facilisis mauris et mi elementum, a tincidunt est congue. Duis mattis, nulla quis egestas auctor, ex lorem hendrerit ante, nec consectetur dui enim in est. Quisque enim dui, faucibus sed elementum nec, euismod eu lorem. Donec maximus odio ac enim efficitur, ac malesuada urna viverra. Nam et pulvinar ipsum. Maecenas at congue quam, ac ultricies mi. Praesent hendrerit ipsum non libero venenatis, quis eleifend arcu vestibulum. Mauris consectetur, metus sit amet tempus gravida, dui dolor commodo arcu, a auctor lectus erat et leo. Mauris cursus egestas neque vitae tincidunt. Phasellus facilisis mauris et mi elementum, a tincidunt est congue. Duis mattis, nulla quis egestas auctor, ex lorem hendrerit ante, nec consectetur dui enim in est. Quisque enim dui, faucibus sed elementum nec, euismod eu lorem. Donec maximus odio ac enim efficitur, ac malesuada urna viverra. Nam et pulvinar ipsum. Maecenas at congue quam, ac ultricies mi. Praesent hendrerit ipsum non libero venenatis, quis eleifend arcu vestibulum.",
    },

    {
        id: "2",
        firstName: "Tony",
        lastName: "Stank",
        tags: [
            {
                _id: 4,
                tagText: "niece",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
        phoneNumber: "002",
        email: "xqweqwe@gmail.com",
        photo: "https://i.pinimg.com/564x/db/38/29/db382916e20ffe546ff6e5ae6a1b0de0.jpg",
        notes: "Mauris consectetur, metus sit amet tempus gravida, dui dolor commodo arcu, a auctor lectus erat et leo. Mauris cursus egestas neque vitae tincidunt. Phasellus facilisis mauris et mi elementum, a tincidunt est congue. Duis mattis, nulla quis egestas auctor, ex lorem hendrerit ante, nec consectetur dui enim in est. Quisque enim dui, faucibus sed elementum nec, euismod eu lorem. Donec maximus odio ac enim efficitur, ac malesuada urna viverra. Nam et pulvinar ipsum. Maecenas at congue quam, ac ultricies mi. Praesent hendrerit ipsum non libero venenatis, quis eleifend arcu vestibulum.",
    },
    {
        id: "3",
        firstName: "Robert",
        tags: [
            {
                _id: 2,
                tagText: "cousin",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
        phone: "04010102",
        email: "xqweqwe@gmail.com",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mattis lacus. Quisque risus lacus, lobortis sit amet convallis in, ullamcorper non augue. Etiam mollis turpis et diam sagittis, id malesuada lacus aliquam. Suspendisse tempor condimentum felis eget tristique. Fusce in pulvinar odio. Donec rutrum nunc ut erat rhoncus sagittis sit amet ac augue. Pellentesque eu arcu tempor turpis mattis sagittis id ut tellus. Cras finibus odio ac facilisis convallis. Nullam in dapibus nibh, eget suscipit mauris.",
    },
    { id: "4", firstName: "Anna", tags: [], category: "personal" },
    {
        id: "5",
        firstName: "Strange",
        tags: [
            {
                _id: 1,
                tagText: "uncle",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
        photo: "https://am24.mediaite.com/tms/cnt/uploads/2021/08/doctor-strange-spider-man-no-way-home.jpg",
    },
    {
        id: "6",
        firstName: "Peter",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
        photo: "https://drive.google.com/file/d/1UU_ybmsKFitP4Z4C65r0HCjhAzgjEAfZ/view?usp=sharing",
    },
    {
        id: "7",
        firstName: "Scarlet",
        tags: [
            {
                _id: 2,
                tagText: "cousin",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "8",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "9",
        firstName: "Hulk",
        tags: [
            {
                _id: 2,
                tagText: "cousin",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "10",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "31",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "14",
        firstName: "Hulk",
        tags: [
            {
                _id: 4,
                tagText: "niece",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "15",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "12334",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "4123",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "432",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "323",
        firstName: "Hulk",
        tags: [
            {
                _id: 4,
                tagText: "niece",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "232323",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "424",
        firstName: "Hulk",
        tags: [
            {
                _id: 4,
                tagText: "niece",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "business",
    },
    {
        id: "51",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    {
        id: "1232222",
        firstName: "Hulk",
        tags: [
            {
                _id: 3,
                tagText: "brother",
                tagColour: "#" + Math.floor(Math.random() * 200).toString(16),
            },
        ],
        category: "personal",
    },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "business" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "personal" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "business" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "business" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "personal" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "personal" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "business" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "personal" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "business" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "business" },
    // { firstName: "Hulk", tags: ["buiness,mom's friend"], category: "personal" },
];

export { tableData };
