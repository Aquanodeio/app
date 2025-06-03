import * as React from "react"
import { cn } from "../../lib/utils"
import { VariantProps, cva } from "class-variance-authority"

// ==========================================
// CARD SYSTEM
// ==========================================

const cardVariants = cva(
  "card-base",
  {
    variants: {
      variant: {
        primary: "card-primary",
        compact: "card-compact", 
        dense: "card-dense",
        glass: "card-glass",
        elevated: "card-elevated"
      },
      interactive: {
        true: "interactive-hover cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      interactive: false
    }
  }
)

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

// ==========================================
// BUTTON SYSTEM
// ==========================================

const buttonVariants = cva(
  "btn-base focus-ring interactive-press",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        ghost: "btn-ghost",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
      size: {
        sm: "btn-sm",
        md: "btn-md", 
        lg: "btn-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = "Button"

// ==========================================
// TYPOGRAPHY SYSTEM
// ==========================================

const headingVariants = cva(
  "",
  {
    variants: {
      level: {
        1: "heading-1",
        2: "heading-2", 
        3: "heading-3",
        4: "heading-4",
        5: "heading-5",
        6: "heading-6"
      },
      gradient: {
        true: "gradient-text",
        false: ""
      }
    },
    defaultVariants: {
      level: 3,
      gradient: false
    }
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, gradient, as, ...props }, ref) => {
    const Component = (as || `h${level}`) as React.ElementType
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, gradient }), className)}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        large: "body-large",
        base: "body-base",
        small: "body-small",
        caption: "caption"
      },
      muted: {
        true: "text-muted-foreground",
        false: ""
      }
    },
    defaultVariants: {
      variant: "base",
      muted: false
    }
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, muted, as = 'p', ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, muted }), className)}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

// ==========================================
// LAYOUT SYSTEM
// ==========================================

const containerVariants = cva(
  "",
  {
    variants: {
      variant: {
        content: "container-content",
        narrow: "container-narrow",
        wide: "container-wide"
      }
    },
    defaultVariants: {
      variant: "content"
    }
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ variant }), className)}
      {...props}
    />
  )
)
Container.displayName = "Container"

const gridVariants = cva(
  "",
  {
    variants: {
      variant: {
        "auto-fit": "grid-auto-fit",
        "auto-fill": "grid-auto-fill",
        "responsive-2": "grid-responsive-2", 
        "responsive-3": "grid-responsive-3",
        "responsive-4": "grid-responsive-4"
      }
    },
    defaultVariants: {
      variant: "responsive-3"
    }
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ variant }), className)}
      {...props}
    />
  )
)
Grid.displayName = "Grid"

// ==========================================
// STATUS SYSTEM
// ==========================================

const statusVariants = cva(
  "status-badge",
  {
    variants: {
      variant: {
        active: "status-active",
        inactive: "status-inactive", 
        pending: "status-pending"
      }
    },
    defaultVariants: {
      variant: "active"
    }
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusVariants({ variant }), className)}
      {...props}
    />
  )
)
StatusBadge.displayName = "StatusBadge"

// ==========================================
// INPUT SYSTEM
// ==========================================

const inputVariants = cva(
  "input-base input-focus",
  {
    variants: {
      variant: {
        default: "",
        error: "input-error"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
)
Input.displayName = "Input"

// ==========================================
// SPACING UTILITIES
// ==========================================

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'section' | 'component' | 'element' | 'tight'
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 'element', ...props }, ref) => {
    const spacingClass = {
      section: 'space-section',
      component: 'space-component', 
      element: 'space-element',
      tight: 'space-tight'
    }[size]
    
    return (
      <div
        ref={ref}
        className={cn(spacingClass, className)}
        {...props}
      />
    )
  }
)
Spacer.displayName = "Spacer"

// ==========================================
// DASHBOARD SPECIFIC COMPONENTS
// ==========================================

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  subtitle?: string
  loading?: boolean
}

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, title, value, subtitle, loading, ...props }, ref) => (
    <Card ref={ref} variant="compact" className={cn("", className)} {...props}>
      <Text variant="small" muted className="space-tight">
        {title}
      </Text>
      {loading ? (
        <div className="h-8 w-16 bg-muted animate-pulse rounded" />
      ) : (
        <Heading level={3} className="text-foreground">
          {value}
        </Heading>
      )}
      {subtitle && (
        <Text variant="caption" muted>
          {subtitle}
        </Text>
      )}
    </Card>
  )
)
StatsCard.displayName = "StatsCard"

export interface DeploymentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deploymentId: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  interactive?: boolean
  onDelete?: () => void
}

export const DeploymentCard = React.forwardRef<HTMLDivElement, DeploymentCardProps>(
  ({ className, deploymentId, status, createdAt, interactive = false, onDelete, ...props }, ref) => (
    <Card ref={ref} variant="compact" interactive={interactive} className={cn("", className)} {...props}>
      <div className="flex items-center justify-between space-element">
        <div className="flex items-center gap-3">
          <Text variant="small" muted>ID:</Text>
          <Text variant="small" className="font-medium font-mono truncate max-w-[200px]">
            {deploymentId}
          </Text>
          <StatusBadge variant={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StatusBadge>
        </div>
        {onDelete && (
          <Button variant="ghost" size="sm" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
      <Text variant="caption" muted>
        Created {createdAt}
      </Text>
    </Card>
  )
)
DeploymentCard.displayName = "DeploymentCard" 