import { Box, Typography } from '@mui/material';

export default function PageWrapper({
  children,
  title,
  subTitle,
}: {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="flex flex-col gap-2 pb-8">
      <Box
        component="header"
        sx={{
          px: { xs: 2, md: 3 },
          py: 3,
          backgroundColor: 'pageWrapper.background',
          color: 'pageWrapper.text',
        }}
      >
        <Typography variant="h4" fontWeight={'bold'} noWrap component="div">
          {title}
        </Typography>
        {subTitle && (
          <Typography
            variant="h6"
            fontWeight={'semibold'}
            noWrap
            component="div"
          >
            {subTitle}
          </Typography>
        )}
      </Box>
      <Box component="div" sx={{ px: { xs: 2, md: 3 } }}>
        {children}
      </Box>
    </div>
  );
}
