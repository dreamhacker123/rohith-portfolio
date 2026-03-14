import { scrollToId } from '../utilities/utilities';
import InfiniteScroll from './InfiniteScroll';
  
const items = [
    {
      content: (
        <span onClick={() => scrollToId("about")} className="cursor-pointer text-white hover:underline">
          ABOUT
        </span>
      ),
    },
    {
      content: (
        <span onClick={() => scrollToId("hobbies")} className="cursor-pointer text-white hover:underline">
          HOBBIES
        </span>
      ),
    },
    {
      content: (
        <span onClick={() => scrollToId("professional-experience")} className="cursor-pointer text-white hover:underline">
          PROFESSIONAL EXPERIENCE
        </span>
      ),
    },

    {
      content: (
        <span onClick={() => scrollToId("skills")} className="cursor-pointer text-white hover:underline">
          SKILLS
        </span>
      ),
    },
    {
      content: (
        <span onClick={() => scrollToId("projects")} className="cursor-pointer text-white hover:underline">
          PROJECTS
        </span>
      ),
    },
     
    {
      content: (
        <span onClick={() => scrollToId("social-media")} className="cursor-pointer text-white hover:underline">
          SOCIAL MEDIA
        </span>
      ),
    },
  ];;
  
  
  
export const InfiniteScrollSection: React.FC = () => {
  return (
    <div className="h-auto md:h-screen w-full md:w-[65%] flex flex-col md:flex-row items-center justify-center p-4 md:p-0" onWheel={(e) => {
        const el = e.currentTarget;
        const isAtTop = el.scrollTop === 0 && e.deltaY < 0;
        const isAtBottom =
          el.scrollHeight - el.scrollTop === el.clientHeight && e.deltaY > 0;
    
        if (isAtTop || isAtBottom) {
          e.stopPropagation(); // prevent scroll bubbling
          e.preventDefault();  // prevent native propagation
        }
      }}>
      {/* Simple list for mobile */}
      <div className="md:hidden flex flex-wrap gap-4 justify-center">
        {items.map((item, idx) => (
          <div key={idx} className="text-white text-sm">
            {item.content}
          </div>
        ))}
      </div>
      
      {/* Diagonal scroll for desktop */}
      <div className="hidden md:flex w-full h-full">
        <InfiniteScroll
          items={items as never[]}
          width={"300px"}
          itemMinHeight={120}
          autoplay={true}
          autoplaySpeed={1.8}
          isTilted={true}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
};