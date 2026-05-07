import '@mantine/core/styles.css';
import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  MantineProvider,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { ArrowRight, ChevronDown, Search, Users } from 'lucide-react';
import { PostComposerModal } from './PostComposer';
import { Stage } from './StageSwitcher';
type Tab = 'feed' | 'relationships' | 'organizations';

const ADMIN_STAGE_ORDER: Stage[] = ['1', '2', '2.5', '3', '4', '5', '6', 'edge'];

function adminStageAtOrAfter(current: Stage, threshold: Stage): boolean {
  return (
    ADMIN_STAGE_ORDER.indexOf(current) >= ADMIN_STAGE_ORDER.indexOf(threshold)
  );
}

function AdminStage1EmptyOrgCard({
  title,
  description,
  onNavigateToJoinOrg,
}: {
  title: string;
  description: string;
  onNavigateToJoinOrg: () => void;
}) {
  return (
    <Paper withBorder radius={8} p="md" mb="md">
      <Group justify="space-between" align="center" wrap="wrap" gap="md">
        <Stack gap="md">
          <Text
            className="text-[16px] font-bold text-[#212529] leading-snug"
            fz="16px"
            fw={700}
            lh={1.35}>
            
            {title}
          </Text>
          <Text
            className="text-[14px] text-[#495057] leading-relaxed"
            fz="14px"
            lh={1.625}>
            
            {description}
          </Text>
        </Stack>
        <Group gap="xs">
          <Button
            variant="default"
            radius={8}
            className="text-[13px] font-medium text-[#495057] px-6 py-3 h-auto"
            onClick={() => onNavigateToJoinOrg()}>
            
            Join an Organization
          </Button>
          <Button
            variant="filled"
            color="blue"
            radius={8}
            type="button"
            className="text-[13px] font-medium px-6 py-3 h-auto">
            
            Create an Organization
          </Button>
        </Group>
      </Group>
    </Paper>);

}

const usersIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

function AdminStage2OrganizationCard() {
  return (
    <Card withBorder radius="lg" p={0} mb="md" style={{ overflow: 'hidden' }}>
      <Box bg="gray.1" h={120} w="100%" />
      <Box p="md">
        <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xl">
          <Stack gap="xs">
            <Group gap="sm" align="center" wrap="wrap">
              <Text fw={700} size="lg" component="span">
                Design Mentors Network
              </Text>
              <Badge variant="light" color="blue" size="lg">
                Admin
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              A global community of senior designers helping the next generation of UX
              talent through structured mentorship.
            </Text>
          </Stack>
          <Stack gap="xs" align="flex-end">
            <Group gap="xs" align="center">
              <ThemeIcon variant="transparent" color="gray" size="sm">
                {usersIconSvg}
              </ThemeIcon>
              <Text size="sm" c="dimmed">
                142 members
              </Text>
            </Group>
            <Button variant="outline" color="blue" size="sm" type="button">
              Go to Organization
            </Button>
          </Stack>
        </Group>
      </Box>
    </Card>
  );
}

function AdminStage25OrganizationCard({ rightPanelOpen }: { rightPanelOpen: boolean }) {
  const noProgramsYetBlock = (
    <Stack gap={4}>
      <Text size="sm" fw={500}>
        No programs yet
      </Text>
      <Text size="sm" c="dimmed" lh={1.5}>
        Create a program to start organizing mentorship cohorts and matching members.
      </Text>
    </Stack>
  );

  const createProgramButton = (
    <Button
      variant="subtle"
      color="blue"
      size="sm"
      type="button"
      style={{ textAlign: 'left', paddingLeft: 1 }}
      rightSection={<ArrowRight size={14} aria-hidden />}>
      Create a Program
    </Button>
  );

  return (
    <Card withBorder radius="lg" p={0} mb="md" style={{ overflow: 'hidden' }}>
      <Box bg="gray.1" h={110} w="100%" />
      <Box p="xl">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="xl">
          <Stack gap="xs">
            <Group gap="sm" align="center" wrap="wrap">
              <Text fw={700} size="lg">
                Design Mentors Network
              </Text>
              <Badge variant="light" color="blue" size="sm">
                Admin
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" lh={1.5}>
              A global community of senior designers helping the next generation of UX
              talent through structured mentorship.
            </Text>
          </Stack>
          <Stack gap="sm" align="flex-start">
            <Group gap="xs" align="center">
              <ThemeIcon variant="transparent" color="gray" size="sm">
                {usersIconSvg}
              </ThemeIcon>
              <Text size="sm" c="dimmed">
                142 members
              </Text>
            </Group>
            <Button variant="outline" color="blue" size="sm" radius="md" type="button">
              Go to Organization
            </Button>
          </Stack>
        </Group>
        <Divider my="lg" />
        {rightPanelOpen ? (
          <Group justify="space-between" align="center" wrap="wrap" gap="lg">
            {noProgramsYetBlock}
            {createProgramButton}
          </Group>
        ) : (
          <Stack gap="md" align="flex-start">
            {noProgramsYetBlock}
            {createProgramButton}
          </Stack>
        )}
      </Box>
    </Card>
  );
}

function AdminStage3456DrexelOrganizationCard() {
  const badgeUpper = { label: { textTransform: 'uppercase' as const } };
  return (
    <Card withBorder radius="lg" p={0} mb="md" style={{ overflow: 'hidden' }}>
      <Box bg="gray.1" h={110} w="100%" />
      <Box p="xl">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="lg" mb="lg">
          <Stack gap="xs">
            <Group gap="sm" align="center" wrap="wrap">
              <Text fw={700} size="lg">
                Product Management Organization — Drexel
              </Text>
              <Badge variant="light" color="blue" size="sm" styles={badgeUpper}>
                Admin
              </Badge>
            </Group>
            <Group gap="xs" align="center">
              <ThemeIcon variant="transparent" color="gray" size="sm">
                <Users size={15} strokeWidth={2} aria-hidden />
              </ThemeIcon>
              <Text size="sm" c="dimmed">
                142 members · 3 programs
              </Text>
            </Group>
          </Stack>
          <Group gap="sm" align="center" style={{ flexShrink: 0 }}>
            <Button variant="default" size="sm" radius="md" type="button">
              Manage Org
            </Button>
            <Button variant="outline" color="blue" size="sm" radius="md" type="button">
              View Organization
            </Button>
          </Group>
        </Group>
        <Divider mb="lg" />
        <Text
          size="xs"
          fw={600}
          tt="uppercase"
          c="dimmed"
          mb="sm"
          style={{ letterSpacing: '0.07em' }}>
          Your Programs
        </Text>
        <Paper withBorder radius="md" p="md" bg="gray.0">
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Stack gap={4}>
              <Group gap="xs" align="center" wrap="wrap">
                <Text size="sm" fw={600}>
                  UX Research Intensive
                </Text>
                <Badge variant="light" color="teal" size="xs" styles={badgeUpper}>
                  Program
                </Badge>
                <Badge variant="light" color="blue" size="xs" styles={badgeUpper}>
                  Admin
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                24 members · Active
              </Text>
            </Stack>
            <Group gap="xs" style={{ flexShrink: 0 }}>
              <Button variant="default" size="xs" radius="md" type="button">
                Manage Program
              </Button>
              <Button variant="default" size="xs" radius="md" type="button">
                View Program
              </Button>
            </Group>
          </Group>
        </Paper>
        <Button
          variant="subtle"
          color="blue"
          size="sm"
          type="button"
          mt="md"
          pl={0}
          rightSection={<ArrowRight size={14} aria-hidden />}>
          Create a Program
        </Button>
      </Box>
    </Card>
  );
}

function AdminStage2FeedMemberJoinedCard() {
  return (
    <Paper withBorder radius="lg" p="lg" mb="md">
      <Group justify="space-between" align="center" wrap="nowrap" gap="lg">
        <Group gap="md" align="center">
          <Avatar color="blue" size="md" radius="xl">
            AR
          </Avatar>
          <Stack gap={4}>
            <Text size="sm" fw={400}>
              <Text component="span" c="blue" fw={700}>
                Alex Rivera
              </Text>
              {' joined Design Mentors Network'}
            </Text>
            <Text size="xs" c="dimmed">
              Product Design Student at Stanford · Just now
            </Text>
          </Stack>
        </Group>
        <Button variant="filled" color="blue" size="sm" radius="md" type="button">
          View Profile
        </Button>
      </Group>
    </Paper>
  );
}

function AdminStage456WeeklySummaryFeedCard() {
  const badgeUpper = { label: { textTransform: 'uppercase' as const } };
  return (
    <Paper withBorder radius="lg" p="lg" mb="md">
      <Badge variant="light" color="blue" size="sm" styles={badgeUpper} mb="lg">
        Weekly Summary · Design Mentors Network
      </Badge>

      <SimpleGrid cols={3} spacing="sm" mb="lg">
        <Paper withBorder radius="md" p="lg" bg="gray.0">
          <Stack gap={4} align="center">
            <Text fw={700} size="xl" ta="center">
              12
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              New members
            </Text>
          </Stack>
        </Paper>
        <Paper withBorder radius="md" p="lg" bg="gray.0">
          <Stack gap={4} align="center">
            <Text fw={700} size="xl" ta="center">
              8
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Active matches
            </Text>
          </Stack>
        </Paper>
        <Paper withBorder radius="md" p="lg" bg="gray.0">
          <Stack gap={4} align="center">
            <Text fw={700} size="xl" ta="center">
              3
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Events
            </Text>
          </Stack>
        </Paper>
      </SimpleGrid>

      <Button
        variant="subtle"
        color="blue"
        size="sm"
        type="button"
        pl={0}
        rightSection={<ArrowRight size={14} aria-hidden />}>
        View Full Analytics
      </Button>
    </Paper>
  );
}

function AdminStage3456MatchUpdateFeedCard() {
  const badgeUpper = { label: { textTransform: 'uppercase' as const } };
  return (
    <Paper withBorder radius="lg" p="lg" mb="md">
      <Badge variant="light" color="blue" size="sm" styles={badgeUpper} mb="md">
        Match Update
      </Badge>
      <Stack gap="sm">
        <Paper withBorder radius="md" p="md" bg="gray.0">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <Avatar color="blue" size="md" radius="xl">
                JC
              </Avatar>
              <Stack gap={2}>
                <Text size="sm" fw={600}>
                  Jordan Chen + Maya Kim
                </Text>
                <Text size="xs" c="dimmed">
                  PM Mentorship Program · Matched today
                </Text>
              </Stack>
            </Group>
            <Badge variant="light" color="blue" size="sm" styles={badgeUpper}>
              New
            </Badge>
          </Group>
        </Paper>
        <Paper withBorder radius="md" p="md" bg="gray.0">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <Avatar color="gray" size="md" radius="xl">
                AR
              </Avatar>
              <Stack gap={2}>
                <Text size="sm" fw={600}>
                  Alex Rivera + Sam Park
                </Text>
                <Text size="xs" c="dimmed">
                  UX Research Intensive · Quiet for 14 days
                </Text>
              </Stack>
            </Group>
            <Badge variant="light" color="yellow" size="sm" styles={badgeUpper}>
              Quiet
            </Badge>
          </Group>
        </Paper>
        <Button
          variant="subtle"
          color="blue"
          size="sm"
          type="button"
          mt="xs"
          pl={0}
          rightSection={<ArrowRight size={14} aria-hidden />}>
          View All Matches
        </Button>
      </Stack>
    </Paper>
  );
}

function AdminRelationshipsPairTableHeader() {
  const thLabel = (
    label: string,
  ) => (
    <Text
      size="xs"
      fw={500}
      tt="uppercase"
      c="dimmed"
      style={{ letterSpacing: '0.06em' }}>
      {label}
    </Text>
  );
  return (
    <Table.Thead bg="gray.0">
      <Table.Tr>
        <Table.Th px="xl" py="sm">
          {thLabel('Mentor')}
        </Table.Th>
        <Table.Th px="xl" py="sm">
          {thLabel('Mentee')}
        </Table.Th>
        <Table.Th px="xl" py="sm">
          {thLabel('Status')}
        </Table.Th>
        <Table.Th px="xl" py="sm" />
      </Table.Tr>
    </Table.Thead>
  );
}

function AdminStage25RelationshipsPairsPanel() {
  return (
    <>
      <Group gap="sm" mb="lg" wrap="wrap">
        <TextInput
          placeholder="Search by name..."
          leftSection={<Search size={15} strokeWidth={2} aria-hidden />}
          size="sm"
          radius="md"
          style={{ flex: 1, minWidth: 160 }}
        />
        <Select
          placeholder="By Organization"
          size="sm"
          radius="md"
          rightSection={<ChevronDown size={14} aria-hidden />}
          data={['Design Mentors Network']}
        />
        <Select
          placeholder="By Program"
          size="sm"
          radius="md"
          rightSection={<ChevronDown size={14} aria-hidden />}
          data={['PM Mentorship Program']}
        />
        <Select
          placeholder="Status"
          size="sm"
          radius="md"
          rightSection={<ChevronDown size={14} aria-hidden />}
          data={['Active', 'Quiet', 'Awaiting First Contact']}
        />
      </Group>

      <Paper withBorder radius="lg" p={0} mb="md" style={{ overflow: 'hidden' }}>
        <Table highlightOnHover striped={false} withColumnBorders={false}>
          <AdminRelationshipsPairTableHeader />
          <Table.Tbody>
            <Table.Tr>
              <Table.Td px="xl" py="md">
                <Group gap="sm">
                  <Avatar color="blue" size="md" radius="xl">
                    JC
                  </Avatar>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      Jordan Chen
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Group gap="sm">
                  <Avatar color="teal" size="md" radius="xl">
                    AR
                  </Avatar>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      Alex Rivera
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Badge variant="light" color="green" size="sm" radius="xl">
                  Active
                </Badge>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Button variant="default" size="xs" radius="md" type="button">
                  View Pair
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>
    </>
  );
}

function AdminStage3456RelationshipsPairDetails() {
  return (
    <Stack gap="md" mb="md">
      <Paper withBorder radius="lg" p={0} style={{ overflow: 'hidden' }}>
        <Table highlightOnHover striped={false} withColumnBorders={false}>
          <AdminRelationshipsPairTableHeader />
          <Table.Tbody>
            <Table.Tr>
              <Table.Td px="xl" py="md">
                <Group gap="sm">
                  <Avatar color="blue" size="md" radius="xl">
                    JC
                  </Avatar>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      Jordan Chen
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Group gap="sm">
                  <Avatar color="teal" size="md" radius="xl">
                    MK
                  </Avatar>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      Maya Kim
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Badge variant="light" color="blue" size="sm" radius="xl">
                  New
                </Badge>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Button variant="default" size="xs" radius="md" type="button">
                  View Pair
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>

      <Paper withBorder radius="lg" p={0} style={{ overflow: 'hidden' }}>
        <Table highlightOnHover striped={false} withColumnBorders={false}>
          <AdminRelationshipsPairTableHeader />
          <Table.Tbody>
            <Table.Tr>
              <Table.Td px="xl" py="md">
                <Group gap="sm">
                  <Avatar color="gray" size="md" radius="xl">
                    AR
                  </Avatar>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      Alex Rivera
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Group gap="sm">
                  <Avatar color="cyan" size="md" radius="xl">
                    SP
                  </Avatar>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      Sam Park
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Badge variant="light" color="yellow" size="sm" radius="xl">
                  Quiet
                </Badge>
              </Table.Td>
              <Table.Td px="xl" py="md">
                <Button variant="default" size="xs" radius="md" type="button">
                  View Pair
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}

function AdminStage2MatchingReadinessCard() {
  return (
    <Paper withBorder radius="lg" p="lg" mb="md">
      <Stack gap="lg">
        <Group align="flex-start" gap="md" wrap="nowrap">
          <ThemeIcon variant="filled" color="dark" size="xl" radius="md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </ThemeIcon>
          <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
            <Text
              className="text-[16px] font-semibold text-[#212529] leading-snug"
              fz="16px"
              fw={600}
              lh={1.35}>
              Members are ready to be matched
            </Text>
            <Text
              className="text-[13px] text-[#868e96] leading-relaxed"
              fz="sm"
              c="dimmed"
              lh={1.625}>
              Design Mentors Network has members who have opted in. Start pairing
              mentors and mentees.
            </Text>
          </Stack>
        </Group>
        <Button
          variant="filled"
          color="blue"
          size="sm"
          radius="md"
          type="button"
          className="text-[13px] font-semibold self-start">
          Begin Matching
        </Button>
      </Stack>
    </Paper>
  );
}
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
  /** When set to mentor or mentee, the empty-org feed card is hidden. */
  userRole?: 'admin' | 'mentor' | 'mentee';
  /** Prefer this over joinedOrgs when provided; empty means no org memberships. */
  org_memberships?: string[];
  /** Desktop right profile/milestones panel; when false, Stage 2.5 org card stacks CTA under copy. */
  rightPanelOpen?: boolean;
}
export function AdminDashboard(props: DashboardProps) {
  const {
    currentStage,
    onNavigateToJoinOrg,
    joinedOrgs,
    userRole,
    org_memberships,
    rightPanelOpen = true,
  } = props;
  const normalizedStage: Stage =
    currentStage === '5' || currentStage === '6' ? '4' : currentStage;
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const memberships = org_memberships ?? joinedOrgs;
  const isAdminUser = userRole !== 'mentor' && userRole !== 'mentee';
  const showStage1AdminEmptyOrgPrompt =
    currentStage === '1' && isAdminUser && memberships.length === 0;

  const feedEmptyDescription =
    'Join an existing organization or create one to start managing programs and matching members.';

  const showAdminPostComposer = adminStageAtOrAfter(normalizedStage, '2.5');

  const isRoleAdmin = (userRole ?? 'admin') === 'admin';
  const showStage2OrganizationsOrgCard =
    activeTab === 'organizations' && normalizedStage === '2' && isRoleAdmin;
  const showStage25OrganizationsOrgCard =
    activeTab === 'organizations' && normalizedStage === '2.5' && isRoleAdmin;
  const showStage3456OrganizationsDrexelCard =
    activeTab === 'organizations' &&
    isRoleAdmin &&
    (normalizedStage === '3' || normalizedStage === '4');
  const showStage2AdminFeedStack =
    activeTab === 'feed' &&
    isRoleAdmin &&
    adminStageAtOrAfter(normalizedStage, '2');
  const showStage2AdminMatchingReadinessCard =
    isRoleAdmin &&
    ((activeTab === 'feed' &&
      (normalizedStage === '2' || normalizedStage === '2.5')) ||
      (activeTab === 'relationships' && normalizedStage === '2'));
  const showStage25AdminRelationshipsPairsPanel =
    activeTab === 'relationships' &&
    isRoleAdmin &&
    (normalizedStage === '2.5' ||
      normalizedStage === '3' ||
      normalizedStage === '4');
  const showStage456AdminWeeklySummaryFeedCard =
    activeTab === 'feed' && isRoleAdmin && normalizedStage === '4';
  const showStage3456AdminMatchUpdateFeedCard =
    activeTab === 'feed' &&
    isRoleAdmin &&
    (normalizedStage === '3' || normalizedStage === '4');
  const showStage3456RelationshipsPairDetails =
    activeTab === 'relationships' &&
    isRoleAdmin &&
    (normalizedStage === '3' || normalizedStage === '4');

  return (
    <MantineProvider
      theme={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}>
      
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
          {showStage456AdminWeeklySummaryFeedCard && (
            <AdminStage456WeeklySummaryFeedCard />
          )}
          {activeTab === 'feed' && showAdminPostComposer &&
          <>
              <PostComposerModal
              isOpen={isComposerOpen}
              onClose={() => setIsComposerOpen(false)}
              userRole="admin" />
            
              <div
              onClick={() => setIsComposerOpen(true)}
              className="bg-white rounded-[8px] border border-[#dee2e6] p-4 md:px-5 md:py-4 flex items-center gap-3 md:gap-4 shadow-sm transition-colors cursor-text hover:border-[#ced4da] mb-6">
                
                <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[14px] font-medium shrink-0">
                  ME
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="bg-[#f8f9fa] border border-[#ced4da] rounded-full px-4 h-[40px] md:h-[44px] flex items-center text-[13px] md:text-[13px] text-[#868e96] min-w-0">
                    <span className="truncate">
                      Share something with your community...
                    </span>
                  </div>
                </div>
              </div>
            </>
          }
          {activeTab === 'feed' && showStage1AdminEmptyOrgPrompt &&
          <AdminStage1EmptyOrgCard
            title="You are not part of any organizations yet"
            description={feedEmptyDescription}
            onNavigateToJoinOrg={onNavigateToJoinOrg} />

          }
          {showStage2AdminMatchingReadinessCard && (
            <AdminStage2MatchingReadinessCard />
          )}
          {showStage25AdminRelationshipsPairsPanel && (
            <AdminStage25RelationshipsPairsPanel />
          )}
          {showStage3456RelationshipsPairDetails && (
            <AdminStage3456RelationshipsPairDetails />
          )}
          {showStage2AdminFeedStack && <AdminStage2FeedMemberJoinedCard />}
          {showStage3456AdminMatchUpdateFeedCard && (
            <AdminStage3456MatchUpdateFeedCard />
          )}
          {activeTab === 'relationships' && showStage1AdminEmptyOrgPrompt &&
          <AdminStage1EmptyOrgCard
            title="Join or create an organization to begin matching members"
            description={feedEmptyDescription}
            onNavigateToJoinOrg={onNavigateToJoinOrg} />

          }
          {activeTab === 'organizations' && showStage1AdminEmptyOrgPrompt &&
          <AdminStage1EmptyOrgCard
            title="You are not part of any organizations yet"
            description={feedEmptyDescription}
            onNavigateToJoinOrg={onNavigateToJoinOrg} />

          }
          {showStage2OrganizationsOrgCard && <AdminStage2OrganizationCard />}
          {showStage25OrganizationsOrgCard && (
            <AdminStage25OrganizationCard rightPanelOpen={rightPanelOpen} />
          )}
          {showStage3456OrganizationsDrexelCard && (
            <AdminStage3456DrexelOrganizationCard />
          )}

        </div>
      </div>
    </MantineProvider>);

}
