import Link from 'next/link';
import { getServiceImageUrl } from '../lib/api';

interface ServiceCardProps {
  title: string;
  description?: string;
  price?: string | number;
  href?: string;
  image?: string;
  showActions?: boolean;
}

export default function ServiceCard({ title, description, price, href, image, showActions = false }: ServiceCardProps) {
  const resolvedImage = getServiceImageUrl(image);

  const CardContent = (
    <div className="flex-1 flex flex-col">
      {resolvedImage ? (
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 xs:mb-4 rounded-full overflow-hidden mx-auto border border-gray-200" style={{ backgroundColor: '#E7DFD9' }}>
          <img src={resolvedImage} alt={title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-3 xs:mb-4 rounded-full flex items-center justify-center mx-auto group text-[#635D56] hover:text-[#4a453f] transition-colors"
          style={{ backgroundColor: '#E7DFD9' }}
        >
          <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor" />
          </svg>
        </div>
      )}
      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4 text-left text-[#6B6B6B]">{title}</h3>
      {description && (
        <p className="text-xs xs:text-sm sm:text-base text-gray-600 text-left leading-loose overflow-hidden">{description}</p>
      )}
      {showActions && (
        <div className="mt-auto pt-2 xs:pt-3 flex items-center justify-between">
          {price && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6B6B6B] text-xs xs:text-sm sm:text-base">{price}$</span>
            </div>
          )}
          <button
            type="button"
            className="text-[#635D56] font-bold tracking-wide hover:opacity-80 text-xs xs:text-sm sm:text-base"
          >
            BOOK NOW
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-3 xs:p-4 border border-gray-100 min-h-48 xs:min-h-52 sm:min-h-60 flex flex-col">
      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
}


