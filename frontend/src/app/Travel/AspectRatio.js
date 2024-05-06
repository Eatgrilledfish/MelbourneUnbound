// components/ui/AspectRatio.jsx
import { Box } from '@mui/material';

export const AspectRatio = ({ ratio, children, sx }) => {
  const paddingBottom = `${(100 / ratio)}%`;

  return (
    <Box sx={{ position: 'relative', width: '100%', ...sx }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, paddingBottom }}>
        {children}
      </Box>
    </Box>
  );
};
