// src/components/settings/SettingsPage.tsx

import React from 'react';
import CategoryManager from './CategoryManager.tsx';
import IdealDaySetter from './IdealDaySetter.tsx';

const SettingsPage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryManager />
        <IdealDaySetter />
    </div>
);

export default SettingsPage;