'use client';

import { Conversation } from '../data/chatData';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewChat,
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          border-r
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-16' : 'w-[260px]'}
          ${isDark ? 'bg-[#171717] border-white/10' : 'bg-white border-gray-200'}
        `}
      >
        {/* Header */}
        <div className={`flex items-center ${isCollapsed ? 'lg:justify-center lg:p-2' : 'justify-between p-3'} transition-all duration-300 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-2 p-1 transition-opacity duration-300 ${isCollapsed ? 'px-0 lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
            <div className="w-5 h-5 rounded-sm bg-black flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              S
            </div>
            <span className={`font-semibold text-lg whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>ClosedAI</span>
          </div>

          {/* Collapse button for desktop */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:block p-1.5 rounded-lg transition-all cursor-pointer ${isDark ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-rtl-flip="" className="icon max-md:hidden"><path d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z"></path></svg>
          </button>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className={`lg:hidden p-1 cursor-pointer ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-1">
          <button
            onClick={onNewChat}
            className={`w-full flex items-center gap-2 py-2.5 rounded-lg transition-all duration-300 group ${isDark
              ? 'text-white/90 hover:bg-white/10'
              : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed
                ? 'justify-center px-2'
                : 'px-3'
              }`}
            title={isCollapsed ? 'New chat' : ''}
            aria-label="New chat"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M2.6687 11.333V8.66699C2.6687 7.74455 2.66841 7.01205 2.71655 6.42285C2.76533 5.82612 2.86699 5.31731 3.10425 4.85156L3.25854 4.57617C3.64272 3.94975 4.19392 3.43995 4.85229 3.10449L5.02905 3.02149C5.44666 2.84233 5.90133 2.75849 6.42358 2.71582C7.01272 2.66769 7.74445 2.66797 8.66675 2.66797H9.16675C9.53393 2.66797 9.83165 2.96586 9.83179 3.33301C9.83179 3.70028 9.53402 3.99805 9.16675 3.99805H8.66675C7.7226 3.99805 7.05438 3.99834 6.53198 4.04102C6.14611 4.07254 5.87277 4.12568 5.65601 4.20313L5.45581 4.28906C5.01645 4.51293 4.64872 4.85345 4.39233 5.27149L4.28979 5.45508C4.16388 5.7022 4.08381 6.01663 4.04175 6.53125C3.99906 7.05373 3.99878 7.7226 3.99878 8.66699V11.333C3.99878 12.2774 3.99906 12.9463 4.04175 13.4688C4.08381 13.9833 4.16389 14.2978 4.28979 14.5449L4.39233 14.7285C4.64871 15.1465 5.01648 15.4871 5.45581 15.7109L5.65601 15.7969C5.87276 15.8743 6.14614 15.9265 6.53198 15.958C7.05439 16.0007 7.72256 16.002 8.66675 16.002H11.3337C12.2779 16.002 12.9461 16.0007 13.4685 15.958C13.9829 15.916 14.2976 15.8367 14.5447 15.7109L14.7292 15.6074C15.147 15.3511 15.4879 14.9841 15.7117 14.5449L15.7976 14.3447C15.8751 14.128 15.9272 13.8546 15.9587 13.4688C16.0014 12.9463 16.0017 12.2774 16.0017 11.333V10.833C16.0018 10.466 16.2997 10.1681 16.6667 10.168C17.0339 10.168 17.3316 10.4659 17.3318 10.833V11.333C17.3318 12.2555 17.3331 12.9879 17.2849 13.5771C17.2422 14.0993 17.1584 14.5541 16.9792 14.9717L16.8962 15.1484C16.5609 15.8066 16.0507 16.3571 15.4246 16.7412L15.1492 16.8955C14.6833 17.1329 14.1739 17.2354 13.5769 17.2842C12.9878 17.3323 12.256 17.332 11.3337 17.332H8.66675C7.74446 17.332 7.01271 17.3323 6.42358 17.2842C5.90135 17.2415 5.44665 17.1577 5.02905 16.9785L4.85229 16.8955C4.19396 16.5601 3.64271 16.0502 3.25854 15.4238L3.10425 15.1484C2.86697 14.6827 2.76534 14.1739 2.71655 13.5771C2.66841 12.9879 2.6687 12.2555 2.6687 11.333ZM13.4646 3.11328C14.4201 2.334 15.8288 2.38969 16.7195 3.28027L16.8865 3.46485C17.6141 4.35685 17.6143 5.64423 16.8865 6.53613L16.7195 6.7207L11.6726 11.7686C11.1373 12.3039 10.4624 12.6746 9.72827 12.8408L9.41089 12.8994L7.59351 13.1582C7.38637 13.1877 7.17701 13.1187 7.02905 12.9707C6.88112 12.8227 6.81199 12.6134 6.84155 12.4063L7.10132 10.5898L7.15991 10.2715C7.3262 9.53749 7.69692 8.86241 8.23218 8.32715L13.2791 3.28027L13.4646 3.11328ZM15.7791 4.2207C15.3753 3.81702 14.7366 3.79124 14.3035 4.14453L14.2195 4.2207L9.17261 9.26856C8.81541 9.62578 8.56774 10.0756 8.45679 10.5654L8.41772 10.7773L8.28296 11.7158L9.22241 11.582L9.43433 11.543C9.92426 11.432 10.3749 11.1844 10.7322 10.8271L15.7791 5.78027L15.8552 5.69629C16.185 5.29194 16.1852 4.708 15.8552 4.30371L15.7791 4.2207Z" />
            </svg>

            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                New chat
              </span>
            )}
          </button>
        </div>

        {/* Blog Button */}
        <div className="p-1">
          <a
            href="/blog"
            className={`w-full flex items-center gap-2 py-2.5 rounded-lg transition-all duration-300 group cursor-pointer ${isDark
              ? 'text-white/90 hover:bg-white/10'
              : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed
                ? 'justify-center px-2'
                : 'px-3'
              }`}
            title={isCollapsed ? 'Blog' : ''}
            aria-label="Blog"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 flex-shrink-0"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>

            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                Blog
              </span>
            )}
          </a>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-1 py-2 space-y-1">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => {
                onConversationSelect(conversation.id);
                onClose();
              }}
              className={`
                w-full text-left py-3 rounded-lg transition-all duration-300 group relative cursor-pointer flex items-center
                ${activeConversationId === conversation.id
                  ? isDark ? 'bg-white/10' : 'bg-gray-100'
                  : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }
                ${isCollapsed ? 'lg:justify-center lg:px-0' : 'px-3'}
              `}
              title={isCollapsed ? conversation.title : ''}
            >


              <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:w-0 lg:opacity-0 lg:overflow-hidden' : 'w-auto opacity-100'}`}>
                <div className={`text-sm font-medium truncate ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
                  {conversation.title}
                </div>
                <div className={`text-xs truncate mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  {conversation.preview}
                </div>
              </div>

              {/* Tooltip on hover for collapsed state */}
              {isCollapsed && (
                <div className={`
                  hidden lg:block absolute left-full ml-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap
                  opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50
                  ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}
                `}>
                  <div className="text-sm font-medium">{conversation.title}</div>
                  <div className="text-xs opacity-70 mt-0.5">{conversation.preview}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* All Questions Link */}
        <div className="px-1 pb-2">
          <button
            onClick={() => {
              onConversationSelect('all-questions');
              onClose();
            }}
            className={`
              w-full text-left py-2.5 px-3 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-2
              ${activeConversationId === 'all-questions'
                ? isDark ? 'bg-white/10' : 'bg-gray-100'
                : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
              }
              ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
            `}
            title={isCollapsed ? 'All Questions' : ''}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 flex-shrink-0"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {!isCollapsed && (
              <span className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                All Questions
              </span>
            )}
          </button>
        </div>

        {/* Footer with Theme Toggle */}
        <div className="p-3">
          <div className={`flex items-center mb-2 transition-all duration-200 ${isCollapsed
            ? 'justify-end'
            : 'justify-between'
            }`}>
            <span className={`text-xs px-3 transition-all duration-300 ${isDark ? 'text-white/40' : 'text-gray-500'
              } ${isCollapsed
                ? 'w-0 opacity-0 overflow-hidden px-0'
                : 'w-auto opacity-100'
              }`}>
              Swapnil Nair
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div >
    </>
  );
}
