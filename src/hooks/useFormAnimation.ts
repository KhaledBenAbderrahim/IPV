import { useEffect } from 'react';

export function useFormAnimation() {
  useEffect(() => {
    // Add smooth scroll behavior to form elements
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    });

    return () => {
      formElements.forEach(element => {
        element.removeEventListener('focus', () => {});
      });
    };
  }, []);

  // Animation variants for form elements
  const formVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Animation variants for form controls
  const controlVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return {
    formVariants,
    controlVariants,
  };
}
