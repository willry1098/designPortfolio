export interface ProjectSection {
  type: 'text' | 'image' | 'split' | 'quote' | 'stats' | 'video';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  quote?: string;
  author?: string;
  stats?: Array<{ label: string; value: string }>;
  video?: string;
  videoAlt?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  overview: string;
  role: string;
  duration: string;
  team: string;
  tags: string[];
  hcdPhases: {
    user?: ProjectSection[];
    define?: ProjectSection[];
    ideate?: ProjectSection[];
    prototype?: ProjectSection[];
    test?: ProjectSection[];
  };
  outcome: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: 'chapel-row-markers',
    title: 'Chapel Row Markers',
    subtitle: 'Student-Generated Designs Improving Timeless Chapel',
    category: 'Design Education & Physical Product',
    heroImage: '/IMG_5513_edited copy.jpg',
    overview: 'In spring 2024, I guided six ninth-grade engineering students through a semester-long redesign of our school\'s chapel row markers. The project aimed to practically demonstrate human centered design principles to create durable, aesthetically coherent seating plaques that would honor the space\'s tradition while improving organization during assemblies. The project fused education, design, and community impact, culminating in over 100 student-fabricated plaques now permanently installed in the school\'s chapel.',
    role: 'Teacher (Team Manager), Lead Designer',
    duration: '3 months',
    team: '1 teacher, 6 students',
    tags: ['Design Education', 'Physical Design', 'Fabrication', 'Student Projects'],
    hcdPhases: {},
    outcome: '',
    sections: [
      {
        type: 'split',
        title: '\"Who needs what and why?\"',
        content: 'was the question I repeatedly presented to our class. Through the class project, the team arrived at \'Belmont Hill needs more-permanent row markers to help students find their seats in chapel because the current paper signs do not match the aethestics of the rest of the chapel.\' This led the team to begin by measuring the current markers and the pews, researching available materials for prototyping, and conducting interviews with the Director of Facilities regarding the design language of the building and school branding.',
        image: '/IMG_4444.jpg',
        imageAlt: 'Students conducting research in chapel',
        imagePosition: 'right'
      },
      {
        type: 'quote',
        quote: 'We wanted to create something that would last and make the chapel better for everyone.',
        author: 'Student Team Member'
      },
      {
        type: 'split',
        title: 'To R, or not to R',
        content: 'The team explored multiple design variables through sketching and physical prototyping. We tested different materials, fonts, and finishes to find the perfect balance between durability, readability, and aesthetic balance with the chapel\'s traditional architecture. During this stage, students learned how to design with vector-editing software (Inkscape), operate our lazer cutter, and practice feedback mechanisms such as dot-voting and user-interviews. The decision to exclude the \"R\" emblem originally proved contentios amongst the team, but user feedback revealed clear ambiguity as to whether this represented \"row,\" \"stage right,\" or \"house right,\" and so the team decided on a minimal design excluding the \"R\" in order to simplify the process for users.',
        image: '/IMG_4536.jpg',
        imageAlt: 'Student design prototypes',
        imagePosition: 'left'
      },
      {
        type: 'text',
        title: 'Who (really) makes the decisions?',
        content: 'After our best efforts as designers, we must, invariably, put our work forward for the judgement (and often the selctection) of others. Towards the end of the class project, we had the chance to meet again with the Director of Facilities, the Chair of Campus Operations (boardmember representative), and the Headmaster. This gave the students the chance to present their work to the stakeholders and learn to reconcile their designs and persoanl attatchments with \"client\" interests. The team placed various prototypes in situ then solicited feedback from these stakeholders to inform their final design.'
      },
      {
        type: 'image',
        image: '/IMG_4627.jpg',
        imageAlt: 'Evaluating prototypes in place'
      },
      {
        type: 'split',
        title: 'Lessons at Scale',
        content: 'After finalizing our design the team used the school makerspace to laser-cut over 100 plaques, through which students learned tricks such as batch processing for ensuring consistency of alignment, cut depth, and clarity when producing at scale. After production, the team collaborated with facilities staff for installation where the students had the chance to practice the ability to bring another team onto a project and communicate expectations and requirements such as positioning and ordering of the new row markers.',
        image: '/IMG_5487.jpg',
        imageAlt: 'Students fabricating markers',
        imagePosition: 'right'
      },
      {
        type: 'stats',
        stats: [
          { label: 'Plaques fabricated', value: '100+' },
          { label: 'Student team size', value: '6' },
          { label: 'Design iterations', value: '12+' }
        ]
      },
      {
        type: 'split',
        title: 'Legacy Impact',
        content: 'These chapel row markers represent more than functional plaques; they are the product of team-initative, user-centered design, and experiential learning. Every time the school community gathers in chapel, the team gets to see their work serving a real need. This project demonstrates how design education can create lasting value while teaching essential skills in creativity, problem-solving, and collaboration.',
        image: '/IMG_5513_edited copy.jpg',
        imageAlt: 'Chapel with installed row markers',
        imagePosition: 'left'
      }
    ]
  },
  {
    id: 'chapel-app',
    title: 'Chapel App',
    subtitle: 'A Smarter System for Chapel Seating and Attendance',
    category: 'Mobile App Design',
    heroImage: '/IMG_5510.jpg',
    overview: 'When I returned to my high school as a faculty member, I found that our assembly attendance system still relied on paper, clipboards, and Excel charts. I designed and developed a two-part application to automate seat assignments and streamline attendance tracking, replacing hours of manual administrative work with an automated workflow. The project merged Python scripting and a Java-based mobile interface to deliver real-time attendance data while integrating into the existing the structure and routines of weekly assemblies.',
    role: 'Lead Product Designer, UX Researcher, Software Engineer',
    duration: '2 months',
    team: 'Solo, partnered closely with school\'s program directors',
    tags: ['Mobile Design', 'Automation', 'Data Systems', 'User Research'],
    hcdPhases: {},
    outcome: '',
    sections: [
      {
        type: 'text',
        title: 'Moving Beyond the Paper Age',
        content: 'After observing the workflows of assembley proctors and administrators responsible for taking attendance, I knew I could develope a better solution for the school. I mapped user interactions from start-of-year seat assignment through daily attendance logging to identify opportunities for automation. I interviewed these users to define technical comfort levels, available data formats, and desired outputs (mobile app, graphic layout, email integration). Through my interviews, I learned that the most approporate solutuion would include two parts: a program which automatically assigned students into an Excel sheet representation of the chapel and a simple digital interface that faculty could use to check-off present students then submit to administration office for attendance.'
      },
      {
        type: 'split',
        title: 'Automating the Mundane',
        content: 'Copying and pasting students names into a geometrically-complex seating layout is, at best, monotonous. More relevantly, it was manual, time-intensive, and error-prone. Seat assignments were built by hand in Excel each year requiring hours of human work, and it would all need to be refactored if a single student applied for a semester abroad, withdrew, or was enrolled late. While fairly straightforward for a program, my application now saves the school this administrative overhead, and it is still in use today. The included documentation instructs the user how to run the prorgram, requiring only an alphabetized CSV (output by the school\'s registrar software, to produce the formatted Excel sheet of the seating assignment so that even users without programming experience can still use the program.',
        image: '/IMG_5509.jpg',
        imageAlt: 'Chapel attendance system in use',
        imagePosition: 'left'
      },
      {
        type: 'quote',
        quote: 'What once took hours of manual work now happens in minutes, giving us time to focus on what really matters — the students.',
        author: 'Jim Peck (Faculty Administrator)'
      },
      {
        type: 'split',
        title: 'Clipboard and Pen Made Digital',
        content: 'In addition to the Excel layout, the Python program produces a text output which may then be passed into the Java-based mobile application designed for the Galaxy tablets which faculty use to take attendance in real-time. The developement of this app included many iterations and co-design moments with the faculty responsible for taking attendance during assemblies in which we revised elements such as tap target sizing, color coding for present/absent, and a "send attendance" quick-action button for clear signaling.',
        image: '/chapelJava.jpg',
        imageAlt: 'Java code for chapel app',
        imagePosition: 'right'
      },
      {
        type: 'stats',
        stats: [
          { label: 'Seat assignment time', value: '< 2 min' },
          { label: 'Admin overhead', value: '↓ 90%' },
          { label: 'Data accuracy', value: '↑ 95%' }
        ]
      },
      {
        type: 'video',
        video: '/chapel-demo.mp4',
        videoAlt: 'Chapel app demonstration'
      }
    ]
  },
  {
    id: 'teaching-testimonials',
    title: 'Teaching Experience',
    subtitle: 'Design as Practice, Character as Outcome',
    category: 'Education & Mentorship',
    heroImage: '/teaching1.jpg',
    overview: 'As any educator already knows, and perceptive students come to discover, good teachers are excellent designers–constantly referencing the needs of their students to better develop their experience, adjust curricula, and demonstrate lessons. Following in the footsteps of my model teachers, and even benefiting from their mentorship, I try to be the same. I had the privilege to teach for four years at an independent boys\' school in Massachusetts, working, as per our mission, to educate students in "mind, body, and spirit." I developed a computer science program comprised of four distinct courses, coached the middle school wrestling and rowing teams, assisted in the Makerspace and wood shop, sung with the choir, and ran a challenge board outside my room with weekly puzzles and riddles.',
    role: 'Teacher, Coach, Advisor',
    duration: '4 years',
    team: '200+ students, 65+ faculty, 50+ staff',
    tags: ['Education', 'Curriculum Design', 'Computer Science', 'Human-Centered Growth'],
    headerQuote: 'As teachers, the products of our labors lie not in goods, products, slide decks, or presentations, but in the hearts and minds of those we aspire to educate.',
    hcdPhases: {},
    outcome: '',
    sections: [
      {
        type: 'quote',
        quote: 'I think that his teaching style is very good for someone new coming into programming. It brings out a love for Computer Science.',
        author: 'William Sandor \'27 (Computer Science 1)'
      },
      {
        type: 'quote',
        quote: 'He gives great advice, and he has a lot of ability to help you expand your vision of what programming is.',
        author: 'Jack Shah \'23 (AP Computer Science A)'
      },
      {
        type: 'video',
        video: '/chapel-demo.mp4',
        videoAlt: 'Teaching demonstration'
      },
      {
        type: 'quote',
        quote: 'One of the things we talk about at Belmont Hill is balancing tradition with innovation. I think Will represents that perfectly.',
        author: 'Lauren Hamilton (Dean of Teaching & Learning)'
      },
      {
        type: 'quote',
        quote: 'Working with Mr. Ryan, I felt like he was able to force you to expand the limits of your imagination with every single project.',
        author: 'Yareh Constant \'25 (AP Computer Science Principles; Advanced Topics: IoT)'
      },
      {
        type: 'text',
        title: '',
        content: 'I aspire to encourage students to fight against the societal trend of specialization—to demonstrate that life is more interesting when we entertain multiple passions. I believe in the power of asking "Why?" and making room to "fail forward." Through independent student projects and the school\'s foundational teacher-coach model, I strove to enact positive change in my community across a variety of theaters.'
      }
    ]
  },
  {
    id: 'cookbooks',
    title: 'Cookbooks',
    subtitle: 'Stories Through Food & Photography',
    category: 'Photography & Publishing',
    heroImage: '/untitled shoot-4815.jpg',
    overview: '',
    role: 'Author, Photographer, Editor',
    duration: '6 months (Cooking in Quarantine), 3 months (From Mom\'s Kitchen)',
    team: 'Solo projects with friends and family taste testers',
    tags: ['Photography', 'Publishing', 'Food', 'Storytelling'],
    hcdPhases: {
      theory: [
        {
          type: 'split',
          title: 'Theory',
          content: 'For as long as I can remember, food has played an integral role in my life. From sharing family dinners to baking my mom\'s cookies for new friends, food has become one of my favorite ways to connect with people. These two cookbooks represent the intersection of my passions for cooking, photography, and storytelling.\n\nIn 2019, after hosting regular weekend dinner parties for friends, I began to explore cooking professionally. This kicked off an adventure in which I learned from some of Boston\'s top chefs, explored private catering, traveled Europe to study wine, and earned my WSET 2 certification. Over the years, I have fostered my love for food, personal cooking abilities, and interest in photography—these cookbooks are one result.',
          image: '/IMG_5697.jpg',
          imageAlt: 'Cooking preparation',
          imagePosition: 'right'
        }
      ],
      'cooking-in-quarantine': [
        {
          type: 'pdfSplit',
          title: 'Cooking in Quarantine',
          content: 'In an attempt to keep my productive energies occupied during quarantine throughout the summer of 2020, I dove headlong into cooking. In a composition notebook, I recorded recipes, shopping lists, weather conditions, and notes on everything I cooked for my family. I cooked my way through a variety of styles, cuisines, and experiments. While I was not going to have the opportunity to move to Austin, TX to study barbecue as I had hoped, I delighted in summer afternoons spent in the driveway with the smoker I had purchased. My cookbook, "Cooking In Quarantine," serves as a reproduction of some of my favorite recipes from 2020. It includes all original recipes and photography. The style of the book was chosen to reflect the original composition notebook in the hopes that friends and family may continue to share in some of the happy memories made during such unprecedented times.',
          pdf: '/CookingInQuarantine.pdf',
          pdfAlt: 'Cooking in Quarantine cookbook',
          pdfPosition: 'right'
        }
      ],
      'from-moms-kitchen': [
        {
          type: 'pdfSplit',
          title: 'From Mom\'s Kitchen: Desserts',
          content: 'Created in 2017 as an independent study in photography, From Mom\'s Kitchen: Desserts was my first cookbook and my first real foray into the world of cooking. Throughout this project, I learned how to bake the recipes alongside my mom, practiced studio lighting techniques, and designed a layout which enabled me to share the stories behind the recipes as well as the instructions themselves. Food has long been one of my favorite ways to tell a story. This book serves as an ode to the matriarchs of my family, linked in their love of baking and sharing time with their families. The meat grinder on the rear cover originally belonged to my great-grandmother before making its way to my mother. It performs an instrumental role in making the filling for our family cookie, Kolachki (sadly omitted). To date, copies of this cookbook have made their way into the homes of friends and family far and wide. Now, my mom\'s baking is able to reach further than ever before, and it is always so exciting to see some of our family favorites make appearances at the homes of our dear friends.',
          pdf: '/FMK_Desserts.pdf',
          pdfAlt: 'From Mom\'s Kitchen: Desserts cookbook',
          pdfPosition: 'left'
        }
      ]
    },
    outcome: '',
    sections: []
  },
  {
    id: 'cerca-mare',
    title: 'Cerca Mare',
    subtitle: 'Designing a Living Myth Through Collaborative Play',
    category: 'Narrative Design & World Building',
    heroImage: '/CercaMare.png',
    overview: 'Cerca Mare is a long-form Dungeons & Dragons campaign setting inspired by the political and spiritual complexity of the ancient Mediterranean. Drawing from Roman and Greek mythos, the world explores the tension between divine order and human ambition — where gods interfere, empires rise, and individuals wrestle with the cost of conviction.\n\nPlayed weekly across a distributed group of seven players, the campaign acts as a digital co-creation lab, where narrative, system, and emotion intertwine to create shared memory through play.',
    role: 'Dungeon Master, System Architect, Narrative Designer',
    duration: 'Multiple years, ongoing',
    team: '1 DM, 7 Players',
    tags: ['Narrative Design', 'Systems Thinking', 'Collaborative Storytelling', 'Mythology', 'World Building'],
    hcdPhases: {
      'meet-the-players': [
        {
          type: 'playerTabs',
          players: [
            {
              name: 'Adrastus',
              image: '/adrastus.jpg',
              description: 'Hiya! My name\'s Adrastus, and I am one heck of a pet detective! When I\'m not tracking down lost horses or chasing off sand moles, I am practicing for my future as a pirate ship first mate with my friend Pandora. Sure, we\'ve never seen more water than the bath tub, but that isn\'t gonna stop us. No sir!'
            },
            {
              name: 'Farwin',
              image: '/farwin.jpg',
              description: 'Whatsupman, I’m Farwin, an autumn Eladrin from Lilonia. I vibe to the natural cycles of life and death. Sure, my curiosity kinda took a strange turn when I encountered a peculiar dark fungus in the forest that seemed to reverse that cycle. I swear a dead fox was moving like it was alive. I guess I became obsessed with the transition between life, death, and undeath, or whatever. They weren\'t super cool with this back home though, so I set out to explore the mysteries of this cycle and how to control it. '
            },
            {
              name: 'Hjalti',
              image: '/hjalti.jpg',
              description: 'I\'m Hjalti Stormcrown, a long lost son of Bergen. Raised a second son, I joined the clergy of Oceon on my naming day, and served as a fisher-priest for five years before seeing a vision of the long lost heart of the sea. Compelled by my faith to return the heart, I set out with a crew of strong sailors and the wind at my back. But rougher waters awaited. The rest of my first crew has long since perished. Still, I search for the heart, hoping to reclaim both it and my honor before the journey home.'
            },
            {
              name: 'Lyanna',
              image: '/Lyanna.jpg',
              description: 'Well hello darling! I am Lyanna Goldclaw (yes, those Goldclaws) from Cortis, the City of the Golden Sands. Raised amidst the splendor of the Roaring Heights, I’ve always sought to honor my proud lionfolk heritage–even if living under my father’s thumb wasn’t the easiest. I’ve devoted myself to mastering the art of martial combat, and now, I cannot wait to step beyond the city walls to carve out my own legacy. Just don’t get in my way–or you might find yourself at on wrong end of my claws.'
            },
            {
              name: 'Pandora',
              image: '/pandora.jpg',
              description: 'Umm, hello. My name is Pandora, and, uh, I want to be the greatest pirate captain to ever sail the Inner Sea. Sure, I don\'t know how to sail just yet... or swim... and I\'ve never seen the sea, but I won\'t let that stop me! I almost drowned in the bathtub when I was a kid, and they tell us it\'s important to face our fears, so that\'s just what I\'m going to do! I\'m gonna face my fears and become the best darn pirate you\'ve ever seen!'
            },
            {
              name: 'Roderick',
              image: '/roderick.png',
              description: 'Ayyygh, I’m Roderick “Crab Heart” Grimbledor, a former first mate aboard The Phantom Gale, where I spent over four decades under the legendary Captain Corwin “The Kraken” Malgrave. After a life of piracy that ended with a fateful voyage and the loss of my mentor, I traded the high seas for a stint captaining luxury pirate adventures for the elite. But the thrill was never the same, so I sold my ship and set out across the continent, seeking one last grand adventure.'
            },
            {
              name: 'Shai',
              image: '/shai.jpeg',
              description: 'I am Shai Selah, hailing from the golden desert kingdom of Palmyra. Though I once raided ancient Petran tombs to maintain my livelihood, fortune turned in my (and my pet monkey, Sweetheart’s) favor when I was gifted arcane power by a Djinni. The source of my magic remains largely obscured to most, but so long as I provide information that furthers the interests of Palmyra abroad, my employers don’t seem to mind.'
            }
          ]
        }
      ],
      'explore-the-world': [
        {
          type: 'imageWithDisclaimer',
          image: '/cercaMareMap.jpeg',
          imageAlt: 'Map of Cerca Mare campaign world',
          disclaimer: 'This Dungeons & Dragons campaign is a private, non-monetized project created solely for entertainment and to share enjoyable storytelling experiences with friends. Resources such as ChatGPT and Microsoft Image Creator are used to enhance the campaign for personal use only. Special thanks to the talented map makers and homebrewers (especially Afternoon Maps and Limithron) whose creative content has helped bring this world to life—your work is invaluable and deeply appreciated!'
        }
      ]
    },
    outcome: '',
    sections: [
      {
        type: 'split',
        title: 'Character-Driven Stories',
        content: 'Each player character has personal arcs woven into the larger narrative. I work with players to develop their backstories into meaningful campaign elements, giving each character moments to shine and choices that resonate with their personal journey.',
        image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
        imageAlt: 'Character development',
        imagePosition: 'right'
      },
      {
        type: 'text',
        title: 'The Storytelling Experience',
        content: 'Running a long-form campaign is a masterclass in user experience design. It requires understanding player motivations, creating clear feedback loops, balancing challenge and reward, adapting to unexpected inputs, and maintaining emotional engagement over time. The skills are directly applicable to product design.'
      },
      {
        type: 'text',
        title: 'Lessons for Design',
        content: 'D&D taught me invaluable lessons about user engagement: the importance of agency, the power of emotional investment, how to handle unexpected user behavior gracefully, and the magic that happens when users feel their choices truly matter. These principles inform all my design work.'
      }
    ]
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getAllProjects = (): Project[] => {
  return projects;
};
