import Navbar from '../components/layout/Navbar';
import { useState, useEffect, useRef } from 'react';
import ItemBoxes from '../components/ui/ItemBoxes';
import { supabase } from '../utils/supaClient'

const GRADES = [
    { id: 'hg', label: 'High Grade'},
    { id: 'rg', label: 'Real Grade'},
    { id: 'mg', label: 'Master Grade'},
    { id: 'pg', label: 'Perfect Grade'}, 
];

const SORT_OPTIONS = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'newest', label: 'Newest' },
    { id: 'most_clicked', label: 'Most Clicked' },
    { id: 'highest_rated', label: 'Highest Rated' },
    { id: 'price_high_low', label: 'Price: High to Low' },
    { id: 'price_low_high', label: 'Price: Low to High' },
    { id: 'most_reviewed', label: 'Most Reviewed' },
];

interface ProductImage {
    product_id: number;
    buckets: string;
    image_url: string;
    publicUrl?: string;
    name?: string;
    price?: number;
}


function Kits() {
    const [ activeBox, setActiveBox ] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeSort, setActiveSort] = useState('recommended');
    const [sortOpen, setSortOpen] = useState(false);
    const [images, setImages] = useState<ProductImage[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        let isDragging = false;
        let hasMoved = false;
        let startX = 0;
        let scrollLeft = 0;

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            hasMoved = false;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const x = e.pageX - slider.offsetLeft;
            const walk = x - startX;
            if (Math.abs(walk) > 5) {
                hasMoved = true;
                slider.scrollLeft = scrollLeft - walk;
            }
        };

        const stopDragging = () => {
            isDragging = false;
            slider.style.cursor = 'grab';
        };

        slider.addEventListener('mousedown', onMouseDown);
        slider.addEventListener('mousemove', onMouseMove);
        slider.addEventListener('mouseup', stopDragging);
        slider.addEventListener('mouseleave', stopDragging);

        return () => {
            slider.removeEventListener('mousedown', onMouseDown);
            slider.removeEventListener('mousemove', onMouseMove);
            slider.removeEventListener('mouseup', stopDragging);
            slider.removeEventListener('mouseleave', stopDragging);
        };
    }, []);

     useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = SORT_OPTIONS.find(o => o.id === activeSort)?.label;

    useEffect(() => {
        const fetchKits = async () => {
            const { data, error } = await supabase
                .from('product_images')
                .select('product_id, buckets, image_url, product(name, price)')
                .ilike('image_url', '%cover%');

            if (error) { console.error(error); return; }

            const withUrls = data.map((item: any) => {
                const { data: imgData } = supabase.storage
                    .from(item.buckets)
                    .getPublicUrl(item.image_url);

            return {
                    product_id: item.product_id,
                    buckets: item.buckets,
                    image_url: item.image_url,
                    publicUrl: imgData.publicUrl,
                    name: item.product.name,
                    price: item.product.price,
                };
            });

            setImages(withUrls);
        };
        fetchKits();
    }, []);

    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <h1 className="text-4xl md:text-2xl lg:text-6xl md:whitespace-nowrap pb-0 px-4 md:px-6 2xl:px-70">
                Explore Gundam <br className="md:hidden "/>Kits
            </h1>

            {/* Section Tabs */}
            <div
                ref={scrollRef} 
                className="w-full px-8 py-6 overflow-x-auto no-scrollbar cursor-grab 2xl:px-70">
                <div className="flex flex-row gap-2 w-max">
                    {GRADES.map((grade) => (
                        <button
                            key={grade.id}
                            onClick={() => setActiveBox(grade.id)}
                            className={`w-40 py-10 rounded-xl border-2 font-semibold text-sm transition-all 
                                ${activeBox == grade.id
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-500'
                                }`}
                        >
                            <span className="hidden sm:inline">{grade.label}</span>
                            <span className="sm:hidden">{grade.label}</span>
                        </button>
                    ))}
                </div>
            </div>

        <div className="px-4 md:px-6 2xl:px-70 pb-4">

                {/* Desktop Dropdown */}
                <div className="relative hidden md:inline-block" ref={dropdownRef}>
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white hover:border-gray-400 transition-all"
                    >
                        <span>Sort: {selectedLabel}</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {sortOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-md z-50 min-w-[200px] py-1">
                            {SORT_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => { setActiveSort(option.id); setSortOpen(false); }}
                                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    <span>{option.label}</span>
                                    {activeSort === option.id && (
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mobile Sort Button */}
                <button
                    onClick={() => setSortOpen(true)}
                    className="md:hidden flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white"
                >
                    <span>Sort: {selectedLabel}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Mobile Bottom Sheet */}
            {sortOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setSortOpen(false)}
                    />
                    {/* Sheet */}
                    <div className="relative bg-white rounded-t-2xl px-6 pt-4 pb-10 animate-slide-up">
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Sort by</p>
                        <ul className="space-y-1">
                            {SORT_OPTIONS.map((option) => (
                                <li key={option.id}>
                                    <button
                                        onClick={() => { setActiveSort(option.id); setSortOpen(false); }}
                                        className={`w-full flex items-center justify-between py-3 text-sm border-b border-gray-100 transition-all
                                            ${activeSort === option.id ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                                    >
                                        <span>{option.label}</span>
                                        {activeSort === option.id && (
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Container Tabs */}
            <div className="flex-1 2xl:px-70">
                <div className="w-full min-h-screen px-4 md:px-6 py-4">
                    <div className="flex flex-wrap gap-3">
                        {images.map((img) => (
                            <ItemBoxes
                                key={img.product_id}
                                imageUrl={img.publicUrl}
                                name={img.name ?? ''}
                                price={img.price ?? 0}
                                rating={0}
                                sold={0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kits