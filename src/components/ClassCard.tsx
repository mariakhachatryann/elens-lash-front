interface ClassCardProps {
  title: string;
  description?: string;
  price?: number | string;
}

export default function ClassCard({ title, description, price }: ClassCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 xs:p-6 sm:p-8 border border-gray-100 min-h-48 xs:min-h-52 sm:min-h-60 flex flex-col">
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4 text-[#6B6B6B]">{title}</h3>
        {description && (
          <p className="text-xs xs:text-sm text-gray-600 leading-loose">{description}</p>
        )}
        {price !== undefined && (
          <div className="mt-auto pt-3 xs:pt-4 flex items-center justify-between">
            <span className="font-bold text-[#6B6B6B] text-sm xs:text-base">{price}$</span>
          </div>
        )}
      </div>
    </div>
  );
}


