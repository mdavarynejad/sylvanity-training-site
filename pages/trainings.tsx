import { GetStaticProps } from 'next'
import TrainingList from '../components/training-list'
import { Training } from '@/lib/mock-data'
import { getTrainings } from '@/lib/supabase-training'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

interface TrainingsPageProps {
  trainings: Training[]
}

export default function TrainingsPage({ trainings }: TrainingsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TrainingList
        trainings={trainings}
        title="Professional AI Training Programs"
        subtitle="Empower your SME with cutting-edge AI knowledge and practical skills designed for business leaders and professionals"
      />
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const trainings = await getTrainings()

  return {
    props: {
      trainings,
    },
    revalidate: 60, // Revalidate every minute
  }
}