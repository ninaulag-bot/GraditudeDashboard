import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileCard } from './components/ProfileCard';
import { UpcomingMilestones } from './components/UpcomingMilestones';
import { MobileNavbar } from './components/MobileNavbar';
import { MobileNav } from './components/MobileNav';
import { MobileProfileDrawer } from './components/MobileProfileDrawer';
import { MobileMilestonesPage } from './components/MobileMilestonesPage';
import { JoinOrgFlow } from './components/JoinOrgFlow';
import { StageSwitcher, Stage } from './components/StageSwitcher';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CtaProvider } from './components/CtaModals';
type Page = 'dashboard' | 'joinOrg' | 'milestones';
export function App() {
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [currentStage, setCurrentStage] = useState<Stage>('1');
  // Keep this for the JoinOrgFlow, but Dashboard will use stage-based logic
  const [joinedOrgs, setJoinedOrgs] = useState<string[]>([]);
  const [menteePairingConfirmed, setMenteePairingConfirmed] = useState(false);
  const [mentorPairingConfirmed, setMentorPairingConfirmed] = useState(false);
  const [priyaPairingConfirmed, setPriyaPairingConfirmed] = useState(false);
  const handleJoinOrg = (orgId: string) => {
    if (!joinedOrgs.includes(orgId)) {
      setJoinedOrgs([...joinedOrgs, orgId]);
    }
  };
  const handleReset = () => {
    setCurrentStage('1');
    setCurrentPage('dashboard');
    setJoinedOrgs([]);
    setMenteePairingConfirmed(false);
    setMentorPairingConfirmed(false);
    setPriyaPairingConfirmed(false);
  };
  const isAdmin = window.location.pathname === '/admin';
  return (
    <CtaProvider>
      <div
        className="min-h-screen flex flex-col bg-white"
        style={{
          fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
        
        <StageSwitcher
          currentStage={currentStage}
          onStageChange={setCurrentStage}
          onReset={handleReset} />
        

        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Sidebar - hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <Sidebar
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              currentStage={currentStage} />
            
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Desktop Navbar - hidden on mobile/tablet */}
            <div className="hidden lg:block">
              <Navbar
                rightPanelOpen={rightPanelOpen}
                onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)} />
              
            </div>

            {/* Mobile Navbar - visible only on mobile */}
            <MobileNavbar />

            <main
              data-right-panel={rightPanelOpen ? 'open' : 'closed'}
              className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-[80px] lg:pb-0 bg-[#f1f3f5]">
              
              {currentPage === 'milestones' ?
              <MobileMilestonesPage
                currentStage={currentStage}
                onBack={() => setCurrentPage('dashboard')} /> :

              currentPage === 'dashboard' ?
              <>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {isAdmin ? <AdminDashboard
                    joinedOrgs={joinedOrgs}
                    onJoinOrg={handleJoinOrg}
                    onNavigateToJoinOrg={() => setCurrentPage('joinOrg')}
                    currentStage={currentStage}
                    rightPanelOpen={rightPanelOpen}
                    menteePairingConfirmed={menteePairingConfirmed}
                    onConfirmMenteePairing={() =>
                    setMenteePairingConfirmed(true)
                    }
                    mentorPairingConfirmed={mentorPairingConfirmed}
                    onConfirmMentorPairing={() =>
                    setMentorPairingConfirmed(true)
                    }
                    priyaPairingConfirmed={priyaPairingConfirmed}
                    onConfirmPriyaPairing={() =>
                    setPriyaPairingConfirmed(true)
                    } /> : <Dashboard
                    joinedOrgs={joinedOrgs}
                    onJoinOrg={handleJoinOrg}
                    onNavigateToJoinOrg={() => setCurrentPage('joinOrg')}
                    currentStage={currentStage}
                    menteePairingConfirmed={menteePairingConfirmed}
                    onConfirmMenteePairing={() =>
                    setMenteePairingConfirmed(true)
                    }
                    mentorPairingConfirmed={mentorPairingConfirmed}
                    onConfirmMentorPairing={() =>
                    setMentorPairingConfirmed(true)
                    }
                    priyaPairingConfirmed={priyaPairingConfirmed}
                    onConfirmPriyaPairing={() =>
                    setPriyaPairingConfirmed(true)
                    } />}
                  
                  </div>

                  {/* Desktop Right Panel - hidden on mobile/tablet */}
                  <div className="hidden lg:flex relative shrink-0">
                    {!rightPanelOpen &&
                  <button
                    onClick={() => setRightPanelOpen(true)}
                    className="absolute top-4 right-2 z-10 w-[28px] h-[28px] bg-white border border-[#dee2e6] rounded-full flex items-center justify-center shadow-sm hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                    title="Expand panel">
                    
                        <ChevronLeft className="w-4 h-4 text-[#495057]" />
                      </button>
                  }
                    <aside
                    className={`bg-[#dee2e6] overflow-hidden transition-all duration-300 ease-in-out ${rightPanelOpen ? 'w-[320px]' : 'w-0'}`}>
                    
                      <div className="flex flex-col h-full p-6 w-[320px] overflow-y-auto">
                        <button
                        onClick={() => setRightPanelOpen(false)}
                        className="w-[28px] h-[28px] bg-white border border-[#dee2e6] rounded-full flex items-center justify-center shadow-sm hover:bg-[#f8f9fa] transition-colors cursor-pointer mb-4 shrink-0 self-end"
                        title="Collapse panel">
                        
                          <ChevronRight className="w-4 h-4 text-[#495057]" />
                        </button>
                        {currentStage === '1' &&
                      <ProfileCard currentStage={currentStage} />
                      }
                        <UpcomingMilestones currentStage={currentStage} />
                      </div>
                    </aside>
                  </div>
                </> :

              <JoinOrgFlow
                joinedOrgs={joinedOrgs}
                onJoinOrg={handleJoinOrg}
                onNavigateToDashboard={() => setCurrentPage('dashboard')} />

              }
            </main>

            {/* Mobile floating reminder button */}
            {currentPage !== 'milestones' &&
            <MobileProfileDrawer
              currentStage={currentStage}
              onNavigateToMilestones={() => setCurrentPage('milestones')} />

            }

            {/* Mobile Bottom Navigation */}
            <MobileNav />
          </div>
        </div>
      </div>
    </CtaProvider>);

}