import Navbar from '../components/layout/Navbar';
import { useState } from 'react';

const GRADES = [
    { id: 'hg', label: 'High Grade'},
    { id: 'rg', label: 'Real Grade'},
    { id: 'mg', label: 'Master Grade'},
    { id: 'pg', label: 'Perfect Grade'}, 
];

function Kits() {
    const [ activeBox, setActiveBox ] = useState<string | null>(null);
    
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <h1 className="text-4xl md:text-2xl lg:text-6xl md:whitespace-nowrap font-bold p-8">
                Explore Gundam <br className="md:hidden "/>Kits
            </h1>

            {/* Section Tabs */}
            <div className="w-full px-8 py-6 overflow-x-auto">
                {GRADES.map((grade) => (
                    <button
                        key={grade.id}
                        onClick={() => setActiveBox(grade.id)}
                        className={
                    />
                ))}


            </div>

            {/* Container Tabs */}
            <div className="flex-1 flex justify-center items-center">
                <div className="w-[80%] xl:h-2/5 bg-red-500">
                    <div className="sm:w-[20%] h-200 bg-red-200">

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Kits