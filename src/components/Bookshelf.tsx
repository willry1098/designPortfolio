import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, X } from 'lucide-react';
import SteamGames from './SteamGames';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  summary: string;
  completedDate: string;
  category: string;
}

const Bookshelf: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const books: Book[] = [
    {
      id: 16,
      title: "Dark Matter",
      author: "Blake Crouch",
      cover: "https://atomicbooks.com/cdn/shop/products/darkmatter.jpg?v=1494545076&width=1024?auto=compress&cs=tinysrgb&w=300&h=400",
      summary: "The writing complexity may not inspire the next virtuoso to pick up his pen, but the story is an excellent one Crouch manages to avoid incoherence which threatens any time travel/parallel narrative setting and deliver a compelling adventure. His dialogue is natural if rough, but doesn’t stand in the way of helping us ask “what would I do to get back home again.“ While this book doesn’t stand a top of my list of sci-fi grades, I sure did lose sleep as I couldn’t wait to read the next chapter.",
      completedDate: "March 2026",
      category: "Sci-Fi"
    },{
      id: 15,
      title: "Predictably Irrational",
      author: "Dan Ariely",
      cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1255573980i/1713426.jpg?auto=compress&cs=tinysrgb&w=300&h=400",
      summary: "I found this book to be a significantly watered-down version of Thinking: Fast and Slow. Though the narrative recounts of the study were entertaining, I felt they offered less insight into true behavioral understanding than other cases presented in Sapiens or TFaS. Nevertheless, I enjoyed the read.",
      completedDate: "March 2026",
      category: "Psycology"
    },{
      id: 14,
      title: "Stranger in a Strange Land",
      author: "Robert A. Heinlein",
      cover: "https://target.scene7.com/is/image/Target/GUEST_e503b92b-843c-4ee3-9687-2dad78f76439?wid=300&hei=300&fmt=pjpeg?auto=compress&cs=tinysrgb&w=300&h=400",
      summary: "I do not grok this story, but waiting is not yet full. Heinlein exposes so much of what it means to be human and to struggle with the concept of God through the lens of an off-worlder, yet the greatest wisdom still comes from a crotchety old man. I sense this book is a great goodness, and I look forward to how my perception of it changes as I grow.",
      completedDate: "January 2026",
      category: "Sci-Fi"
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
      category: "Sci-Fi"
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

  const categories = [...new Set(books.map(book => book.category))];

  const filteredBooks = selectedTags.length > 0
    ? books.filter(book => selectedTags.includes(book.category))
    : books;

  const displayedBooks = filteredBooks.slice(0, 12);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Navigation Header */}
      <div className="bg-soft-white border-b border-slate-gray/10 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={`${import.meta.env.BASE_URL}personalLogoV2grey.svg`}
              alt="William Ryan Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-deep-indigo hover:text-signal-blue transition-colors">
              william ryan
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-gray hover:text-deep-indigo font-medium"
            >
              work
            </Link>
            <Link
              to="/about"
              className="text-slate-gray hover:text-deep-indigo font-medium"
            >
              about
            </Link>
            <Link
              to="/bookshelf"
              className="text-slate-gray hover:text-deep-indigo font-medium"
            >
              the bookshelf
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-soft-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-deep-indigo">the bookshelf</h1>
            <p className="text-2xl md:text-3xl font-bold text-deep-indigo max-w-3xl mx-auto leading-relaxed">
              I believe you are what you read
            </p>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-slate-gray/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-deep-indigo mb-4 text-center">Recently Read Books</h2>
          <p className="text-slate-gray leading-relaxed max-w-3xl mb-8 text-center mx-auto">
            I try to read a wide range of genres, but it never takes me long to come back to fantasy novels. I try to keep one "brain book" and one "heart book" in the rotations at all times, and auidobooks are a great way to pass the commute. But whatever the subject, whatever the medium, I'm always looking for my next great story.
          </p>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-slate-gray mb-4">
              <BookOpen size={20} />
              <span className="text-sm font-medium">{filteredBooks.length} books read recently</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleTag(category)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    selectedTags.includes(category)
                      ? 'bg-signal-blue text-soft-white'
                      : 'bg-signal-blue/10 text-signal-blue hover:bg-signal-blue/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedBooks.map((book) => (
              <div
                key={book.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-2 text-soft-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-xs mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-xs opacity-90">{book.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-deep-indigo/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-soft-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96 md:h-auto">
                <img
                  src={selectedBook.cover}
                  alt={`${selectedBook.title} cover`}
                  className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-deep-indigo mb-2">{selectedBook.title}</h2>
                    <p className="text-lg text-slate-gray mb-3">by {selectedBook.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-tech-teal/10 text-tech-teal px-3 py-1 rounded-full">
                        {selectedBook.category}
                      </span>
                      <span className="text-sm text-slate-gray">{selectedBook.completedDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBook(null)}
                    className="p-2 hover:bg-slate-gray/10 rounded-full transition-colors"
                  >
                    <X size={24} className="text-slate-gray" />
                  </button>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-deep-indigo mb-3">Summary</h3>
                  <p className="text-slate-gray leading-relaxed">
                    {selectedBook.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Steam Games Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <SteamGames />
      </div>
    </div>
  );
};

export default Bookshelf;
