import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isCollapsed } = useSidebar()

    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            {/* Fixed Header */}
            <Header />

            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className={`flex flex-col min-h-screen transition-all duration-500 ease-in-out ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-56'}`} style={{ paddingTop: '60px' }}>
                {/* Scrollable Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-[1800px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout;