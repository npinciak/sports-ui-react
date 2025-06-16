import FilterListIcon from '@mui/icons-material/FilterList';
import GroupIcon from '@mui/icons-material/Group';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TRANSACTION } from '@sdk/espn-client-models/transaction.model';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BaseballTransactionEntity,
  TRANSACTION_ICON_BY_TYPE,
  BaseballTransactionItem as TransactionItemType,
} from '../../models/baseball-transaction.model';

// Helper functions
const formatTransactionDate = (timestamp: number | null): string => {
  if (!timestamp) return 'Pending';
  return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
};

// Calculate transactions by team
const calculateTeamTransactions = (
  transactions: Record<string, BaseballTransactionEntity[]>
) => {
  const teamCounts: Record<
    string,
    { adds: number; drops: number; total: number }
  > = {};

  Object.values(transactions)
    .flat()
    .forEach(transaction => {
      transaction.items.forEach(item => {
        // Process adds
        if (item.type === TRANSACTION.Add && item.toTeamAbbrev) {
          if (!teamCounts[item.toTeamAbbrev]) {
            teamCounts[item.toTeamAbbrev] = { adds: 0, drops: 0, total: 0 };
          }
          teamCounts[item.toTeamAbbrev].adds += 1;
          teamCounts[item.toTeamAbbrev].total += 1;
        }

        // Process drops
        if (item.type === TRANSACTION.Drop && item.fromTeamAbbrev) {
          if (!teamCounts[item.fromTeamAbbrev]) {
            teamCounts[item.fromTeamAbbrev] = { adds: 0, drops: 0, total: 0 };
          }
          teamCounts[item.fromTeamAbbrev].drops += 1;
          teamCounts[item.fromTeamAbbrev].total += 1;
        }
      });
    });

  return Object.entries(teamCounts).sort(
    ([, countA], [, countB]) => countB.total - countA.total
  );
};

// Team Transactions Component
const TeamTransactionsDisplay: React.FC<{
  teamTransactions: [string, { adds: number; drops: number; total: number }][];
}> = ({ teamTransactions }) => {
  if (teamTransactions.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, mb: 2, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <GroupIcon fontSize="small" /> Team Transaction Activity
      </Typography>
      <Grid container spacing={1}>
        {teamTransactions.map(([team, counts]) => (
          <Grid item xs={6} sm={4} md={3} key={team}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="medium">
                {team}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip
                  label={`+${counts.adds}`}
                  size="small"
                  sx={{
                    height: 20,
                    minWidth: 30,
                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                    color: 'success.dark',
                    fontWeight: 'bold',
                  }}
                />
                <Chip
                  label={`-${counts.drops}`}
                  size="small"
                  sx={{
                    height: 20,
                    minWidth: 30,
                    bgcolor: 'rgba(244, 67, 54, 0.1)',
                    color: 'error.dark',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

// Transaction Item Component
const TransactionItem: React.FC<{ item: TransactionItemType }> = ({ item }) => {
  const icon = TRANSACTION_ICON_BY_TYPE[item.type];
  const theme = useTheme();

  // Determine background color based on transaction type
  const getBgColor = () => {
    switch (item.type) {
      case TRANSACTION.Add:
        return 'rgba(76, 175, 80, 0.08)';
      case TRANSACTION.Drop:
        return 'rgba(244, 67, 54, 0.08)';
      default:
        return 'transparent';
    }
  };

  return (
    <ListItem
      divider
      sx={{
        bgcolor: getBgColor(),
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="medium">
            <Link to={`player/${item.playerId}`}>
              {item.playerName || 'Unknown Player'}
            </Link>
          </Typography>
        }
        secondary={
          <>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {item.playerPosition && (
                <Chip
                  label={item.playerPosition}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    bgcolor: 'primary.light',
                    color: 'white',
                  }}
                />
              )}

              {item.type === TRANSACTION.Add && (
                <>
                  Added to{' '}
                  <Link to={`team/${item.toTeamId}`}>{item.toTeamAbbrev}</Link>,{' '}
                  {item.toLineupSlot}
                </>
              )}

              {item.type === TRANSACTION.Drop && (
                <>
                  Dropped from{' '}
                  <Link to={`team/${item.fromTeamId}`}>
                    {item.fromTeamAbbrev}
                  </Link>
                </>
              )}
            </Box>
          </>
        }
      />
      {item.playerHeadshot && (
        <ListItemAvatar>
          <Avatar
            src={item.playerHeadshot}
            alt={item.playerName || 'Player'}
            sx={{
              width: 48,
              height: 48,
              border: '2px solid',
              borderColor: 'grey.300',
            }}
          />
        </ListItemAvatar>
      )}
    </ListItem>
  );
};

// Transaction Group Component
const TransactionGroup: React.FC<{
  date: string;
  transactions: BaseballTransactionEntity[];
}> = ({ date, transactions }) => {
  return (
    <Box mb={2}>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 'bold',
          mb: 1,
          p: 1,
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
          borderRadius: 1,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {date}
        <Chip
          label={transactions.length}
          size="small"
          color="primary"
          sx={{ height: 24 }}
        />
      </Typography>
      <Card elevation={0}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {transactions.map(transaction => (
            <Box
              key={transaction.id}
              sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {transaction.isPending ? (
                    <Chip
                      label="Pending"
                      color="warning"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  ) : (
                    formatTransactionDate(
                      transaction.transactionProposedDateTimestamp
                    )
                  )}
                </Typography>
                {transaction.bidAmount > 0 && (
                  <Chip
                    label={`FAAB: $${transaction.bidAmount}`}
                    size="small"
                    color="secondary"
                    sx={{ ml: 1, fontWeight: 'bold' }}
                  />
                )}
              </Box>
              <List disablePadding>
                {transaction.items.map((item, idx) => (
                  <TransactionItem
                    key={`${transaction.id}-${idx}`}
                    item={item}
                  />
                ))}
              </List>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

// Loading Component for Transaction Items
const LoadingTransactions = ({ count = 3 }) => {
  return (
    <Card elevation={0} sx={{ mb: 2 }}>
      <CardContent>
        {[...Array(count)].map((_, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', mb: 2, alignItems: 'center' }}
          >
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              sx={{ mr: 2 }}
            />
            <Box sx={{ width: '100%' }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={18} />
            </Box>
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{ ml: 1 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

// Scroll to Top Button Component
const ScrollToTopButton = ({ scrollContainerRef }) => {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      setVisible(scrollContainerRef.current.scrollTop > 300);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [scrollContainerRef]);

  const handleClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!visible) return null;

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        bgcolor: 'primary.main',
        color: 'white',
        boxShadow: 2,
        '&:hover': {
          bgcolor: 'primary.dark',
        },
      }}
      size="small"
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

// Main Component
interface BaseballTransactionsWidgetProps {
  transactions: Record<string, BaseballTransactionEntity[]>;
  title?: string;
  loading?: boolean;
  maxHeight?: number | string;
  onRefresh?: () => void;
  showTeamStats?: boolean;
}

export function BaseballTransactionsWidget({
  transactions,
  title = 'Recent Transactions',
  loading = false,
  maxHeight = 600,
  onRefresh,
  showTeamStats = true,
}: BaseballTransactionsWidgetProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [filter, setFilter] = useState<string | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [teamStatsAnchorEl, setTeamStatsAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  // Calculate team transaction stats
  const teamTransactions = React.useMemo(() => {
    return calculateTeamTransactions(transactions);
  }, [transactions]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filterType: string | null = null) => {
    setFilterAnchorEl(null);
    if (filterType !== undefined) {
      setFilter(filterType);
    }
  };

  const sortedDates = Object.keys(transactions).sort((a, b) => {
    // Ensure "Pending" is at the top
    if (a === 'Pending') return -1;
    if (b === 'Pending') return 1;

    // Compare dates (newest first)
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return dateB - dateA;
  });

  // Apply filtering if needed
  const filteredTransactions = React.useMemo(() => {
    if (!filter) return transactions;

    const filtered: Record<string, BaseballTransactionEntity[]> = {};

    Object.entries(transactions).forEach(([date, trans]) => {
      const filteredTrans = trans.filter(t => {
        // Filter logic based on transaction type
        if (filter === 'add') {
          return t.items.some(item => item.type === TRANSACTION.Add);
        } else if (filter === 'drop') {
          return t.items.some(item => item.type === TRANSACTION.Drop);
        }
        return true; // "All" filter
      });

      if (filteredTrans.length > 0) {
        filtered[date] = filteredTrans;
      }
    });

    return filtered;
  }, [transactions, filter]);

  if (loading) {
    return (
      <Card elevation={0}>
        <CardHeader
          title={<Skeleton variant="text" width="60%" height={40} />}
          action={<Skeleton variant="circular" width={40} height={40} />}
        />
        <CardContent>
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <LoadingTransactions count={3} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ position: 'relative' }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        }
        action={
          <Box>
            {showTeamStats && teamTransactions.length > 0 && (
              <Tooltip title="Team transaction stats">
                <IconButton
                  onClick={e => setTeamStatsAnchorEl(e.currentTarget)}
                  color={teamStatsAnchorEl ? 'primary' : 'default'}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>
            )}
            <Popover
              open={Boolean(teamStatsAnchorEl)}
              anchorEl={teamStatsAnchorEl}
              onClose={() => setTeamStatsAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  width: { xs: '300px', sm: '450px', md: '550px' },
                  maxWidth: '90vw',
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Team Transaction Stats
                </Typography>
                <Grid container spacing={1}>
                  {teamTransactions.map(([team, counts]) => (
                    <Grid item xs={6} key={team}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {team}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Adds">
                            <Chip
                              label={counts.adds}
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{ minWidth: 35 }}
                            />
                          </Tooltip>
                          <Tooltip title="Drops">
                            <Chip
                              label={counts.drops}
                              size="small"
                              color="error"
                              variant="outlined"
                              sx={{ minWidth: 35 }}
                            />
                          </Tooltip>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Popover>
            <Tooltip title="Filter transactions">
              <IconButton onClick={handleFilterClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={() => handleFilterClose()}
            >
              <MenuItem
                onClick={() => handleFilterClose(null)}
                selected={filter === null}
              >
                All Transactions
              </MenuItem>
              <MenuItem
                onClick={() => handleFilterClose('add')}
                selected={filter === 'add'}
              >
                Add Only
              </MenuItem>
              <MenuItem
                onClick={() => handleFilterClose('drop')}
                selected={filter === 'drop'}
              >
                Drop Only
              </MenuItem>
            </Menu>
            {onRefresh && (
              <Tooltip title="Refresh transactions">
                <IconButton onClick={onRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
      />
      <Divider />
      <CardContent sx={{ p: { xs: 1, md: 2 } }}>
        {showTeamStats && !isMobile && teamTransactions.length > 0 && (
          <TeamTransactionsDisplay teamTransactions={teamTransactions} />
        )}

        {Object.keys(filteredTransactions).length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              color: 'text.secondary',
            }}
          >
            <Typography>No transactions to display</Typography>
            {filter && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Try changing your filter
              </Typography>
            )}
          </Box>
        ) : (
          <Box
            ref={scrollContainerRef}
            sx={{
              height: maxHeight,
              maxHeight: maxHeight,
              overflowY: 'auto',
              px: { xs: 1, md: 2 },
              scrollbarWidth: 'thin',
              position: 'relative',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            {sortedDates.map(date => (
              <TransactionGroup
                key={date}
                date={date}
                transactions={filteredTransactions[date]}
              />
            ))}
            <ScrollToTopButton scrollContainerRef={scrollContainerRef} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
