// src/components/ui/AnimatedBackground.tsx

import React from 'react';
import Silk from '../Silk';
import Galaxy from '../Galaxy';
const AnimatedBackground = () => {
    return (
        // This div provides the solid dark background color.
        // The inner divs that created the "silk effect" have been removed.
        
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#110f1a]">
            <Galaxy/>
        </div>
    );
};

export default AnimatedBackground;
