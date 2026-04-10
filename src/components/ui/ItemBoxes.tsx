interface ItemBoxesProps {
    imageUrl?: string;
    name: string;
    price: number;
    rating?: number;
    sold?: number;
}

function ItemBoxes({ imageUrl, name, price, rating, sold }: ItemBoxesProps) {
    return (
        <div className="w-[calc(50%-6px)] sm:w-48 md:w-44 lg:w-48 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col">
            {/* Image */}
            <div className="w-full h-100 xl:h-80 aspect-square rounded-t-xl overflow-hidden p-2 ">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        No Image
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1 flex-1">
                <h3 className="text-sm text-gray-800 leading-tight line-clamp-2">
                    {name}
                </h3>
                <span className="text-base font-bold text-red-500 mt-1">
                    ₱{price.toLocaleString()}
                </span>
                <div className="flex-1" />
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="text-yellow-400">★</span>
                    <span>{rating ? rating.toFixed(1) : '0.0'}</span>
                    <span className="text-gray-300">|</span>
                    <span>{sold ?? 0} sold</span>
                </div>
            </div>
        </div>
    );
}

export default ItemBoxes;