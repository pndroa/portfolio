import { SxProps, Theme } from '@mui/material/styles'

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}
