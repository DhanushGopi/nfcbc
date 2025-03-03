import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'grad';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none font-archivo',
          {
            'bg-primary text-white hover:bg-primary-600 focus-visible:ring-primary-500': variant === 'default',
            'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900': variant === 'outline',
            'bg-secondary text-white hover:bg-secondary-600 focus-visible:ring-secondary-500': variant === 'secondary',
            'bg-transparent text-gray-900 hover:bg-gray-100': variant === 'ghost',
            'bg-hero-gradient text-white hover:opacity-90 focus-visible:ring-primary-500': variant === 'grad',
            'h-10 py-2 px-4 text-sm': size === 'default',
            'h-9 px-3 rounded-md text-xs': size === 'sm',
            'h-11 px-8 rounded-md text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };