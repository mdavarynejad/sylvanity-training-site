import { ReactNode } from 'react'

// Base interface for animation configuration
interface BaseAnimationConfig {
  pattern?: 'floating' | 'geometric' | 'organic'
  intensity?: 'subtle' | 'medium' | 'dynamic'
  theme?: 'blue' | 'green' | 'purple' | 'orange' | 'mixed' | 'brand'
}

// Extended animation properties
interface AnimatedContainerProps extends BaseAnimationConfig {
  children: ReactNode
  className?: string
  variant?: 'card' | 'section' | 'hero'
}

// Animation pattern generators following design inheritance
class AnimationPatternFactory {
  static generateFloatingPattern(theme: string, intensity: string): JSX.Element[] {
    const baseDelay = intensity === 'subtle' ? 0.5 : intensity === 'medium' ? 0.3 : 0.1
    const colors = this.getThemeColors(theme)

    return [
      <div key="float1" className={`absolute top-4 right-4 w-2 h-2 ${colors.primary} rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300`} style={{animationDelay: `${baseDelay}s`}} />,
      <div key="float2" className={`absolute top-8 right-8 w-1 h-1 ${colors.secondary} rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300`} style={{animationDelay: `${baseDelay + 0.2}s`}} />,
      <div key="float3" className={`absolute bottom-6 left-6 w-1.5 h-1.5 ${colors.accent} rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-bounce transition-opacity duration-300`} style={{animationDelay: `${baseDelay + 0.4}s`}} />
    ]
  }

  static generateGeometricPattern(theme: string, intensity: string): JSX.Element[] {
    const baseDelay = intensity === 'subtle' ? 0.4 : intensity === 'medium' ? 0.2 : 0.1
    const colors = this.getThemeColors(theme)

    return [
      <div key="geo1" className={`absolute top-6 right-6 w-3 h-3 ${colors.primary} rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:translate-x-1`} style={{animationDelay: `${baseDelay}s`}} />,
      <div key="geo2" className={`absolute top-10 right-4 w-2 h-2 ${colors.secondary} rounded-full opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:translate-x-2`} style={{animationDelay: `${baseDelay + 0.3}s`}} />,
      <div key="geo3" className={`absolute bottom-8 left-8 w-1.5 h-1.5 ${colors.accent} rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-opacity duration-300`} style={{animationDelay: `${baseDelay + 0.2}s`}} />
    ]
  }

  static generateOrganicPattern(theme: string, intensity: string): JSX.Element[] {
    const baseDelay = intensity === 'subtle' ? 0.6 : intensity === 'medium' ? 0.4 : 0.2
    const colors = this.getThemeColors(theme)

    return [
      <div key="org1" className={`absolute top-4 right-4 w-2 h-2 ${colors.primary} rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-opacity duration-300`} style={{animationDelay: `${baseDelay}s`}} />,
      <div key="org2" className={`absolute top-8 right-8 w-1 h-1 ${colors.secondary} rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300`} style={{animationDelay: `${baseDelay + 0.4}s`}} />,
      <div key="org3" className={`absolute bottom-6 right-6 w-1.5 h-1.5 ${colors.accent} rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-opacity duration-300`} style={{animationDelay: `${baseDelay + 0.6}s`}} />
    ]
  }

  private static getThemeColors(theme: string) {
    const colorMap = {
      blue: {
        primary: 'bg-blue-400',
        secondary: 'bg-indigo-400',
        accent: 'bg-sky-400'
      },
      green: {
        primary: 'bg-green-400',
        secondary: 'bg-emerald-400',
        accent: 'bg-teal-400'
      },
      purple: {
        primary: 'bg-purple-400',
        secondary: 'bg-violet-400',
        accent: 'bg-indigo-400'
      },
      orange: {
        primary: 'bg-orange-400',
        secondary: 'bg-amber-400',
        accent: 'bg-yellow-400'
      },
      mixed: {
        primary: 'bg-rose-400',
        secondary: 'bg-pink-400',
        accent: 'bg-purple-400'
      },
      // Brand theme using Sylvanity colors
      brand: {
        primary: 'bg-brand-sage',
        secondary: 'bg-brand-blue',
        accent: 'bg-brand-sage-light'
      }
    }

    return colorMap[theme as keyof typeof colorMap] || colorMap.blue
  }
}

// Main animated container component
export default function AnimatedContainer({
  children,
  className = '',
  pattern = 'floating',
  intensity = 'medium',
  theme = 'blue',
  variant = 'card'
}: AnimatedContainerProps): JSX.Element {

  // Generate animation pattern based on configuration
  const getAnimationElements = (): JSX.Element[] => {
    switch (pattern) {
      case 'geometric':
        return AnimationPatternFactory.generateGeometricPattern(theme, intensity)
      case 'organic':
        return AnimationPatternFactory.generateOrganicPattern(theme, intensity)
      case 'floating':
      default:
        return AnimationPatternFactory.generateFloatingPattern(theme, intensity)
    }
  }

  // Get base classes based on variant
  const getBaseClasses = (): string => {
    const baseClasses = 'group relative overflow-hidden transition-all duration-300'

    switch (variant) {
      case 'section':
        return `${baseClasses} hover:shadow-lg`
      case 'hero':
        return `${baseClasses} hover:shadow-2xl`
      case 'card':
      default:
        return `${baseClasses} hover:border-blue-400 hover:shadow-xl`
    }
  }

  const getGradientOverlay = (): JSX.Element => {
    const gradients = {
      blue: 'from-blue-50 via-indigo-50 to-transparent',
      green: 'from-green-50 via-emerald-50 to-transparent',
      purple: 'from-purple-50 via-violet-50 to-transparent',
      orange: 'from-orange-50 via-amber-50 to-transparent',
      mixed: 'from-rose-50 via-pink-50 to-transparent',
      brand: 'from-green-50 via-blue-50 to-transparent'
    }

    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[theme as keyof typeof gradients]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
    )
  }

  return (
    <div className={`${getBaseClasses()} ${className}`}>
      {/* Animated Background Gradient */}
      {getGradientOverlay()}

      {/* Animation Elements */}
      {getAnimationElements()}

      {/* Content Wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Export animation configuration types for reuse
export type { BaseAnimationConfig, AnimatedContainerProps }