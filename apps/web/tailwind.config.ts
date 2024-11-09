import type { Config } from 'tailwindcss'
import uiConfig from '../../libs/ui/tailwind.config'

const config: Config = {
  presets: [uiConfig],
  content: ['./src/**/*.{ts,tsx}', '../../libs/ui/**/*.{ts,tsx}'],
}
export default config
