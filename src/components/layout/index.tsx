import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import LanguageSelectionPopup from './LanguageSelectionPopup';
import ContactUsModal from './ContactUsModal';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isCollapsed } = useSidebar()
    const [showLanguagePopup, setShowLanguagePopup] = useState(false)
    const [showContactModal, setShowContactModal] = useState(false)

    const handleLanguageSelect = (language: any) => {
        console.log('Language selected:', language.name)
        setShowLanguagePopup(false)
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            {/* Fixed Header */}
            <Header />

            {/* Fixed Sidebar */}
            <Sidebar
                setShowLanguagePopup={setShowLanguagePopup}
                setShowContactModal={setShowContactModal}
            />

            {/* Main Content */}
            <div className={`flex flex-col min-h-screen transition-all duration-500 ease-in-out ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-56'}`} style={{ paddingTop: '60px' }}>
                {/* Scrollable Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-[1800px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
            {/* Language Selection Popup */}
            <LanguageSelectionPopup
                isOpen={showLanguagePopup}
                onClose={() => setShowLanguagePopup(false)}
                onLanguageSelect={handleLanguageSelect}
            />

            {/* Contact Us Modal */}
            <ContactUsModal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
            />
        </div>
    )
}

export default Layout;