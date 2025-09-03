
import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'
import { FontProvider } from "@/context/font-provider"

export default function SettingsAppearance() {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day
          and night themes.'
    >
        <FontProvider>
          <AppearanceForm />
        </FontProvider>
    </ContentSection>
  )
}
