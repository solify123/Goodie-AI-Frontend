import { useState } from 'react'
import Layout from '../../../components/layout'
import { useAuth } from '../../../hooks/useAuth'
import { Pencil, Check } from 'lucide-react'

const ProfilePage = () => {
    const { user } = useAuth()
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)

    const handleEdit = (field: string) => {
        console.log('Edit', field)
        // TODO: Implement edit functionality
    }

    const handleDeleteAccount = () => {
        // TODO: Implement delete account functionality
        console.log('Delete account clicked')
    }

    const getAvatarInitial = () => {
        if (user?.email) {
            return user.email.charAt(0).toUpperCase()
        }
        return 'U'
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-8">
                <div className='mx-auto w-fit'>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl text-center sm:text-4xl md:text-5xl font-bold text-white">
                            Profile Settings
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl space-y-4 sm:space-y-6">
                        {/* User Information Card */}
                        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 sm:p-6">
                            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                {/* Profile Picture */}
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br to-[#00bfa5] to-[#00897b] rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg flex-shrink-0">
                                    {getAvatarInitial()}
                                </div>

                                {/* User Details */}
                                <div className="flex-1 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between group">
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">Nickname</p>
                                                    <p className="text-white font-medium">superman</p>
                                                </div>
                                                <button
                                                    onClick={() => handleEdit('nickname')}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <Pencil className="w-4 h-4 text-gray-400 hover:text-[#009688]" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between group">
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">E-mail</p>
                                                    <p className="text-white font-medium break-all">
                                                        {user?.email || 'senior.dev000309@g...'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleEdit('email')}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <Pencil className="w-4 h-4 text-gray-400 hover:text-[#009688]" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between group">
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">Gender</p>
                                                    <p className="text-white font-medium">Male</p>
                                                </div>
                                                <button
                                                    onClick={() => handleEdit('gender')}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <Pencil className="w-4 h-4 text-gray-400 hover:text-[#009688]" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between group">
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">Password</p>
                                                    <p className="text-white font-medium">********</p>
                                                </div>
                                                <button
                                                    onClick={() => handleEdit('password')}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <Pencil className="w-4 h-4 text-gray-400 hover:text-[#009688]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Current Plan Card */}
                        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Current Plan</p>
                                    <p className="text-red-400 font-medium text-lg">Free</p>
                                </div>
                                <button className="bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:from-[#00897b] hover:to-[#00796b] transition-all duration-200 w-full sm:w-auto text-sm sm:text-base">
                                    Upgrade to Premium
                                </button>
                            </div>
                        </div>

                        {/* Language Card */}
                        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 sm:p-6">
                            <p className="text-gray-400 text-sm mb-4">Language</p>
                            <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors">
                                <span className="text-2xl">🇺🇸</span>
                                <span className="text-white font-medium">English</span>
                            </button>
                        </div>

                        {/* Automatic Notifications Card */}
                        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 sm:p-6">
                            <p className="text-gray-400 text-sm mb-4">Automatic Notifications</p>
                            <div className="flex items-start space-x-3">
                                <button
                                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                    className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors mt-0.5 flex-shrink-0 ${notificationsEnabled
                                            ? 'bg-blue-600 border-blue-600'
                                            : 'border-gray-600 bg-transparent'
                                        }`}
                                >
                                    {notificationsEnabled && <Check className="w-3 h-3 text-white" />}
                                </button>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    As a user, you will receive automatic notifications from us. If you don't want any notifications, uncheck the box by clicking on it.
                                </p>
                            </div>
                        </div>

                        {/* Danger Zone Card */}
                        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                <div>
                                    <p className="text-red-400 font-bold mb-2">Danger Zone</p>
                                    <p className="text-gray-300 text-sm">
                                        If you want to permanently delete this account and all of its data.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer whitespace-nowrap text-sm mt-2 sm:mt-0"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProfilePage
