'use client';

import React, { useState } from 'react';
import {
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add,
  Upload,
  Download,
  ViewColumn,
  Refresh,
} from '@mui/icons-material';

interface FloatingActionsProps {
  onImport: () => void;
  onExport: () => void;
  onManageColumns: () => void;
  onRefresh?: () => void;
}

export function FloatingActions({
  onImport,
  onExport,
  onManageColumns,
  onRefresh,
}: FloatingActionsProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <Upload />, name: 'Import CSV', onClick: onImport },
    { icon: <Download />, name: 'Export CSV', onClick: onExport },
    { icon: <ViewColumn />, name: 'Manage Columns', onClick: onManageColumns },
    ...(onRefresh ? [{ icon: <Refresh />, name: 'Refresh Data', onClick: onRefresh }] : []),
  ];

  return (
    <SpeedDial
      ariaLabel="Quick Actions"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        '& .MuiFab-primary': {
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          '&:hover': {
            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease-in-out',
        },
      }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            action.onClick();
            setOpen(false);
          }}
          sx={{
            '& .MuiFab-primary': {
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            },
          }}
        />
      ))}
    </SpeedDial>
  );
}