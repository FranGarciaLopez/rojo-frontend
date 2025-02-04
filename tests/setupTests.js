import '@testing-library/jest-dom';

import { vi, afterEach } from 'vitest';

vi.spyOn(console, 'warn').mockImplementation((message) => {
    if(
        message.includes("React Router Future Flag Warning") ||
        message.includes("v7_startTransition") ||
        message.includes("v7_relativeSplatPath")
    ) {
        return;
    }
    console.warn(message);
});
   
afterEach(() => {
    vi.clearAllMocks();
});
