export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  summary: string;
  completedDate: string;
  category: string;
}

export const books: Book[] = [
  {
    id: 15,
    title: "Pnin",
    author: "Vladimir Nabokov",
    cover: "https://covers.openlibrary.org/b/id/637203-M.jpg",
    summary: "Marvelous. It is always delightful, if at times daunting, to return to fine literature, especially after a stent in non-fiction. Nabokov layers Pnin\u2019s story so delicately that he becomes a figure both admirable and tragic, all while remaining a simple man. Pnin is the story of a displaced generation, an excised way of life, but most of all, a man who sees others and hopes to provide his hospitality while remaining inextricably himself",
    completedDate: "July 2026",
    category: "Fiction"
  },
  {
    id: 16,
    title: "The Correspondent",
    author: "Virginia Evans",
    cover: "https://covers.openlibrary.org/b/id/15232808-M.jpg",
    summary: "What catharsis is there in knowing another\u2019s grief? This book struck such a chord as I drew parallels between Sybil and my mother. In many ways, these two women experienced a very similar tragedy, yet they emerged from them entirely differently. Knowing the redemption which Sybil finally found, yet my mother never had to seek, makes me all the more impressed by and grateful for her strength.",
    completedDate: "July 2026",
    category: "Fiction"
  },
  {
    id: 17,
    title: "Nudge (The Final Edition)",
    author: "Thaler, Richard; Sunstein, Cass",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "I wouldn\u2019t expect to hear Don Norman referenced in the final edition of this book, but I enjoyed it as both extension of my studies in behavioral economics and human center design. This takes a great wise home, understand behavior and motivation, and I appreciated it, ensuring on human behavior, other than numerical analysis.",
    completedDate: "July 2026",
    category: "Psychology"
  },
  {
    id: 18,
    title: "Mistborn: The Lost Metal",
    author: "Brandon Sanderson",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "As was true from the first pages of \"The Alloy of Law,' Sanderson maintained the energy of Mistnorn era one throughout the Wax and Wayne series. And even though I struggled to relate to cosmic threats, I still adored the story. The creation of the Cosmere comes a little heavy-handed at times though I suspect it reads more tactfully once I've made my way through the storm light archives. So I'm glad I have plenty to look forward to.",
    completedDate: "June 2026",
    category: "Fantasy"
  },
  {
    id: 19,
    title: "The Headmaster",
    author: "John McPhee",
    cover: "https://covers.openlibrary.org/b/id/6800618-M.jpg",
    summary: "How does one ensure the right legacy? It is a grand question with a simple answer\u2014by living an honest life, unyielding to one's ideals, in service of a greater good. Finding that greater good to which we are well-matched may take some time, yet I cannot help but feel that Boyden provides some good examples of how to behave once you do.",
    completedDate: "June 2026",
    category: "Biography"
  },
  {
    id: 20,
    title: "Rationality: What It Is, Why It Seems Scarce, Why It Matters",
    author: "Steven Pinker",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "While it may be a touch heavy on practical analysis of statistics (especially so in audiobook format), and a bit light on novel discoveries in behavioral economics, I still enjoyed the book. Just don't listen to it unless you do so with a sheet of paper, pen, and calculator nearby.",
    completedDate: "June 2026",
    category: "Psychology"
  },
  {
    id: 21,
    title: "A Natural History of the Senses",
    author: "Dianne Ackerman",
    cover: "https://covers.openlibrary.org/b/id/420230-M.jpg",
    summary: "Like many works that are a collection of shorter thoughts, I imagine I will surely return to this time and time again. Yet for my first pass, while incomplete, I was delighted to find such an extraordinaryly colorful and descriptive interpretation of the senses. I cannot wait to, one day, rediscover this work while enjoying a cup of tea and the fall foliage here at the lake.",
    completedDate: "June 2026",
    category: "Science"
  },
  {
    id: 22,
    title: "Mistborn: The Allow of Law",
    author: "Brandon Sanderson",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "I thought about waiting until the end of the saga to write my summary note, but I couldn't help myself. I forgot how much I loved Sanderson's pacing, his witty characters, and the Mistborne universe. W&W preserves all the fun of the first saga while improving the humor and dialog. I'm looking forward to the rest.",
    completedDate: "May 2026",
    category: "Fantasy"
  },
  {
    id: 23,
    title: "The Wide Wide Sea",
    author: "Hampton Sides",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "While it may not have served in a manual of leadership as expected (this may not have even been the book about Cpt. Cook that my dad read), this was an engaging account of maritime adventures, perfect for cold stormy commutes to school and back.",
    completedDate: "May 2026",
    category: "History"
  },
  {
    id: 24,
    title: "Neuromancer",
    author: "William Gibdon",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "I certainly appreciate Neuromancer's work in establishing the cyberpunk genre, and I found the world building to be rich and entertaining. That said, I thought the fragmented and disjointed style of the narrative to take away from my immersion. Rather than slipping into an alternate reality, I felt as though I had to work to maintain a sense of cohesion amongst the colorful and chaotic background of Gibson's future.",
    completedDate: "April 2026",
    category: "Science Fiction"
  },
  {
    id: 25,
    title: "Shoe Dog",
    author: "Phil Knight",
    cover: "https://covers.openlibrary.org/b/id/8858487-M.jpg",
    summary: "Greatness may be as illusive a concept as Phil Knight\u2019s faith, yet it is also as undeniable. What does greatness demand of us? Everything. Spoiled relationships, compromised physical health, an obsession that excludes all else. This greatness lives in Phil Knight and it lives in Nike. It pushed each of them to previously unimaginable heights, yet it also took its toll. Knight ends with an encouragement, a perspective, but also a warning. For those of us who sense the edges of greatness, how are we supposed to know whether or not its worth pursuing when we know neither the reward or the price.",
    completedDate: "April 2026",
    category: "Business"
  },
  {
    id: 26,
    title: "Building a StoryBrand 2.0: Clarify Your Message So Customers Will Listen",
    author: "Donald Miller",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "Although the book is a little heavy-handed and selling itself, I am a sucker for anything which package is learning within a narrative arc. I found the guiding questions to be more informative than the anecdotes, but it was still an enjoyable read overall.",
    completedDate: "April 2026",
    category: "Business"
  },
  {
    id: 27,
    title: "The Brand Gap",
    author: "Marty Neumeier",
    cover: "https://covers.openlibrary.org/b/id/193786-M.jpg",
    summary: "A quick and reflective read. Although dated in some of its examples, its learnings are thought provoking and serve as good considerations when one is approaching active brand management. I especially appreciate the idea that a modern brand lives in the mind of consumers, not in the products of a company.",
    completedDate: "April 2026",
    category: "Business"
  },
  {
    id: 28,
    title: "Anaximander",
    author: "Carlo Rovelli",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "I was gifted this book by Todd Davis in my departure from BH as he looked to bridge my interests in the ancient world and modern technology plus science. I can't imagine that Todd also suspected it would serve to further my thinking on philosophy \u2013 so great has become my interest. It is, undoubtedly important to ask how, yet so too is it critical to ask why? That annex exander should have done so while entertaining the possibility that his mentor an existing knowledge may be incomplete or incorrect was truly an active bravery. What paradigms then would I be well served to reconsider?",
    completedDate: "April 2026",
    category: "Philosophy"
  },
  {
    id: 29,
    title: "Predictably Irrational",
    author: "Dan Ariely",
    cover: "https://covers.openlibrary.org/b/id/2314080-M.jpg",
    summary: "I found this book to be a significantly watered-down version of Thinking: Fast and Slow. Though the narrative recounts of the study were entertaining, I felt they offered less insight into true behavioral understanding than other cases presented in Sapiens or TFaS. Nevertheless, I enjoyed the read.",
    completedDate: "March 2026",
    category: "Psychology"
  },
  {
    id: 30,
    title: "Dark Matter",
    author: "Blake Crouch",
    cover: "https://covers.openlibrary.org/b/id/7436634-M.jpg",
    summary: "The writing complexity may not inspire the next virtuoso to pick up his pen, but the story is an excellent one Crouch manages to avoid incoherence which threatens any time travel/parallel narrative setting and deliver a compelling adventure. His dialogue is natural if rough, but doesn\u2019t stand in the way of helping us ask \u201cwhat would I do to get back home again.\u201c While this book doesn\u2019t stand a top of my list of sci-fi grades, I sure did lose sleep as I couldn\u2019t wait to read the next chapter.",
    completedDate: "March 2026",
    category: "Science Fiction"
  },
  {
    id: 31,
    title: "Family Wealth: Keeping It in the Family--How Family Members and Their Advisers Preserve Human, Intellectual, and Financial Assets for Generations",
    author: "James E. Hughes Jr.",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "While I wasn't sure what to expect from this book, I was hoping to find strategies and techniques derived from best practices in asset management. I was happy to find a more human approach that recognized human and intellectual, as well as financial, capital.",
    completedDate: "March 2026",
    category: "Business"
  },
  {
    id: 32,
    title: "Service Design",
    author: "Lavrans, Polaine, Reason",
    cover: "https://covers.openlibrary.org/b/id/9336774-M.jpg",
    summary: "With a book such as this, it feels unfair to say I am 'done' reading it, but the semester is over and it is time to move on. I appreciated the tangibility of service blueprints and touchpoint inventories offered here, and while the book attempts to survey how service design fits within Design as a whole, I would steer readers towards more targeted selections within Rosenfeld's cannon unless they needed a reference for service design frameworks.",
    completedDate: "March 2026",
    category: "Design"
  },
  {
    id: 33,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://covers.openlibrary.org/b/id/11200092-M.jpg",
    summary: "\u201cI would kill a man for rocky\u201d was Peter Knowlton\u2019s response when he learned I was reading Hail Mary, and I believe he\u2019s right to say so. This interstellar adventure related some of both the scientific and the deeply human truths of being alone in a world. I am in support of the re-emerging trend of space adventure movies (we need new IP in Hollywood), so I\u2019m looking forward to seeing the silver screen adaptation soon. Finally, I\u2019ll admit, I stayed up much too late last night to finish the story, but isn\u2019t that the whole point of a great read.",
    completedDate: "March 2026",
    category: "Science Fiction"
  },
  {
    id: 34,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "The survey of humankind from its inception to its potential curtain call, is not an endeavor to be taken lightly, but (author) has done an excellent job. I appreciated the organizational structure of evolutionary technologies shifting into ideologies, and finalizing with super-human potentialities. And while I still think it\u2019s important to ask why we are, I look forward to considering more fully what we want to be.",
    completedDate: "February 2026",
    category: "History"
  },
  {
    id: 35,
    title: "Goethe's Faust",
    author: "Walter Kaufmann",
    cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "While I still have a ways to go before I can appreciate all the nuances of German literature, I still loved reading Faust. Kaufmann does an incredible job of preserving the rhyme scheme, and the narrative and poetic rhythms carried the story with such drive. I don\u2019t know if I agree with exonerating Faust simply because he strives, but if my love for Excelsior by Longfellow should serve as my guide, I do well to exercise a bit more of the virgin mother\u2018s grace.",
    completedDate: "February 2026",
    category: "Fiction"
  },
  {
    id: 36,
    title: "Do Androids Dream of Electric Sheep",
    author: "Philip K. Dick",
    cover: "https://covers.openlibrary.org/b/id/207515-M.jpg",
    summary: "As AI emerges in our daily lives, and the Internet \u2013 the greatest tool in the pursuit of free information \u2013 is distorted in undermined, as humans spend more and more time in digital worlds, I have started to ask myself what it means to be human. As Dick identified over 50 years ago, it is not our intellect already surpassed by machines. Perhaps it is not even our creativity \u2013 is there such a thing as original thought. Then it is our empathy \u2013 our connection to something which extends beyond the individual. That greater energy, which abuse all things. Or maybe it's just another cool story about robot robots.",
    completedDate: "",
    category: "Science Fiction"
  },
  {
    id: 37,
    title: "Say Nothing",
    author: "Patrick Radden Keefe",
    cover: "https://covers.openlibrary.org/b/id/9242450-M.jpg",
    summary: "Like Keith, I grew up in Boston, immersed in the \"Shamrock in Guinness sympathies\". I suppose that I felt a greater association with this identity than he, but I've known that I knew too little since my 2018 cycling trip to Northern Ireland about Irish history. I thoroughly enjoyed the narrative. Keith was able to extricate through his extensive research. The action and suspense of the troubles are well captured here, and the story feels relevant to a wider audience than we plastic patties. From here, I look forward to knowing more about my past, if only two better understand my story.",
    completedDate: "",
    category: "True Crime"
  },
  {
    id: 14,
    title: "Stranger in a Strange Land",
    author: "Robert A. Heinlein",
    cover: "https://target.scene7.com/is/image/Target/GUEST_e503b92b-843c-4ee3-9687-2dad78f76439?wid=300&hei=300&fmt=pjpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "I do not grok this story, but waiting is not yet full. Heinlein exposes so much of what it means to be human and to struggle with the concept of God through the lens of an off-worlder, yet the greatest wisdom still comes from a crotchety old man. I sense this book is a great goodness, and I look forward to how my perception of it changes as I grow.",
    completedDate: "January 2026",
    category: "Fiction"
  },{
    id: 13,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "https://target.scene7.com/is/image/Target/GUEST_229f3fe4-ab67-4589-ad8b-45b6378be7a6?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "How many years later have I now returned to find a new book within the same pages. No longer do I find a lousy anti-hero with whom to celebrate the shortcomings of institutions. Rather, I'm challenged to consider my own relationship with inhabited authority and left to wonder if I've been a good role model for the boys I've taught.",
    completedDate: "January 2026",
    category: "Fiction"
  },
  {
    id: 12,
    title: "The Chronicals of Narnia",
    author: "C.S. Lewis",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661032875i/11127.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "I suspect that we all, in time, come to consider the true myth. Christian allegory provides a magical framework to Narnia, and I especially appreciate the book-ending theme of worlds within worlds. I suspect that our reality is not so finite as we percieve, and I enjoy exploring the possibility of fantasy. I may not yet be ready to welcome Christ back into my life, but I hope that, if I continue to act according to my own will while holding good in my heart, I will be delivered from Evil and allowed to experience all that the true kingdom has to offer.",
    completedDate: "November 2025",
    category: "Fiction"
  },
  {
    id: 1,
    title: "What Design Can't Do",
    author: "Silvio Lorusso",
    cover: "https://www.setmargins.press/wp-content/uploads/2023/07/ABE_20231122_Whatdesigncantdo_042-2500x0-c-default.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "A pessimistic approach to design.",
    completedDate: "November 2025",
    category: "Design"
  },
  {
    id: 2,
    title: "Design is Storytelling",
    author: "Ellen Lupton",
    cover: "https://cdn.bookey.app/files/publish-book/Design_Is_Storytelling_6556572.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "A thoughtful exploration of how design creates narratives and guides users through experiences.",
    completedDate: "October 2025",
    category: "Design"
  },
  {
    id: 3,
    title: "Extra Bold",
    author: "Ellen Lupton, Farah Kafei, et al.",
    cover: "https://imgv2-2-f.scribdassets.com/img/document/694453869/original/6b5b1c3e9c/1706229141?v=1?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "A feminist, inclusive approach to graphic design for social change.",
    completedDate: "October 2025",
    category: "Design"
  },
  {
    id: 4,
    title: "The Art of War",
    author: "Sun Tzu",
    cover: "https://images.booksense.com/images/556/593/9781604593556.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "Ancient military strategy that translates surprisingly well to modern business and design thinking.",
    completedDate: "October 2025",
    category: "Strategy"
  },
  {
    id: 5,
    title: "Arcanum Unbounded",
    author: "Brandon Sanderson",
    cover: "https://pictures.abebooks.com/inventory/31351128394.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "A collection of short stories from the Cosmere universe, showcasing Sanderson's intricate world-building.",
    completedDate: "September 2025",
    category: "Fiction"
  },
  {
    id: 6,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    cover: "https://m.media-amazon.com/images/I/91t2EXhrJwL._SL1500_.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "A hilarious, absurdist journey through space that reminds us not to take anything too seriously.",
    completedDate: "September 2025",
    category: "Fiction"
  },
  {
    id: 7,
    title: "No One Ever Told Us That",
    author: "John Spooner",
    cover: "https://m.media-amazon.com/images/I/51xQP1XzeeL._SL1360_.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "Practical wisdom and life lessons that should have been taught but weren't.",
    completedDate: "September 2025",
    category: "Self-Help"
  },
  {
    id: 8,
    title: "Good to Great",
    author: "Jim Collins",
    cover: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/img475.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "An analysis of what separates good companies from truly great ones, with timeless principles for excellence.",
    completedDate: "August 2025",
    category: "Business"
  },
  {
    id: 9,
    title: "Interviewing Users",
    author: "Steve Portigal",
    cover: "https://m.media-amazon.com/images/I/712lkBWiTDL.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "A comprehensive guide to conducting effective user research interviews and extracting valuable insights.",
    completedDate: "October 2025",
    category: "Design"
  },
  {
    id: 10,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9780743273565/the-great-gatsby-9780743273565_hr.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
    summary: "Ive read Gatsby three or four times now, but in the words of ___, it gets better every time.",
    completedDate: "September 2025",
    category: "Fiction"
  },
  {
    id: 11,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "https://dansilvestre.com/wp-content/uploads/2021/04/71HXn7NT7DL.jpg&cs=tinysrgb&w=300&h=400",
    summary: "Kahneman's insights into cognitive biases have profoundly influenced my user research methodology. Understanding System 1 and System 2 thinking helps me design interfaces that work with, rather than against, human psychology. Essential reading for any designer working on complex systems.",
    completedDate: "Currently Reading",
    category: "Psychology"
  }
];
