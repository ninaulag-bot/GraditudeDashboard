import React, { useState } from 'react';
import { FeedTab } from './FeedTab';
import { RelationshipsTab } from './RelationshipsTab';
import { OrganizationsTab } from './OrganizationsTab';
import { Stage } from './StageSwitcher';
type Tab = 'feed' | 'relationships' | 'organizations';
interface DashboardProps {
  joinedOrgs: string[];
  onJoinOrg: (orgId: string) => void;
  onNavigateToJoinOrg: () => void;
  currentStage: Stage;
  menteePairingConfirmed: boolean;
  onConfirmMenteePairing: () => void;
  mentorPairingConfirmed: boolean;
  onConfirmMentorPairing: () => void;
  priyaPairingConfirmed: boolean;
  onConfirmPriyaPairing: () => void;
}
export function Dashboard({
  joinedOrgs,
  onJoinOrg,
  onNavigateToJoinOrg,
  currentStage,
  menteePairingConfirmed,
  onConfirmMenteePairing,
  mentorPairingConfirmed,
  onConfirmMentorPairing,
  priyaPairingConfirmed,
  onConfirmPriyaPairing
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  // In the prototype, membership is largely driven by the stage,
  // but we keep the joinedOrgs prop for the JoinOrgFlow compatibility
  const isMember = currentStage !== '1' || joinedOrgs.length > 0;
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#f1f3f5]">
      <div className="px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10 pb-0">
        <h1 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-[#212529] mb-4 md:mb-5 lg:mb-6">
          Welcome, Maya
        </h1>

        <div className="flex border-b border-[#dee2e6] -mx-4 md:mx-0 px-4 md:px-0">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 md:flex-none px-2 md:px-4 py-3 text-[14px] md:text-[15px] transition-colors relative ${activeTab === 'feed' ? 'text-[#228be6] font-medium' : 'text-[#868e96] hover:text-[#495057]'}`}>
            
            Feed
            {activeTab === 'feed' &&
            <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#228be6]"></div>
            }
          </button>

          <button
            onClick={() => setActiveTab('relationships')}
            className={`flex-1 md:flex-none px-2 md:px-4 py-3 text-[14px] md:text-[15px] transition-colors relative ${activeTab === 'relationships' ? 'text-[#228be6] font-medium' : 'text-[#868e96] hover:text-[#495057]'}`}>
            
            Relationships
            {activeTab === 'relationships' &&
            <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#228be6]"></div>
            }
          </button>

          <button
            onClick={() => setActiveTab('organizations')}
            className={`flex-1 md:flex-none px-2 md:px-4 py-3 text-[14px] md:text-[15px] transition-colors relative ${activeTab === 'organizations' ? 'text-[#228be6] font-medium' : 'text-[#868e96] hover:text-[#495057]'}`}>
            
            Organizations
            {activeTab === 'organizations' &&
            <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#228be6]"></div>
            }
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'feed' &&
        <FeedTab
          isMember={isMember}
          joinedOrgs={joinedOrgs}
          onJoinOrg={onJoinOrg}
          currentStage={currentStage}
          onNavigateToJoinOrg={onNavigateToJoinOrg}
          menteePairingConfirmed={menteePairingConfirmed}
          onConfirmMenteePairing={onConfirmMenteePairing}
          mentorPairingConfirmed={mentorPairingConfirmed}
          onConfirmMentorPairing={onConfirmMentorPairing}
          priyaPairingConfirmed={priyaPairingConfirmed}
          onConfirmPriyaPairing={onConfirmPriyaPairing} />

        }
        {activeTab === 'relationships' &&
        <RelationshipsTab
          joinedOrgs={joinedOrgs}
          onFindOrg={onNavigateToJoinOrg}
          currentStage={currentStage}
          menteePairingConfirmed={menteePairingConfirmed}
          priyaPairingConfirmed={priyaPairingConfirmed} />

        }
        {activeTab === 'organizations' &&
        <OrganizationsTab
          joinedOrgs={joinedOrgs}
          onFindOrg={onNavigateToJoinOrg}
          currentStage={currentStage} />

        }
      </div>
    </div>);

}